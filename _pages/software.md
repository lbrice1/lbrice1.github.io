---
layout: wide
permalink: /software/
title: "Software"
lead: "Open-source and research software for hybrid modeling, process simulation, and teaching."
redirect_from:
  - /portfolio/
  - /portfolio/portfolio-0/
  - /portfolio/portfolio-1/
  - /portfolio/portfolio-2/
---
<ul class="software">
  <li class="software__item">
    <img src="{{ '/images/abstract.png' | relative_url }}" alt="Schematic of the HElioS hybrid modeling workflow" loading="lazy">
    <div>
      <h2>HElioS</h2>
      <p class="software__kind">Python package · open source</p>
      <p>A Python framework for modeling and optimizing electrochemical systems with hybrid physics-informed and data-driven models. It provides data preprocessing and range checking, model architectures that combine physics-based and learned components, trainers and optimizers for devices and materials, and plotting tools. It supported the work on surrogate models and transfer learning for HT-PEM fuel cells.</p>
      <p><a class="button" href="https://github.com/lbrice1/helios">Repository</a></p>
    </div>
  </li>
  <li class="software__item">
    <img src="{{ '/images/book-cover-hires.jpg' | relative_url }}" alt="Cover of AI in Chemical Engineering" loading="lazy">
    <div>
      <h2>AI in Chemical Engineering: examples</h2>
      <p class="software__kind">Jupyter notebooks · open source</p>
      <p>Example notebooks and slides for the textbook <em>AI in Chemical Engineering</em>, covering data pretreatment, dimensionality reduction, clustering, predictive models, deep learning, and reinforcement learning.</p>
      <p><a class="button" href="https://github.com/lbrice1/ai_cheme_examples">Repository</a> <a class="button button--quiet" href="{{ '/book/' | relative_url }}">Book page</a></p>
    </div>
  </li>
  <li class="software__item">
    <img src="{{ '/images/swcomp.png' | relative_url }}" alt="SimWiz virtual plant interface" loading="lazy">
    <div>
      <h2>SimWiz</h2>
      <p class="software__kind">Process simulation platform · contributor</p>
      <p>An interactive platform with virtual plants, from single units to full processing plants. Written in Python and driven by an industry-standard process simulator, it emulates a distributed control system for operating plants, collecting data, and teaching across the chemical engineering curriculum.</p>
    </div>
  </li>
</ul>
