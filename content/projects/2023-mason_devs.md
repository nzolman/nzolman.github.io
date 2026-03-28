# Structure-Preserving Autoencoders for Hamiltonian Systems

<!-- ============================================================
  HOW TO CONFIGURE A PROJECT
  ============================================================
  Fill in the YAML-style metadata block below, then write your
  project description in Markdown after the closing ---

  REQUIRED fields:
    title       — displayed as the project card heading
    date        — used for sorting (YYYY-MM-DD)
    tags        — comma-separated list, e.g. "ML, Physics, Dynamics"

  OPTIONAL media (include any combination):
    image       — path to a PNG/JPG relative to site root, or a URL
    video       — path to an .mp4 file, or a YouTube/Vimeo URL
    demo        — URL to an interactive demo (opens in an iframe or new tab)
    paper       — URL to the paper / arXiv
    code        — URL to GitHub repo
    website     — any other external link

  Set any field to "" or omit it to hide that element.
  ============================================================
-->
---
title:  Learning to predict 3D rotational dynamics from images of a rigid body with unknown mass distribution
date:   2023-10-29
tags:   Hamiltonian Mechanics, Autoencoders, Structure Preservation
image:  assets/projects/ncube-0.gif
paper:  https://www.mdpi.com/2226-4310/10/11/921
---

We present a physics-based neural network model to estimate and predict 3D rotational dynamics from image sequences. We achieve this using a multi-stage prediction pipeline that maps individual images to a latent representation homeomorphic to SO(3), computes angular velocities from latent pairs, and predicts future latent states using the Hamiltonian equations of motion.

**Key contributions:**
- Homeomorphic autoencoder mapping to latent SO(3)
- Identify moment of inertia tensor consistent for propagating rigid-body dynamics.


