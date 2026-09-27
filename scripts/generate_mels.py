"""Generate full-length mel previews for the WAVs in samples/manifest.json.

Dependencies: numpy, matplotlib. Run from any directory with Python 3.10+.
All systems for an utterance share its reference-derived dB scale.
"""
from pathlib import Path
import json
import wave

import numpy as np
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt

ROOT = Path(__file__).resolve().parents[1]
N_MELS = 128
DB_MIN = -80


def hz_to_mel(hz):
    return 2595 * np.log10(1 + np.asarray(hz) / 700)


def mel_to_hz(mel):
    return 700 * (10 ** (np.asarray(mel) / 2595) - 1)


def mel_power(path):
    with wave.open(str(path)) as wav:
        assert wav.getnchannels() == 1 and wav.getsampwidth() == 2, path
        sr = wav.getframerate()
        signal = np.frombuffer(wav.readframes(wav.getnframes()), dtype='<i2').astype(float) / 32768
    win_length = round(.032 * sr)
    hop = round(.008 * sr)
    n_fft = 2 ** int(np.ceil(np.log2(win_length)))
    window = np.hanning(win_length + 1)[:-1]
    padded = np.pad(signal, (win_length // 2, win_length // 2), mode='reflect')
    frames = np.lib.stride_tricks.sliding_window_view(padded, win_length)[::hop]
    spectrum = np.abs(np.fft.rfft(frames * window, n=n_fft)) ** 2 / window.sum() ** 2
    frequencies = np.fft.rfftfreq(n_fft, 1 / sr)
    edges = mel_to_hz(np.linspace(0, hz_to_mel(sr / 2), N_MELS + 2))
    left = (frequencies[None, :] - edges[:-2, None]) / (edges[1:-1] - edges[:-2])[:, None]
    right = (edges[2:, None] - frequencies[None, :]) / (edges[2:] - edges[1:-1])[:, None]
    filters = np.maximum(0, np.minimum(left, right))
    filters /= np.maximum(filters.sum(axis=1, keepdims=True), 1e-12)
    return filters @ spectrum.T, sr, len(signal) / sr


def draw(power, sr, duration, ref_peak, output):
    db = 10 * np.log10(np.maximum(power, 1e-12) / max(ref_peak, 1e-12))
    fig, ax = plt.subplots(figsize=(6, 2.8), dpi=150, layout='constrained')
    image = ax.imshow(db, origin='lower', aspect='auto', interpolation='nearest',
                      extent=(0, duration, 0, hz_to_mel(sr / 2)),
                      cmap='magma', vmin=DB_MIN, vmax=0)
    ticks = [0, 1000, 2000, 4000, 8000] if sr == 16000 else [0, 1000, 4000, 8000, 16000, 22050]
    ax.set_yticks(hz_to_mel(ticks), [f'{f / 1000:g}' for f in ticks])
    ax.set_xlabel('Time (s)', fontsize=9)
    ax.set_ylabel('Frequency (kHz)', fontsize=9)
    ax.axhline(hz_to_mel(4000), color='white', alpha=.7, linewidth=.7, linestyle='--')
    ax.tick_params(labelsize=8, length=2)
    for spine in ax.spines.values():
        spine.set_linewidth(.5)
        spine.set_color('#c5c7d2')
    colorbar = fig.colorbar(image, ax=ax, pad=.025, fraction=.035, ticks=[-80, -40, 0])
    colorbar.set_label('dB / reference peak', fontsize=8)
    colorbar.ax.tick_params(labelsize=7, length=2)
    colorbar.outline.set_visible(False)
    output.parent.mkdir(parents=True, exist_ok=True)
    fig.savefig(output, facecolor='white')
    plt.close(fig)


def main():
    manifest = json.loads((ROOT / 'samples/manifest.json').read_text())
    count = 0
    for name, dataset in manifest['sets'].items():
        for utterance in dataset['utterances']:
            ref = dataset['sections']['baselines']['reference']['files'][utterance]['path']
            reference, _, _ = mel_power(ROOT / 'samples' / ref)
            peak = reference.max()
            for section in dataset['sections'].values():
                for system in section.values():
                    path = Path(system['files'][utterance]['path'])
                    power, sr, duration = mel_power(ROOT / 'samples' / path)
                    assert sr == dataset['sr']
                    draw(power, sr, duration, peak, ROOT / 'samples/mel' / path.with_suffix('.png'))
                    count += 1
        print(f'{name}: complete', flush=True)
    print(f'Generated {count} full-length mel spectrograms.', flush=True)


if __name__ == '__main__':
    main()
