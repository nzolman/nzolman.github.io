/**
 * ============================================================
 *  SITE CONFIGURATION — Edit this file to update your site
 * ============================================================
 *
 *  All personal info, links, and settings live here.
 *  After editing, just push to GitHub — no build step needed.
 */

const SITE_CONFIG = {

  // ── Personal Info ─────────────────────────────────────────
  name:       "Nick Zolman",
  title:      "PhD Student · University of Washington",
  tagline:    "Dynamical systems & machine learning at the intersection of physics and data.",
  email:      "",           // e.g. "nzolman@uw.edu" — leave blank to hide
  location:   "Seattle, WA",

  // ── Profile Photo ─────────────────────────────────────────
  // Path relative to site root, or a full URL
  profilePhoto: "assets/profile.png",

  // ── CV ────────────────────────────────────────────────────
  // Drop your CV PDF into the /cv/ folder and set the filename here.
  // Set to null to hide the CV button.
  cvFile: "cv/cv.pdf",

  // ── Bio (HTML allowed) ────────────────────────────────────
  bio: `
    I am a PhD student at the University of Washington advised by
    <a href="https://www.eigensteve.com/">Steve Brunton</a>, studying
    the intersection of dynamical systems and machine learning.
    My research focuses on incorporating known physical structure into
    machine learning and optimization — especially in the low-data regime.
    <br><br>
    In a past life I studied pure mathematics and theoretical physics,
    and those threads still run through my work. Outside of academics,
    you can find me playing tennis, attempting to write music, and
    hunting for the best breakfast burrito the Pacific Northwest has to offer.
  `,

  // ── Social / Academic Links ───────────────────────────────
  // Each entry renders as an icon link in the sidebar.
  // Set url: null to hide an entry.
  links: [
    {
      label:  "Google Scholar",
      icon:   "scholar",     // see icons in site.js
      url:    "https://scholar.google.com/citations?user=qiVKrJMAAAAJ&hl=en",
    },
    {
      label:  "GitHub",
      icon:   "github",
      url:    "https://github.com/nzolman",
    },
    {
      label:  "LinkedIn",
      icon:   "linkedin",
      url:    "https://www.linkedin.com/in/nick-zolman-430573111",
    },
    {
      label:  "ORCID",
      icon:   "orcid",
      url:    "https://orcid.org/0009-0003-3627-5217",
    },
    {
      label:  "ResearchGate",
      icon:   "researchgate",
      url:    "https://www.researchgate.net/profile/Nicholas-Zolman",
    },
    {
      label:  "SoundCloud",
      icon:   "soundcloud",
      url:    "https://soundcloud.com/nick-zolman",
    },
  ],

  // ── Site Meta ─────────────────────────────────────────────
  siteTitle:       "Nick Zolman",
  siteDescription: "PhD student at UW studying dynamical systems and machine learning.",
};
