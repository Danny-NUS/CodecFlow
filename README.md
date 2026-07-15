# CodecFlow

**Efficient Bandwidth Extension via Conditional Flow Matching in Neural Codec Latent Space**

CodecFlow is a neural codec-based speech bandwidth extension framework. It reconstructs high-frequency speech content in a compact codec latent space using a voicing-aware conditional flow converter and a structure-constrained residual vector quantizer.

This repository contains the official interactive project page, including method illustrations, spectrogram visualizations, baseline comparisons, ablation studies, and playable audio samples for both 8 kHz → 16 kHz and 8 kHz → 44.1 kHz bandwidth extension.

## Project Page

The interactive demo is available at:

**https://danny-nus.github.io/CodecFlow/**

## Authors

- Bowen Zhang
- Junchuan Zhao
- Ian McLoughlin
- Ye Wang
- A S Madhukumar

## Overview

Speech bandwidth extension improves speech clarity and intelligibility by restoring or inferring high-frequency content from low-bandwidth recordings. Conventional waveform- and spectrogram-domain systems can be computationally expensive and may struggle to preserve fine high-frequency details.

CodecFlow instead performs bandwidth extension in neural codec latent space. The framework contains two main components:

1. **Voicing-aware conditional flow converter** — models the mapping between low-resolution and high-resolution continuous codec embeddings while using voiced/unvoiced information as an additional condition.
2. **Structure-constrained residual vector quantizer** — improves latent alignment and stabilizes the reconstruction of high-resolution codec representations.

The model is optimized end-to-end and evaluated on two bandwidth extension settings:

- **8 kHz → 16 kHz** speech bandwidth extension
- **8 kHz → 44.1 kHz** speech bandwidth extension

## Demo Contents

The project page includes:

- An overview of the CodecFlow architecture
- Voiced/unvoiced segmentation and latent-similarity analysis
- Spectrogram comparisons for both target bandwidths
- Audio comparisons against NU-Wave2, AP-BWE, Fre-Painter, and FlowHigh
- Ablation comparisons for CodecReg, CFM-Conf, and CFM-UConf variants
- Responsive layouts for desktop, tablet, and mobile devices

CodecFlow samples are visually highlighted in the comparison grids. Target and input references use a neutral dashed style to distinguish them from generated samples.

## Repository Structure

```text
CodecFlow/
├── index.md                 # Main Jekyll project page
├── _config.yml              # Jekyll and theme configuration
├── _includes/
│   └── comparison.html      # Reusable audio-comparison component
├── assets/
│   └── css/
│       └── style.scss       # Page styling and responsive behavior
├── figures/                 # Method and result figures
├── 16k/                     # 8 kHz → 16 kHz baseline samples
│   ├── gt/
│   ├── input/
│   ├── CodecFlow/
│   └── ...
├── 44.1k/                   # 8 kHz → 44.1 kHz baseline samples
│   ├── gt/
│   ├── input/
│   ├── CodecFlow/
│   └── ...
└── ablation/                # Ablation-study audio and spectrograms
    ├── 16k/
    └── 44.1k/
```

Each method directory contains matching `.wav` audio files and `.png` mel-spectrogram images used by the interactive comparison cards.

## Running the Demo Locally

The site is built with Jekyll and the Cayman theme.

### Prerequisites

- Ruby
- RubyGems
- Jekyll
- `jekyll-theme-cayman`

Install the required gems:

```bash
gem install jekyll jekyll-theme-cayman kramdown-parser-gfm
```

Start the local development server from the repository root:

```bash
jekyll serve
```

Then open `http://127.0.0.1:4000/` in a browser.

To create a production build:

```bash
jekyll build
```

The generated static site will be written to `_site/`.

## Deployment

The repository is compatible with GitHub Pages.

1. Push the repository to GitHub.
2. Open **Settings → Pages** in the repository.
3. Select **Deploy from a branch**.
4. Choose the publishing branch and repository root.
5. Save the configuration and wait for the Pages deployment to complete.

## Citation

If you use CodecFlow in your research, please cite:

```bibtex
@article{zhang2026codecflow,
  title   = {CodecFlow: Efficient Bandwidth Extension via Conditional Flow Matching in Neural Codec Latent Space},
  author  = {Zhang, Bowen and Zhao, Junchuan and McLoughlin, Ian and Wang, Ye and Madhukumar, A. S.},
  journal = {arXiv preprint arXiv:2603.02022},
  year    = {2026}
}
```

## Contact

For questions about the project or demo page, please open an issue in this repository or contact the authors through their institutional pages.
