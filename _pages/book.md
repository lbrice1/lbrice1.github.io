---
permalink: /book/
title: "AI in ChemE Book"
excerpt: "Textbook, supplementary notebooks, and lecture slides"
author_profile: true
header:
  overlay_color: "#0f2d52"
  overlay_filter: "0.65"
---

<div style="display:flex; gap:2em; align-items:flex-start; flex-wrap:wrap; margin-bottom:2em;">
  <img src="/images/9781003455905.jpg" alt="Book cover: AI in Chemical Engineering" style="max-width:200px; border-radius:6px; box-shadow:0 4px 16px rgba(0,0,0,0.18);">
  <div>
    <h2 style="margin-top:0; border-left:none; padding-left:0;">AI in Chemical Engineering:<br>Unlocking the Power Within Data</h2>
    <p><strong>José A. Romagnoli, Luis Briceño-Mena, Vidhyadhar Manee</strong><br>
    CRC Press / Taylor &amp; Francis, 2024 &nbsp;·&nbsp; 1st Edition<br>
    ISBN: 978-1-003-45590-5</p>
    <p>
      <a href="https://doi.org/10.1201/9781003455905" class="btn btn--info" target="_blank" rel="noopener">Buy / View on Publisher Site</a>
      &nbsp;
      <a href="https://github.com/lbrice1/ai_cheme_examples" class="btn btn--info" target="_blank" rel="noopener"><i class="fab fa-github"></i> GitHub Repository</a>
    </p>
  </div>
</div>

Industry 4.0 is revolutionizing chemical manufacturing. Today's chemical companies are swiftly embracing the digital era, recognizing the significant benefits of interconnected products, production equipment, and personnel. As technology advances and production volumes grow, there is an increasing need for new computational tools and innovative solutions to address everyday challenges.

*AI in Chemical Engineering: Unlocking the Power Within Data* introduces readers to the essential concepts of machine learning and their application in the chemical and process industries, aiming to enhance efficiency, adaptability, and profitability. This work delves into the transformation of traditional plant operations into integrated and intelligent systems, providing readers with a foundation for developing and understanding the tools necessary for data collection and analysis.

This practical text is designed for advanced chemical engineering students and industry practitioners. It introduces concepts and theories in a logical and sequential manner, serving as an essential resource for understanding both current and emerging developments in this important and evolving field.

## Getting Started with the Examples

To use the example notebooks, clone or download the [GitHub repository](https://github.com/lbrice1/ai_cheme_examples) and install the dependencies:

```bash
git clone https://github.com/lbrice1/ai_cheme_examples.git
cd ai_cheme_examples
pip install -r requirements.txt
```

## Chapter Materials

Slides and Jupyter notebooks are available for the chapters listed below. Chapters without supplementary materials are included for completeness.

| Chapter | Title | Slides | Notebooks |
|:---:|---|:---:|---|
| 1 | Smart Manufacturing and Machine Learning | [PDF](https://github.com/lbrice1/ai_cheme_examples/blob/main/slides-pdf/chapter-1.pdf) | — |
| 2 | Data and Data Pretreatment | [PDF](https://github.com/lbrice1/ai_cheme_examples/blob/main/slides-pdf/chapter-2.pdf) | [Plant Data](https://github.com/lbrice1/ai_cheme_examples/blob/main/notebooks/Example-2-0-plant_data.ipynb) · [Outlier Detection](https://github.com/lbrice1/ai_cheme_examples/blob/main/notebooks/Example-2-1-outlier.ipynb) · [Missing Data](https://github.com/lbrice1/ai_cheme_examples/blob/main/notebooks/Example-2-2-missing_data.ipynb) · [Sampling](https://github.com/lbrice1/ai_cheme_examples/blob/main/notebooks/Example-2-3-cnn_sampling.ipynb) · [Scaling](https://github.com/lbrice1/ai_cheme_examples/blob/main/notebooks/Example-2-4-scaling.ipynb) |
| 3 | Dimensionality Reduction | [PDF](https://github.com/lbrice1/ai_cheme_examples/blob/main/slides-pdf/chapter-3.pdf) | [PacMAP](https://github.com/lbrice1/ai_cheme_examples/blob/main/notebooks/Example-3-1-pacmap.ipynb) |
| 4 | Clustering | [PDF](https://github.com/lbrice1/ai_cheme_examples/blob/main/slides-pdf/chapter-4.pdf) | [Clustering](https://github.com/lbrice1/ai_cheme_examples/blob/main/notebooks/Example-4-1-clustering.ipynb) · [Self-Organizing Maps](https://github.com/lbrice1/ai_cheme_examples/blob/main/notebooks/Example-4-2-som.ipynb) |
| 5 | Unsupervised Learning Case Study | — | — |
| 6 | Concepts and Definitions | [PDF](https://github.com/lbrice1/ai_cheme_examples/blob/main/slides-pdf/chapter-6.pdf) | [Method Selection](https://github.com/lbrice1/ai_cheme_examples/blob/main/notebooks/Example-6-1-method_selection.ipynb) · [Feature Selection](https://github.com/lbrice1/ai_cheme_examples/blob/main/notebooks/Example-6-2-feature_selection.ipynb) |
| 7 | Predictive Models | [PDF](https://github.com/lbrice1/ai_cheme_examples/blob/main/slides-pdf/chapter-7.pdf) | [Support Vector Regression](https://github.com/lbrice1/ai_cheme_examples/blob/main/notebooks/Example-7-1-svr.ipynb) |
| 8 | Supervised Learning Case Studies | — | — |
| 9 | Deep Learning | [PDF](https://github.com/lbrice1/ai_cheme_examples/blob/main/slides-pdf/chapter-9.pdf) | [Convolutional Neural Network](https://github.com/lbrice1/ai_cheme_examples/blob/main/notebooks/Example-9-1-convnet.ipynb) |
| 10 | Deep Learning Case Studies | — | — |
| 11 | Reinforcement Learning | [PDF](https://github.com/lbrice1/ai_cheme_examples/blob/main/slides-pdf/chapter-11.pdf) | [RL Intro](https://github.com/lbrice1/ai_cheme_examples/blob/main/notebooks/Example-11-1-rl.ipynb) · [RL-PID Control](https://github.com/lbrice1/ai_cheme_examples/blob/main/notebooks/Example-11-1-rl_b.ipynb) |
| 12 | Reinforcement Learning Case Studies | — | — |
| 13 | Generative AI | [PDF](https://github.com/lbrice1/ai_cheme_examples/blob/main/slides-pdf/chapter-13.pdf) | — |

## Citation

If you use the materials in this repository in your research or teaching, please cite:

```bibtex
@book{romagnoli2024ai,
  title     = {AI in Chemical Engineering: Unlocking the Power Within Data},
  author    = {Romagnoli, J.A. and Brice{\~n}o-Mena, L. and Manee, V.},
  year      = {2024},
  edition   = {1st},
  publisher = {CRC Press},
  doi       = {10.1201/9781003455905},
  url       = {https://doi.org/10.1201/9781003455905}
}
```
