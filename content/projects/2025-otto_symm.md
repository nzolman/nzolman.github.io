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
title:  A unified framework to enforce, discover, and promote symmetry in machine learning
date:   2025-12-28
tags:   Symmetry, Lie Groups, Structure Preservation, Convex Optimization, Equivariance, Invariance, 
image:  assets/projects/lie-otto_drawing.png
code: https://github.com/nzolman/unified-symmetry-ml
paper:  https://www.jmlr.org/papers/v26/24-1315.html
---

We demonstrate that for a wide-variety of mathematical objects (e.g. submanifolds, tensor fields, integral operators) studying different types of symmetry (e.g. invariance, equivariance, symplectic structure) is equivalent to examining the null-space of a bilinear operator (a generalized notion of a Lie derivative). In particular, we provide a novel way to promote symmetry in machine learning by minimizing the rank of this bilinear operator. By adding a nuclear norm regularization term to regression problems, we are able to promote as much symmetry that is allowable by the data while breaking the symmetries that are inconsistent. This acts as a parsimonious prior; finding the simplest, most symmetric functions as possible. The framework is particularly appealing when performing basis function regression (e.g. dictionary learning a la SINDy) because the symmetry-promoting regularization preserves the convex structure from the original regression problem. 

**Key contributions:**
- Enforce symmetry with linear constraints.
- Discover symmetry by examining Lie derivative null space.
- Promote symmetry with convex nuclear norm penalty.
- Developed Equivariance Promoting Neural Networks (EPNNs) by composing equivariant-promoting modules.


