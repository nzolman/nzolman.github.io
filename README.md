# nzolman.github.io

Personal academic website. Built with plain HTML, CSS, and JavaScript — no build step, no framework, no dependencies. Just push to GitHub and it's live.

---

## Quick-start: how to update things

### Change your name, bio, links, or CV

Open **`js/site.config.js`** and edit the fields there. Everything is annotated. This is the only file you need to touch for personal info.

### Add a news item

Open **`content/news.md`** and add a new entry at the top:

```markdown
## 2025-07-01
📄 New paper accepted at ICML 2025 — "[Title](https://arxiv.org/...)."
```

The date must be in `YYYY-MM-DD` format. Items are sorted newest-first automatically.

### Add a research project

1. Create a new file in **`content/projects/`**, e.g. `my-new-project.md`:

```markdown
# My Project Title

---
title:  My Project Title
date:   2025-06-15
tags:   Tag One, Tag Two
image:  assets/projects/my-project.png
video:  ""
demo:   https://my-demo.com
paper:  https://arxiv.org/abs/xxxx.xxxxx
code:   https://github.com/nzolman/my-project
---

Project description in **Markdown**. Keep it 2–4 sentences.

**Key contributions:**
- Contribution one
- Contribution two
```

2. Add the filename to **`content/projects/index.json`**:

```json
[
  "my-new-project.md",
  "hamiltonian-autoencoders.md",
  "operator-learning.md"
]
```

That's it. The site will pick it up automatically.

#### Media options

| Field   | What to put                                    | Effect                              |
|---------|------------------------------------------------|-------------------------------------|
| `image` | Path like `assets/projects/img.png` or a URL  | Thumbnail on card; click to enlarge |
| `video` | YouTube URL, Vimeo URL, or local `.mp4` path   | Click thumbnail to play in modal    |
| `demo`  | Any URL                                        | Button opens in new tab             |
| `paper` | arXiv / journal URL                            | "Paper" button                      |
| `code`  | GitHub URL                                     | "Code" button                       |

Leave any field as `""` or omit it to hide that element.

### Add your CV

Drop your PDF into the **`cv/`** folder and update `cvFile` in `site.config.js`:

```js
cvFile: "cv/cv.pdf",
```

### Add a profile photo

Drop your photo into **`assets/`** and update `profilePhoto` in `site.config.js`:

```js
profilePhoto: "assets/profile.png",
```

### Add a project image

Drop images into **`assets/projects/`** and reference them in your project `.md` files:

```markdown
image: assets/projects/my-project.png
```

---

## File structure

```
nzolman.github.io/
├── index.html                  ← Site HTML (rarely needs editing)
├── css/
│   └── style.css               ← All styles; CSS variables at top for theming
├── js/
│   ├── site.config.js          ← ★ YOUR PERSONAL INFO LIVES HERE ★
│   └── site.js                 ← Site engine (Markdown parsing, rendering)
├── content/
│   ├── news.md                 ← ★ ADD NEWS ITEMS HERE ★
│   └── projects/
│       ├── index.json          ← List of project .md files to load
│       ├── hamiltonian-autoencoders.md
│       └── operator-learning.md
├── assets/
│   ├── profile.png             ← Your profile photo
│   └── projects/               ← Project images go here
├── cv/
│   └── cv.pdf                  ← Your CV
└── README.md
```

---

## Theming

Open `css/style.css` and find the `:root` block near the top. The main accent color is `--accent`; change it to retheme the entire site. Font choices are also there.

---

## Deployment

This site is designed for **GitHub Pages** with no build step:

1. Push everything to the `main` branch of `<username>.github.io`
2. In repo Settings → Pages → set Source to `main` / `/ (root)`
3. Done — live at `https://<username>.github.io`

---

## Adding sections

To add a new section (e.g. Teaching, Publications):

1. Add a `<section>` in `index.html` inside `<main>`:

```html
<section id="teaching">
  <h2 class="section-heading">Teaching</h2>
  <div id="teaching-content">
    <!-- write HTML directly, or load from a .md file in site.js -->
  </div>
</section>
```

2. Either write the content as HTML directly, or load it dynamically from a Markdown file using the same pattern as news/projects in `site.js`.
