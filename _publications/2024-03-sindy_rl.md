---
title: "SINDy-RL: Interpretable and Efficient Model-Based Reinforcement Learning"
collection: publications
permalink: #/publication/<link-name>
excerpt: 'We develop unifying methods for incorporating sparse dictionary learning into RL algorithms to accelerate the training process and provide more interpretable representations of the environment dynamics, reward, and policy.'
date: 2024-03-14
venue: 'arXiv'
paperurl: 'https://arxiv.org/abs/2403.09110'
citation: 'Zolman, Nicholas, et al. "SINDy-RL: Interpretable and Efficient Model-Based Reinforcement Learning." arXiv preprint arXiv:2403.09110 (2024).'
---

## SINDy-RL: Interpretable and Efficient Model-Based Reinforcement Learning

### Abstract
Deep reinforcement learning (DRL) has shown significant promise for uncovering sophisticated control policies that interact in environments with complicated dynamics, such as stabilizing the magnetohydrodynamics of a tokamak fusion reactor or minimizing the drag force exerted on an object in a fluid flow. However, these algorithms require an abundance of training examples and may become prohibitively expensive for many applications. In addition, the reliance on deep neural networks often results in an uninterpretable, black-box policy that may be too computationally expensive to use with certain embedded systems. Recent advances in sparse dictionary learning, such as the sparse identification of nonlinear dynamics (SINDy), have shown promise for creating efficient and interpretable data-driven models in the low-data regime. In this work we introduce SINDy-RL, a unifying framework for combining SINDy and DRL to create efficient, interpretable, and trustworthy representations of the dynamics model, reward function, and control policy. We demonstrate the effectiveness of our approaches on benchmark control environments and challenging fluids problems. SINDy-RL achieves comparable performance to state-of-the-art DRL algorithms using significantly fewer interactions in the environment and results in an interpretable control policy orders of magnitude smaller than a deep neural network policy.