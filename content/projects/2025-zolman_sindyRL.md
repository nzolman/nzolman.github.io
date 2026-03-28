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
title:  SINDy-RL for Interpretable and Efficient Model-Based Reinforcement Learning
date:   2025-11-28
tags:   SINDy, DRL, SINDy-RL, control, sparse, dictionary learning
image:  assets/projects/pinball_350.gif
code: https://github.com/nzolman/sindy-rl
paper:  https://www.nature.com/articles/s41467-025-65738-4
---

We introduce SINDy-RL, a unifying framework for combining SINDy and DRL to create efficient, interpretable, and trustworthy representations of the dynamics model, reward function, and control policy. We demonstrate the effectiveness of our approaches on benchmark control environments and flow control problems, including gust mitigation on a 3D NACA 0012 airfoil at Re = 1000. SINDy-RL achieves comparable performance to modern DRL algorithms using significantly fewer interactions in the environment and results in an interpretable control policy orders of magnitude smaller than a DRL policy.

**Key contributions:**

- Reduce training time for learning a control policy by ~10-100x through offloading expensive experience collection into an E-SINDy model of the environment.
- Leverage the efficiency of the surrogate models to accelerate expensive hyperparameter tuning.
- Learn a surrogate reward when the reward is not directly measurable from observations.
- Reduce the complexity of a neural network policy by learning a sparse, symbolic surrogate policy, with comparable performance and smoother control.
- Quantify the uncertainty of models and provide insight into the quality of the learned models.


