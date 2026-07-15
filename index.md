---
layout: default
title: CodecFlow
---

<header class="hero">
  <span class="eyebrow">Neural speech bandwidth extension</span>
  <h1>Codec<span>Flow</span></h1>
  <p class="dek">Efficient Bandwidth Extension via Conditional Flow Matching in Neural Codec Latent Space</p>
  <ul class="authors" aria-label="Authors">
    <li>Bowen Zhang</li>
    <li>Junchuan Zhao</li>
    <li>Ian McLoughlin</li>
    <li>Ye Wang</li>
    <li>A S Madhukumar</li>
  </ul>
  <p class="affiliation">Research demo · Speech &amp; Audio Intelligence</p>
</header>

<section class="content-section" id="overview">
  <div class="section-intro stacked">
    <div><span class="section-kicker">Overview</span><h2>Abstract</h2></div>
    <p>Speech Bandwidth Extension improves clarity and intelligibility by restoring/inferring appropriate high-frequency content for low-bandwidth speech. Existing methods often rely on spectrogram or waveform modeling, which can incur higher computational cost and have limited high-frequency fidelity. Neural audio codecs offer compact latent representations that better preserve acoustic detail, yet accurately recovering high-resolution latent information remains challenging due to representation mismatch. We present CodecFlow, a neural codec-based BWE framework that performs efficient speech reconstruction in a compact latent space. CodecFlow employs a voicing-aware conditional flow converter on continuous codec embeddings and a structure-constrained residual vector quantizer to improve latent alignment stability. Optimized end-to-end, CodecFlow achieves strong spectral fidelity and enhanced perceptual quality on 8 kHz to 16 kHz and 44.1 kHz speech BWE tasks.</p>
  </div>
</section>

<section class="content-section" id="method">
  <div class="section-intro">
    <div><span class="section-kicker">Architecture</span><h2>Method</h2></div>
  </div>
  <figure class="figure-card">
    <img src="figures/vuv.png" alt="Voiced and unvoiced segmentation with embedding similarity">
    <figcaption><strong>V/UV segmentation and LR–HR embedding cosine similarity over time.</strong> Orange regions mark unvoiced-aligned drops; the blue line shows the global mean.</figcaption>
  </figure>
  <figure class="figure-card">
    <img src="figures/overall.png" alt="Overview of the CodecFlow framework">
    <figcaption><strong>CodecFlow framework.</strong> Overall pipeline, voicing extractor, and flow prediction network within the flow embedding converter.</figcaption>
  </figure>
</section>

<section class="content-section" id="results">
  <div class="section-intro stacked">
    <div><span class="section-kicker">Results</span><h2>Visible high-frequency recovery.</h2></div>
    <p>Spectrograms show the restored frequency structure across both target bandwidths, alongside representative baselines.</p>
  </div>
  <div class="result-grid">
    <figure class="figure-card"><img src="figures/16.png" alt="8 to 16 kHz spectrogram results"><figcaption><strong>8→16 kHz.</strong> Input, ground truth, baseline systems, and CodecFlow.</figcaption></figure>
    <figure class="figure-card"><img src="figures/44.png" alt="8 to 44.1 kHz spectrogram results"><figcaption><strong>8→44.1 kHz.</strong> Input, ground truth, baseline systems, and CodecFlow.</figcaption></figure>
  </div>
</section>

<section class="content-section" id="baseline">
  <div class="section-intro stacked">
    <div><span class="section-kicker">Listening test 01</span><h2>Baseline comparison.</h2></div>
    <p>CodecFlow is highlighted in violet and placed last for a natural baseline-to-proposed reading order. Every system remains visible in the responsive grid.</p>
  </div>

  {% include comparison.html sample="Sample 01" title="8→16 kHz · —Scroll Left and Right for 8→16kHz comparisons—" base="16k" methods="Target|Input|Nu-Wave2|AP-BWE|Fre-Painter|FlowHigh|CodecFlow" folders="gt|input|nuwave2|APBWE|FrePainter|flowhigh|CodecFlow" audio_files="fsem0_si1828.wav|fsem0_si1828_8k.wav|fsem0_si1828_nuwave2.wav|fsem0_si1828_8k.wav|fsem0_si1828_8k.wav|fsem0_si1828_8k.wav|fsem0_si1828.wav" image_files="fsem0_si1828.png|fsem0_si1828_8k.png|fsem0_si1828_nuwave2.png|fsem0_si1828_8k.png|fsem0_si1828_8k.png|fsem0_si1828_8k.png|fsem0_si1828.png" %}
  {% include comparison.html sample="Sample 02" title="8→16 kHz · —Scroll Left and Right for 8→16kHz comparisons—" base="16k" methods="Target|Input|Nu-Wave2|AP-BWE|Fre-Painter|FlowHigh|CodecFlow" folders="gt|input|nuwave2|APBWE|FrePainter|flowhigh|CodecFlow" audio_files="mbdg0_si1463.wav|mbdg0_si1463_8k.wav|mbdg0_si1463_nuwave2.wav|mbdg0_si1463_8k.wav|mbdg0_si1463_8k.wav|mbdg0_si1463_8k.wav|mbdg0_si1463.wav" image_files="mbdg0_si1463.png|mbdg0_si1463_8k.png|mbdg0_si1463_nuwave2.png|mbdg0_si1463_8k.png|mbdg0_si1463_8k.png|mbdg0_si1463_8k.png|mbdg0_si1463.png" %}
  {% include comparison.html sample="Sample 01" title="8→44.1 kHz · —Scroll Left and Right for 8→44.1kHz comparisons—" base="44.1k" methods="Target|Input|Nu-Wave2|AP-BWE|Fre-Painter|FlowHigh|CodecFlow" folders="gt|input|nuwave2|APBWE|FrePainter|flowhigh|CodecFlow" audio_files="p225_298_mic1.wav|p225_298_mic1.wav|p225_298_mic1.wav|p225_298_mic1.wav|p225_298_mic1.wav|p225_298_mic1.wav|p225_298_mic1.wav" image_files="p225_298_mic1.png|p225_298_mic1.png|p225_298_mic1.png|p225_298_mic1.png|p225_298_mic1.png|p225_298_mic1.png|p225_298_mic1.png" %}
  {% include comparison.html sample="Sample 02" title="8→44.1 kHz · —Scroll Left and Right for 8→44.1kHz comparisons—" base="44.1k" methods="Target|Input|Nu-Wave2|AP-BWE|Fre-Painter|FlowHigh|CodecFlow" folders="gt|input|nuwave2|APBWE|FrePainter|flowhigh|CodecFlow" audio_files="p226_027_mic2.wav|p226_027_mic2.wav|p226_027_mic2.wav|p226_027_mic2.wav|p226_027_mic2.wav|p226_027_mic2.wav|p226_027_mic2.wav" image_files="p226_027_mic2.png|p226_027_mic2.png|p226_027_mic2.png|p226_027_mic2.png|p226_027_mic2.png|p226_027_mic2.png|p226_027_mic2.png" %}
</section>

<section class="content-section" id="ablation">
  <div class="section-intro stacked">
    <div><span class="section-kicker">Listening test 02</span><h2>Ablation study.</h2></div>
    <p>Compare the complete CodecFlow system against variants that remove or alter individual modeling choices.</p>
  </div>

  {% include comparison.html sample="Sample 01" title="8→16 kHz · —Scroll Left and Right for 8→16kHz comparisons—" base="ablation/16k" methods="Target|Input|CodecReg|CFM-Conf|CFM-UConf|CodecFlow" folders="gt|input|CodecReg|CFM-Conf|CFM-Uconf|CodecFlow" audio_files="fsem0_si1828.wav|fsem0_si1828_8k.wav|fnmr0_si769_8k.wav|fsem0_si1828_8k.wav|fsem0_si1828_8k.wav|fsem0_si1828.wav" image_files="fsem0_si1828.png|fsem0_si1828_8k.png|fnmr0_si769_8k.png|fsem0_si1828_8k.png|fsem0_si1828_8k.png|fsem0_si1828.png" %}
  {% include comparison.html sample="Sample 02" title="8→16 kHz · —Scroll Left and Right for 8→16kHz comparisons—" base="ablation/16k" methods="Target|Input|CodecReg|CFM-Conf|CFM-UConf|CodecFlow" folders="gt|input|CodecReg|CFM-Conf|CFM-Uconf|CodecFlow" audio_files="mbdg0_si1463.wav|mbdg0_si1463_8k.wav|mbdg0_si1463_8k.wav|mbdg0_si1463_8k.wav|mbdg0_si1463_8k.wav|mbdg0_si1463.wav" image_files="mbdg0_si1463.png|mbdg0_si1463_8k.png|mbdg0_si1463_8k.png|mbdg0_si1463_8k.png|mbdg0_si1463_8k.png|mbdg0_si1463.png" %}
  {% include comparison.html sample="Sample 01" title="8→44.1 kHz · —Scroll Left and Right for 8→44.1kHz comparisons—" base="ablation/44.1k" methods="Target|Input|CodecReg|CFM-Conf|CFM-UConf|CodecFlow" folders="gt|input|CodecReg|CFM-Conf|CFM-Uconf|CodecFlow" audio_files="p225_298_mic1.wav|p225_298_mic1.wav|p225_298_mic1.wav|p225_298_mic1.wav|p225_298_mic1.wav|p225_298_mic1.wav" image_files="p225_298_mic1.png|p225_298_mic1.png|p225_298_mic1.png|p225_298_mic1.png|p225_298_mic1.png|p225_298_mic1.png" %}
  {% include comparison.html sample="Sample 02" title="8→44.1 kHz · —Scroll Left and Right for 8→44.1kHz comparisons—" base="ablation/44.1k" methods="Target|Input|CodecReg|CFM-Conf|CFM-UConf|CodecFlow" folders="gt|input|CodecReg|CFM-Conf|CFM-Uconf|CodecFlow" audio_files="p226_027_mic2.wav|p226_027_mic2.wav|p226_027_mic2.wav|p226_027_mic2.wav|p226_027_mic2.wav|p226_027_mic2.wav" image_files="p226_027_mic2.png|p226_027_mic2.png|p226_027_mic2.png|p226_027_mic2.png|p226_027_mic2.png|p226_027_mic2.png" %}
</section>

<p class="footer-note">CodecFlow · Interactive research demo for speech bandwidth extension.</p>
