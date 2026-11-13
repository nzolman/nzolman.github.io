# Understanding Extreme Event Mechanisms

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
title:  Uncovering Extreme Event Mechanisms for Prediction and Control with Sensitivity-Balanced Projections
date:   2026-06-04
tags:   Extreme Events, CoBRAS, Reduced-Order Modeling, Balanced Truncation
image:  assets/projects/extreme_events_f1.png
code: https://github.com/nzolman/cobras-extreme
paper: https://arxiv.org/abs/2606.05618
---

We identify linear oblique projections (via CoBRAS) that best capture the sensitivity of a quantity of interest and reconstruct the original state. To accommodate spatially localized events, we also introduce a new variant of CoBRAS to obtain local sensitivity-balanced projections. We demonstrate the utility of this approach to characterize extreme events across a diverse set of challenging systems, including turbulent bursts of energy dissipation in the 2D Kolmogorov Flow, spontaneous synchronization in networks of coupled FitzHugh-Nagumo oscillators, and the localized formation of ocean rogue waves from a modified nonlinear Schrödinger equation. For each example, we show that our simple forecast models accurately predict extreme events and that the underlying mechanisms may be used to design control laws to prevent these events. Finally, we demonstrate that by learning a neural network surrogate model of the dynamics directly from data, we may extend this approach to experimental systems and systems that are not natively written in an automatically differentiable programming language.

**Key contributions:**

- Reveal the underlying mechanisms of extreme events, identifying interpretable structures such as critical nodes in dynamic networks.
- Demonstrate enhanced prediction of extreme events by building simple forecast models directly from CoBRAS coordinates.
- Validate the identified mechanisms by developing minimally actuated controllers that completely suppress event formation.
- Extend CoBRAS to spatially localized phenomena by applying it to design sliding nonlinear filters.
- Develop a fully data-driven pipeline by replacing adjoint implementations with automatically differentiable neural surrogates.


