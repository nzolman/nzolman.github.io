/**
 * ============================================================
 *  SITE ENGINE  (site.js)
 * ============================================================
 *
 *  This file handles:
 *    1. Parsing project and news Markdown files
 *    2. Rendering the page from SITE_CONFIG (site.config.js)
 *    3. Icon SVGs for social links
 *    4. Lightbox / media modal for project cards
 *
 *  You should rarely need to edit this file. To update content:
 *    - Edit js/site.config.js          for personal info & links
 *    - Edit content/news.md            for news items
 *    - Add/edit content/projects/*.md  for research projects
 */

// ── Minimal Markdown → HTML converter ─────────────────────────────────────
// Handles: headings, bold, italic, links, line breaks, paragraphs.
// Full Markdown is not supported — keep project descriptions relatively simple.
function mdToHtml(md) {
  if (!md) return "";
  return md
    .replace(/^### (.+)$/gm,  "<h3>$1</h3>")
    .replace(/^## (.+)$/gm,   "<h2>$1</h2>")
    .replace(/^# (.+)$/gm,    "<h1>$1</h1>")
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g,     "<em>$1</em>")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>')
    .replace(/^- (.+)$/gm,    "<li>$1</li>")
    .replace(/(<li>.*<\/li>\n?)+/g, m => `<ul>${m}</ul>`)
    .replace(/\n\n/g, "</p><p>")
    .replace(/^(?!<[h|u|l])/gm, "")
    .trim();
}

// ── Parse a project Markdown file ─────────────────────────────────────────
// Extracts the YAML-like metadata block between --- markers,
// plus the body text below it.
function parseProjectMd(raw) {
  const meta   = {};
  let   body   = raw;

  // Strip the leading H1 title line (we use meta.title instead)
  body = body.replace(/^#[^#].*\n/, "");

  // Extract the comment block (<!-- ... -->) and the metadata block (--- ... ---)
  body = body.replace(/<!--[\s\S]*?-->/g, "").trim();

  const fenceMatch = body.match(/^---\n([\s\S]*?)\n---/);
  if (fenceMatch) {
    fenceMatch[1].split("\n").forEach(line => {
      const m = line.match(/^(\w+):\s*(.*)$/);
      if (m) {
        let val = m[2].trim().replace(/^["']|["']$/g, "");
        meta[m[1]] = val;
      }
    });
    body = body.slice(fenceMatch[0].length).trim();
  }

  // Parse tags into an array
  if (meta.tags) {
    meta.tags = meta.tags.split(",").map(t => t.trim()).filter(Boolean);
  } else {
    meta.tags = [];
  }

  // Parse date
  meta.dateObj = meta.date ? new Date(meta.date) : new Date(0);

  meta.body = body;
  return meta;
}

// ── Parse the news Markdown file ──────────────────────────────────────────
// Expects items formatted as:
//   ## YYYY-MM-DD
//   News text here.
function parseNewsMd(raw) {
  const items = [];

  // Strip HTML comments
  const cleaned = raw.replace(/<!--[\s\S]*?-->/g, "").trim();

  // Split on ## date lines
  const sections = cleaned.split(/^## /m).filter(s => s.trim());
  for (const section of sections) {
    const lines = section.trim().split("\n");
    const dateLine = lines[0].trim();
    const dateObj  = new Date(dateLine);
    if (isNaN(dateObj.getTime())) continue; // skip non-date headings like "# News"

    const text = lines.slice(1).join("\n").trim();
    if (!text) continue;

    items.push({ date: dateLine, dateObj, text });
  }

  // Sort newest first
  items.sort((a, b) => b.dateObj - a.dateObj);
  return items;
}

// ── Icon SVGs ─────────────────────────────────────────────────────────────
// Returns an inline SVG string for the given icon key.
// Add new icons here if you need them.
const ICONS = {
  scholar: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M5.242 13.769L0 9.5 12 0l12 9.5-5.242 4.269C17.548 11.249 14.978 9.5 12 9.5c-2.977 0-5.548 1.748-6.758 4.269zM12 10a7 7 0 1 0 0 14 7 7 0 0 0 0-14z"/></svg>`,

  github: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>`,

  linkedin: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>`,

  orcid: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zM7.369 4.378c.525 0 .947.431.947.947s-.422.947-.947.947a.95.95 0 0 1-.947-.947c0-.525.422-.947.947-.947zm-.722 3.038h1.444v10.041H6.647V7.416zm3.562 0h3.9c3.712 0 5.344 2.653 5.344 5.025 0 2.578-2.016 5.016-5.325 5.016h-3.919V7.416zm1.444 1.303v7.444h2.297c2.359 0 3.881-1.303 3.881-3.722 0-2.009-1.284-3.722-3.881-3.722h-2.297z"/></svg>`,

  researchgate: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19.586 0c-.818 0-1.508.19-2.073.565-.563.377-.97.936-1.213 1.68a12.88 12.88 0 0 0-.742 4.217l-.032.738a8.08 8.08 0 0 1-1.085 3.766 5.07 5.07 0 0 1-2.625 2.103c-.97.35-1.967.525-2.99.525-1.022 0-2.018-.175-2.988-.525a5.07 5.07 0 0 1-2.625-2.103 8.08 8.08 0 0 1-1.085-3.766l-.032-.738a12.88 12.88 0 0 0-.742-4.217C1.106 1.701.698 1.142.135.765.43.19-.26 0-1.078 0H-5v24h5.078c.818 0 1.508-.19 2.073-.565.563-.376.97-.935 1.213-1.68.243-.745.38-1.731.413-2.958L3.81 18.1c.032-.63.098-1.194.198-1.694.1-.5.272-.908.516-1.22.245-.315.594-.473 1.048-.473.453 0 .803.158 1.048.474.244.312.416.72.516 1.22.1.5.166 1.063.198 1.693l.032.697c.033 1.227.17 2.213.413 2.958.243.745.65 1.304 1.213 1.68C9.556 23.81 10.246 24 11.064 24H24V0h-4.414zM12 14.5a4.5 4.5 0 1 1 0-9 4.5 4.5 0 0 1 0 9zm0-7.5a3 3 0 1 0 0 6 3 3 0 0 0 0-6z"/></svg>`,

  soundcloud: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M1.175 12.225c-.015 0-.023.01-.023.025l-.325 2.1.325 2.05c0 .015.008.025.023.025s.023-.01.023-.025l.368-2.05L1.2 12.25c0-.015-.008-.025-.023-.025zm.87-.198c-.018 0-.028.012-.028.03L1.7 14.35l.317 1.958c0 .018.01.03.028.03s.028-.012.028-.03l.36-1.958-.36-2.293c0-.018-.01-.03-.028-.03zm.943-.16c-.022 0-.035.015-.035.037L2.6 14.35l.353 2.308c0 .022.013.037.035.037s.035-.015.035-.037l.4-2.308-.4-2.446c0-.022-.013-.037-.035-.037zm.976-.026c-.026 0-.042.018-.042.044L3.56 14.35l.362 2.59c0 .026.016.044.042.044s.042-.018.042-.044l.41-2.59-.41-2.465c0-.026-.016-.044-.042-.044zm1.01.038c-.03 0-.048.02-.048.05l-.374 2.38.374 2.85c0 .03.018.05.048.05s.048-.02.048-.05l.423-2.85-.423-2.38c0-.03-.018-.05-.048-.05zm1.016-.33c-.034 0-.055.023-.055.057l-.385 2.69.385 3.09c0 .034.02.057.055.057s.055-.023.055-.057l.437-3.09-.437-2.69c0-.034-.02-.057-.055-.057zm1.005-.37c-.038 0-.062.026-.062.065l-.396 3.02.396 3.29c0 .038.024.065.062.065s.062-.026.062-.065l.447-3.29-.447-3.02c0-.038-.024-.065-.062-.065zm.993-.363c-.043 0-.068.03-.068.072l-.406 3.345.406 3.5c0 .043.025.072.068.072s.068-.03.068-.072l.46-3.5-.46-3.345c0-.043-.025-.072-.068-.072zm1.006-.326c-.047 0-.075.033-.075.08l-.417 3.623.417 3.71c0 .047.028.08.075.08s.075-.033.075-.08l.47-3.71-.47-3.622c0-.047-.028-.08-.075-.08zm1.01.013c-.05 0-.08.036-.08.086l-.427 3.61.427 3.89c0 .05.03.086.08.086s.08-.036.08-.086l.48-3.89-.48-3.61c0-.05-.03-.086-.08-.086zm4.524-4.197c-.28 0-.548.05-.796.14C13.41 4.66 11.686 3.5 9.667 3.5c-.54 0-1.062.1-1.546.28-.19.07-.24.14-.242.21v9.73c.002.073.052.134.13.15h9.467c.51 0 .924-.413.924-.924 0-.51-.413-.924-.924-.924-.07 0-.136.008-.2.023.013-.09.02-.18.02-.273C17.296 9.69 15.604 8 13.526 8c-.166 0-.33.015-.49.043a3.584 3.584 0 0 0-3.37-2.347z"/></svg>`,

  email: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>`,

  link: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/></svg>`,

  paper: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>`,

  code: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/></svg>`,

  play: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>`,

  demo: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-4H6v-2h12v2zm0-4H6V6h12v2z"/></svg>`,
};

function getIcon(key) {
  return ICONS[key] || ICONS["link"];
}

// ── Render social links ────────────────────────────────────────────────────
function renderLinks(links) {
  return links
    .filter(l => l.url)
    .map(l => `
      <a class="social-link" href="${l.url}" target="_blank" rel="noopener" title="${l.label}">
        <span class="social-icon">${getIcon(l.icon)}</span>
        <span class="social-label">${l.label}</span>
      </a>`)
    .join("");
}

// ── Render a single news item ──────────────────────────────────────────────
function renderNewsItem(item) {
  const d    = item.dateObj;
  const mon  = d.toLocaleString("default", { month: "short" });
  const year = d.getFullYear();
  const day  = d.getDate();
  const html = mdToHtml(item.text);
  return `
    <div class="news-item">
      <div class="news-date">
        <span class="news-month">${mon}</span>
        <span class="news-day">${day}</span>
        <span class="news-year">${year}</span>
      </div>
      <div class="news-text"><p>${html}</p></div>
    </div>`;
}

// ── Render a single project card ──────────────────────────────────────────
function renderProjectCard(p, index) {
  const tags     = (p.tags || []).map(t => `<span class="tag">${t}</span>`).join("");
  const bodyHtml = mdToHtml(p.body || "");

  // Media element (image, video, or nothing)
  let mediaHtml = "";
  if (p.image) {
    mediaHtml = `<div class="card-media" data-index="${index}">
      <img src="${p.image}" alt="${p.title}" loading="lazy" onerror="this.parentElement.style.display='none'">
      <div class="media-overlay">
        <span class="media-overlay-hint">click to expand</span>
      </div>
    </div>`;
  } else if (p.video) {
    mediaHtml = `<div class="card-media" data-index="${index}">
      <div class="video-thumb">
        <span class="play-icon">${getIcon("play")}</span>
        <span>Watch video</span>
      </div>
    </div>`;
  }

  // Action buttons
  const buttons = [];
  if (p.paper) buttons.push(`<a class="btn btn-ghost" href="${p.paper}" target="_blank" rel="noopener">${getIcon("paper")} Paper</a>`);
  if (p.code)  buttons.push(`<a class="btn btn-ghost" href="${p.code}"  target="_blank" rel="noopener">${getIcon("code")}  Code</a>`);
  if (p.demo)  buttons.push(`<a class="btn btn-primary" href="${p.demo}" target="_blank" rel="noopener">${getIcon("demo")} Demo</a>`);

  return `
    <article class="project-card" data-index="${index}">
      ${mediaHtml}
      <div class="card-body">
        <div class="card-tags">${tags}</div>
        <h3 class="card-title">${p.title}</h3>
        <div class="card-description">${bodyHtml}</div>
        ${buttons.length ? `<div class="card-actions">${buttons.join("")}</div>` : ""}
      </div>
    </article>`;
}

// ── Media modal ───────────────────────────────────────────────────────────
// Opens a full-screen overlay when a project card's media is clicked.
function openModal(project) {
  const modal = document.getElementById("media-modal");
  const inner = document.getElementById("modal-inner");
  inner.innerHTML = "";

  if (project.video) {
    // Detect YouTube/Vimeo
    if (project.video.includes("youtube.com") || project.video.includes("youtu.be")) {
      const id = project.video.match(/(?:v=|youtu\.be\/)([^&?/]+)/)?.[1];
      inner.innerHTML = `<iframe src="https://www.youtube.com/embed/${id}?autoplay=1"
        allow="autoplay; fullscreen" allowfullscreen></iframe>`;
    } else if (project.video.includes("vimeo.com")) {
      const id = project.video.match(/vimeo\.com\/(\d+)/)?.[1];
      inner.innerHTML = `<iframe src="https://player.vimeo.com/video/${id}?autoplay=1"
        allow="autoplay; fullscreen" allowfullscreen></iframe>`;
    } else {
      // Local .mp4
      inner.innerHTML = `<video controls autoplay src="${project.video}"></video>`;
    }
  } else if (project.demo) {
    inner.innerHTML = `<iframe src="${project.demo}" sandbox="allow-scripts allow-same-origin"></iframe>`;
  } else if (project.image) {
    inner.innerHTML = `<img src="${project.image}" alt="${project.title}">`;
  }

  modal.classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  const modal = document.getElementById("media-modal");
  modal.classList.remove("open");
  document.getElementById("modal-inner").innerHTML = "";
  document.body.style.overflow = "";
}

// ── Fetch text file helper ─────────────────────────────────────────────────
async function fetchText(path) {
  const r = await fetch(path + "?v=" + Date.now());
  if (!r.ok) throw new Error(`Failed to fetch ${path}: ${r.status}`);
  return r.text();
}

// ── Discover project files ─────────────────────────────────────────────────
// We fetch a manifest file (content/projects/index.json) that lists
// all project .md filenames so we know what to load.
// You update index.json whenever you add/remove a project.
async function loadProjects() {
  let filenames = [];
  try {
    const r = await fetch("content/projects/index.json?v=" + Date.now());
    if (r.ok) {
      filenames = await r.json();
    }
  } catch (_) {}

  if (!filenames.length) return [];

  const projects = [];
  for (const fn of filenames) {
    try {
      const raw = await fetchText(`content/projects/${fn}`);
      const p   = parseProjectMd(raw);
      projects.push(p);
    } catch (e) {
      console.warn("Could not load project:", fn, e);
    }
  }

  // Sort by date descending
  projects.sort((a, b) => b.dateObj - a.dateObj);
  return projects;
}

// ── Main render ───────────────────────────────────────────────────────────
async function init() {
  const cfg = SITE_CONFIG;

  // --- Head meta ---
  document.title = cfg.siteTitle || cfg.name;
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.content = cfg.siteDescription || "";

  // --- Profile photo ---
  const photo = document.getElementById("profile-photo");
  if (photo && cfg.profilePhoto) {
    photo.src = cfg.profilePhoto;
    photo.alt = cfg.name;
  }

  // --- Name & title ---
  const nameEl  = document.getElementById("site-name");
  const titleEl = document.getElementById("site-title");
  if (nameEl)  nameEl.textContent  = cfg.name;
  if (titleEl) titleEl.textContent = cfg.title || "";

  // --- Tagline ---
  const tagEl = document.getElementById("site-tagline");
  if (tagEl) tagEl.textContent = cfg.tagline || "";

  // --- Bio ---
  const bioEl = document.getElementById("site-bio");
  if (bioEl) bioEl.innerHTML = cfg.bio || "";

  // --- CV button ---
  const cvBtn = document.getElementById("cv-btn");
  if (cvBtn) {
    if (cfg.cvFile) {
      cvBtn.href = cfg.cvFile;
    } else {
      cvBtn.style.display = "none";
    }
  }

  // --- Social links ---
  const linksEl = document.getElementById("social-links");
  if (linksEl && cfg.links) {
    linksEl.innerHTML = renderLinks(cfg.links);
  }

  // --- News ---
  const newsEl = document.getElementById("news-feed");
  if (newsEl) {
    try {
      const raw   = await fetchText("content/news.md");
      const items = parseNewsMd(raw);
      if (items.length) {
        newsEl.innerHTML = items.map(renderNewsItem).join("");
      } else {
        newsEl.innerHTML = "<p class='empty'>No news yet.</p>";
      }
    } catch (e) {
      console.warn("Could not load news:", e);
      newsEl.innerHTML = "<p class='empty'>News unavailable.</p>";
    }
  }

  // --- Projects ---
  const projectsEl = document.getElementById("projects-grid");
  if (projectsEl) {
    try {
      const projects = await loadProjects();
      if (projects.length) {
        projectsEl.innerHTML = projects.map(renderProjectCard).join("");

        // Attach click handlers to each card's media area
        document.querySelectorAll(".card-media").forEach(el => {
          el.addEventListener("click", () => {
            const idx = parseInt(el.dataset.index, 10);
            openModal(projects[idx]);
          });
        });
      } else {
        projectsEl.innerHTML = "<p class='empty'>No projects yet. Add .md files to content/projects/ and update content/projects/index.json.</p>";
      }
    } catch (e) {
      console.warn("Could not load projects:", e);
      projectsEl.innerHTML = "<p class='empty'>Projects unavailable.</p>";
    }
  }

  // --- Modal close ---
  document.getElementById("modal-close")?.addEventListener("click", closeModal);
  document.getElementById("media-modal")?.addEventListener("click", e => {
    if (e.target === e.currentTarget) closeModal();
  });
  document.addEventListener("keydown", e => {
    if (e.key === "Escape") closeModal();
  });

  // --- Footer year ---
  const yearEl = document.getElementById("footer-year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
  const footerName = document.getElementById("footer-name");
  if (footerName) footerName.textContent = cfg.name;
}

document.addEventListener("DOMContentLoaded", init);
