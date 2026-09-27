# Speech samples (project page)

Built by `docs/figs/make_demo_samples.py` from the exact output folders scored in the paper. One male (M) and one female (F) utterance per test set; the same two utterances are used in both sections. Per test set and gender, the utterance is the most typical file of our final system (LSD and ViSQOL closest to the set medians) among files at least 3 s long, so these are neither best nor worst cases.

Layout: `<section>/<testset>/<system>/<utterance>.wav`. All files are mono 16-bit PCM at the track rate (16 kHz for TIMIT/LibriTTS, 44.1 kHz for VCTK). `manifest.json` holds the same information as the tables below, for building the page.

Sections:

- `baselines/` = Table I in the September 27, 2026 manuscript (comparison with published systems): reference, 8 kHz input, codec round trip, NU-Wave2, FlowHigh, Fre-Painter, AP-BWE, ours.
- `ablation/` = Table II in the September 27, 2026 manuscript (decoding-path ablation): RFC + RVQ + frozen D, RFC + RVQ + adapted D, FLC + adapted D, RFC + adapted D (ours). `rfc_adaptedD_ours` is the same audio as `baselines/*/ours`.

Metrics are the per-file values behind the paper tables (LSD, LSD-LF, LSD-HF lower is better; ViSQOL, NISQA higher is better).

## TIMIT, 8->16 kHz (cross-corpus, 49 utt.)

- `fmml0_sx50` (F, 3.2 s)
- `mlll0_si1363` (M, 4.99 s)

### baselines

| folder | system | fmml0_sx50 (F) LSD / LF / HF / ViSQOL / NISQA | mlll0_si1363 (M) LSD / LF / HF / ViSQOL / NISQA |
|---|---|---|---|
| `reference` | Reference (16 kHz) | - | - |
| `input_8k` | 8 kHz input | 3.50 / 0.91 / 4.86 / 2.75 / 3.75 | 3.96 / 0.98 / 5.51 / 2.60 / 3.28 |
| `codec_rt` | Codec round trip | 0.82 / 0.63 / 0.96 / 4.26 / 4.29 | 0.81 / 0.65 / 0.93 / 3.88 / 4.23 |
| `nuwave2` | NU-Wave2 | 1.43 / 0.51 / 1.95 / 2.31 / 3.46 | 1.77 / 0.57 / 2.42 / 2.33 / 3.00 |
| `flowhigh` | FlowHigh | 1.24 / 0.35 / 1.72 / 2.72 / 4.16 | 1.37 / 0.41 / 1.90 / 2.02 / 3.82 |
| `frepainter` | Fre-Painter | 1.32 / 0.35 / 1.84 / 2.59 / 4.16 | 1.35 / 0.36 / 1.88 / 2.15 / 3.62 |
| `apbwe` | AP-BWE | 1.28 / 0.46 / 1.75 / 2.27 / 4.02 | 1.32 / 0.46 / 1.80 / 2.07 / 3.40 |
| `ours` | Ours | 0.99 / 0.56 / 1.28 / 3.23 / 4.41 | 0.98 / 0.58 / 1.25 / 3.02 / 4.04 |

### ablation

| folder | system | fmml0_sx50 (F) LSD / LF / HF / ViSQOL / NISQA | mlll0_si1363 (M) LSD / LF / HF / ViSQOL / NISQA |
|---|---|---|---|
| `rfc_rvq_frozenD` | RFC + RVQ + frozen D | 1.13 / 0.68 / 1.43 / 2.12 / 4.00 | 1.33 / 0.70 / 1.73 / 1.82 / 3.47 |
| `rfc_rvq_adaptedD` | RFC + RVQ + adapted D | 1.00 / 0.64 / 1.26 / 3.00 / 4.44 | 1.01 / 0.67 / 1.25 / 2.65 / 3.97 |
| `flc_adaptedD` | FLC + adapted D | 1.01 / 0.59 / 1.30 / 3.36 / 4.40 | 0.98 / 0.62 / 1.23 / 2.85 / 4.11 |
| `rfc_adaptedD_ours` | RFC + adapted D (ours) | 0.99 / 0.56 / 1.28 / 3.23 / 4.41 | 0.98 / 0.58 / 1.25 / 3.02 / 4.04 |

## LibriTTS test-clean, 8->16 kHz (within-corpus, 50 utt.)

- `4970_29095_000018_000002` (F, 5.54 s)
- `7729_102255_000018_000007` (M, 4.9 s)

### baselines

| folder | system | 4970_29095_000018_000002 (F) LSD / LF / HF / ViSQOL / NISQA | 7729_102255_000018_000007 (M) LSD / LF / HF / ViSQOL / NISQA |
|---|---|---|---|
| `reference` | Reference (16 kHz) | - | - |
| `input_8k` | 8 kHz input | 3.74 / 0.90 / 5.21 / 3.33 / 3.31 | 3.22 / 0.89 / 4.46 / 3.53 / 3.82 |
| `codec_rt` | Codec round trip | 0.84 / 0.67 / 0.98 / 4.35 / 3.93 | 0.83 / 0.70 / 0.94 / 4.14 / 4.52 |
| `nuwave2` | NU-Wave2 | 1.52 / 0.73 / 2.00 / 3.15 / 2.83 | 1.55 / 0.82 / 2.02 / 2.94 / 2.98 |
| `flowhigh` | FlowHigh | 1.07 / 0.53 / 1.41 / 2.79 / 3.51 | 0.90 / 0.52 / 1.16 / 2.90 / 4.30 |
| `frepainter` | Fre-Painter | 0.96 / 0.50 / 1.25 / 3.04 / 3.96 | 0.99 / 0.54 / 1.28 / 3.34 / 4.27 |
| `apbwe` | AP-BWE | 1.34 / 0.46 / 1.84 / 2.62 / 3.27 | 1.09 / 0.47 / 1.46 / 3.00 / 4.20 |
| `ours` | Ours | 0.91 / 0.60 / 1.13 / 3.15 / 4.27 | 0.92 / 0.64 / 1.12 / 3.19 / 4.46 |

### ablation

| folder | system | 4970_29095_000018_000002 (F) LSD / LF / HF / ViSQOL / NISQA | 7729_102255_000018_000007 (M) LSD / LF / HF / ViSQOL / NISQA |
|---|---|---|---|
| `rfc_rvq_frozenD` | RFC + RVQ + frozen D | 1.19 / 0.72 / 1.51 / 2.62 / 3.56 | 1.10 / 0.76 / 1.34 / 2.81 / 4.32 |
| `rfc_rvq_adaptedD` | RFC + RVQ + adapted D | 0.93 / 0.67 / 1.12 / 2.77 / 4.21 | 0.96 / 0.72 / 1.15 / 3.09 / 4.53 |
| `flc_adaptedD` | FLC + adapted D | 0.91 / 0.63 / 1.12 / 2.88 / 3.96 | 0.92 / 0.67 / 1.11 / 3.10 / 4.50 |
| `rfc_adaptedD_ours` | RFC + adapted D (ours) | 0.91 / 0.60 / 1.13 / 3.15 / 4.27 | 0.92 / 0.64 / 1.12 / 3.19 / 4.46 |

## VCTK, 8->44.1 kHz (held-out speakers, 50 utt.)

- `p225_287_mic2` (F, 3.7 s)
- `p226_341_mic2` (M, 3.93 s)

### baselines

| folder | system | p225_287_mic2 (F) LSD / LF / HF / ViSQOL / NISQA | p226_341_mic2 (M) LSD / LF / HF / ViSQOL / NISQA |
|---|---|---|---|
| `reference` | Reference (44.1 kHz) | - | - |
| `input_8k` | 8 kHz input | 3.02 / 0.68 / 3.32 / 2.51 / 3.63 | 3.13 / 0.67 / 3.45 / 2.12 / 3.77 |
| `codec_rt` | Codec round trip | 0.86 / 0.68 / 0.89 / 4.01 / 4.43 | 0.85 / 0.64 / 0.89 / 3.88 / 4.32 |
| `nuwave2` | NU-Wave2 | 1.49 / 0.95 / 1.58 / 2.34 / 3.33 | 1.37 / 0.71 / 1.47 / 2.06 / 3.48 |
| `flowhigh` | FlowHigh | 1.57 / 0.90 / 1.69 / 3.16 / 3.59 | 1.40 / 0.67 / 1.51 / 3.25 / 4.13 |
| `frepainter` | Fre-Painter | 1.60 / 0.87 / 1.72 / 2.99 / 3.75 | 1.32 / 0.66 / 1.43 / 3.06 / 4.36 |
| `apbwe` | AP-BWE | 1.03 / 0.24 / 1.14 / 3.01 / 4.43 | 1.02 / 0.21 / 1.13 / 2.95 / 4.71 |
| `ours` | Ours | 0.93 / 0.59 / 0.98 / 3.23 / 4.36 | 0.92 / 0.56 / 0.98 / 3.22 / 4.42 |

### ablation

| folder | system | p225_287_mic2 (F) LSD / LF / HF / ViSQOL / NISQA | p226_341_mic2 (M) LSD / LF / HF / ViSQOL / NISQA |
|---|---|---|---|
| `rfc_rvq_frozenD` | RFC + RVQ + frozen D | 1.08 / 0.74 / 1.14 / 2.95 / 3.85 | 0.99 / 0.68 / 1.04 / 2.96 / 4.07 |
| `rfc_rvq_adaptedD` | RFC + RVQ + adapted D | 0.96 / 0.68 / 1.00 / 3.16 / 4.41 | 0.94 / 0.66 / 0.99 / 3.23 / 4.24 |
| `flc_adaptedD` | FLC + adapted D | 0.94 / 0.61 / 0.99 / 3.24 / 4.34 | 0.92 / 0.59 / 0.98 / 3.20 / 4.42 |
| `rfc_adaptedD_ours` | RFC + adapted D (ours) | 0.93 / 0.59 / 0.98 / 3.23 / 4.36 | 0.92 / 0.56 / 0.98 / 3.22 / 4.42 |
