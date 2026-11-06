---
layout: wide
permalink: /book/
title: "AI in Chemical Engineering"
lead: "Textbook, example notebooks, and lecture slides."
description: "AI in Chemical Engineering: Unlocking the Power Within Data (CRC Press, 2025), with example notebooks and lecture slides."
---
<div class="book">
  <img class="book__cover" src="{{ '/images/9781003455905.jpg' | relative_url }}" width="200" alt="Cover of AI in Chemical Engineering: Unlocking the Power Within Data">
  <div class="book__text">
    <h2>AI in Chemical Engineering: Unlocking the Power Within Data</h2>
    <p>José A. Romagnoli, Luis A. Briceno-Mena, and Vidhyadhar Manee<br>CRC Press, 2025 · First edition · ISBN 978-1-003-45590-5</p>
    <p>A textbook for advanced chemical engineering students and industry practitioners. It introduces machine learning and its application in the chemical and process industries: unsupervised, supervised, and reinforcement learning, with Python examples and case studies from oil and gas to electrochemistry.</p>
    <p><a class="button" href="https://doi.org/10.1201/9781003455905">Publisher page</a> <a class="button button--quiet" href="https://github.com/lbrice1/ai_cheme_examples">{% include icons/github.svg %} Examples repository</a></p>
  </div>
</div>

<div class="prose prose--wide" markdown="1">

## Example notebooks

To use the example notebooks, clone or download the [GitHub repository](https://github.com/lbrice1/ai_cheme_examples) and install the dependencies:

```bash
git clone https://github.com/lbrice1/ai_cheme_examples.git
cd ai_cheme_examples
pip install -r requirements.txt
```

## Chapter materials

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
@book{romagnoli2025ai,
  title     = {AI in Chemical Engineering: Unlocking the Power Within Data},
  author    = {Romagnoli, J.A. and Brice{\~n}o-Mena, L. and Manee, V.},
  year      = {2025},
  edition   = {1st},
  publisher = {CRC Press},
  doi       = {10.1201/9781003455905},
  url       = {https://doi.org/10.1201/9781003455905}
}
```

</div>
