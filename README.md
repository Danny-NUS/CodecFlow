# CodecFlow

**CodecFlow: Speech Bandwidth Extension via Residual Flow Matching in Codec Latent Space**

This repository contains the research website and listening samples for CodecFlow. It is a demonstration website, not a training or inference implementation.

## Authors

Bowen Zhang, Junchuan Zhao, Ian McLoughlin, Ye Wang, and A. S. Madhukumar.

Affiliations: Singapore Institute of Technology, Nanyang Technological University, and National University of Singapore. Author–affiliation associations are shown on the project page.

## Method

CodecFlow is a two-stage speech bandwidth extension system. Stage 1 learns the residual between narrowband and full-band continuous latents from a frozen neural codec encoder using conditional flow matching. The converter is conditioned on the narrowband latent and a frame-level voicing descriptor. Stage 2 adapts the codec decoder to reconstruct waveforms from the continuous predictions with the residual vector quantiser bypassed.

The page follows the September 27, 2026 manuscript and preserves its abstract and method-figure caption.

## Website contents

- Full paper title, authors, affiliations, and abstract.
- Method diagram rendered from `figure_overview.pdf`, with the original PDF available separately.
- Complete spectrogram comparisons: LibriTTS test-clean (`M1.jpg`), TIMIT (`M2.jpg`), and VCTK (`M3.jpg`). Figures can be enlarged without cropping.
- Baseline comparisons: reference, 8 kHz input, codec round trip, NU-Wave2, FlowHigh, Fre-Painter, AP-BWE, and CodecFlow.
- Decoding-path ablations: RFC + RVQ + frozen D; RFC + RVQ + adapted D; FLC + adapted D; RFC + adapted D (CodecFlow).

There are 72 WAV files across three test sets. Each test set supplies one female and one male utterance shared across the baseline and ablation sections. TIMIT and LibriTTS use 16 kHz playback; VCTK uses 44.1 kHz playback. The 8 kHz input tracks are resampled to the playback rate. See [sample documentation](samples/README.md) for selection details and per-file metrics; these values are not aggregate paper results.

All systems are displayed directly without horizontal scrolling. CodecFlow appears last in violet. Playing a sample pauses any other active sample.

Each audio player shows its mel spectrogram by default. Click **Hide mel spectrogram** to collapse an individual preview. The button above each dataset expands or collapses all of its mel previews. Click a preview to enlarge the full, uncropped image.

### Audio mel previews

The previews in `samples/mel/` are generated directly from the matching WAV files, not from the earlier demo images. They use 128 HTK mel bands, a 32 ms periodic Hann window, an 8 ms hop, and an FFT length rounded up to the next power of two. Triangular filters are normalised by their discrete weight sum. Colour limits are −80 to 0 dB relative to the peak mel power of the same utterance's reference recording, shared across all baseline and ablation systems. The frequency range extends to the playback rate's Nyquist frequency; a dashed line marks 4 kHz. These are website listening aids, not replacements for the supplied manuscript result figures or its metric calculation pipeline.

To regenerate all 72 previews, install `numpy` and `matplotlib` in a Python environment and run:

```bash
python scripts/generate_mels.py
```

## Repository structure

```text
CodecFlow/
├── index.html                 # Research page and manuscript text
├── .nojekyll                  # Direct static hosting on GitHub Pages
├── assets/
│   ├── css/site.css           # Responsive academic layout
│   ├── js/site.js             # Audio tables and figure viewer
│   └── figures/overview.png   # Web rendering of the method PDF
├── figure_overview.pdf        # Original method diagram
├── M1.jpg                     # LibriTTS spectrogram comparison
├── M2.jpg                     # TIMIT spectrogram comparison
├── M3.jpg                     # VCTK spectrogram comparison
├── scripts/generate_mels.py   # Reproducible per-audio mel generation
└── samples/
    ├── manifest.json          # System labels, paths, per-file metrics
    ├── README.md              # Sample provenance and metadata
    ├── mel/                   # Generated, full-length per-audio mel previews
    ├── baselines/             # 48 WAV files
    └── ablation/              # 24 WAV files
```

Current audio and per-audio mel previews come only from `samples/`. The repository contains the current static website and its source assets; the superseded demo collections and Jekyll configuration have been removed.

## Local preview

The site is plain HTML, CSS, and JavaScript, with no package installation or build step. With Python 3 installed, run from the repository root:

```bash
python3 -m http.server 4174 --bind 127.0.0.1
```

Open [http://127.0.0.1:4174/](http://127.0.0.1:4174/). Use HTTP rather than opening `index.html` directly: browsers restrict fetching the sample manifest from `file://` pages.

## Editing

- Edit manuscript text, authors, captions, and figure references in `index.html`.
- Edit layout and colours in `assets/css/site.css`.
- Update sample paths and metadata in `samples/manifest.json`; system ordering and playback behaviour are in `assets/js/site.js`.
- Keep utterance IDs consistent across systems within a test set. Manifest paths are relative to `samples/`.
- After replacing the method PDF, regenerate its full-page PNG. With Poppler installed:

```bash
pdftoppm -f 1 -singlefile -scale-to 2400 -png figure_overview.pdf assets/figures/overview
```

Before publishing, check desktop and mobile layouts, full figure visibility, and playback in each dataset. No external fonts, analytics, or JavaScript libraries are required.

## Deployment

Use GitHub Pages or any static web server. For branch-based GitHub Pages deployment, select the publishing branch and repository root under **Settings → Pages**. Keep `.nojekyll` at the root to bypass Jekyll. All asset URLs are relative and support the `/CodecFlow/` project path.

Project URL: [https://danny-nus.github.io/CodecFlow/](https://danny-nus.github.io/CodecFlow/).

Local edits do not change the public website until committed, pushed, and deployed. This redesign does not publish the manuscript PDF or assert a publication venue, acceptance status, DOI, or arXiv identifier.

## Questions

Open a repository issue for website or sample problems. Include the test set, system name, and utterance ID when reporting an audio issue.
