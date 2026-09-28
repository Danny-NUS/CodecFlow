'use strict';

const datasets = {
  timit: {name: 'TIMIT', context: 'Cross-corpus', rate: '8 → 16 kHz'},
  libritts: {name: 'LibriTTS test-clean', context: 'Within-corpus', rate: '8 → 16 kHz'},
  vctk: {name: 'VCTK', context: 'Held-out speakers', rate: '8 → 44.1 kHz'}
};
const order = {
  baselines: ['reference', 'input_8k', 'codec_rt', 'nuwave2', 'flowhigh', 'frepainter', 'apbwe', 'ours'],
  ablation: ['rfc_rvq_frozenD', 'rfc_rvq_adaptedD', 'flc_adaptedD', 'rfc_adaptedD_ours']
};
function element(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}
function buildDataset(key, data, section) {
  const meta = datasets[key];
  const block = element('div', 'dataset');
  const header = element('div', 'dataset-header');
  const heading = element('h3', '', meta.name);
  const details = element('div');
  details.append(heading, element('span', 'dataset-context', meta.context));
  header.append(details, element('span', 'rate-badge', meta.rate));
  const melToolbar = element('div', 'mel-toolbar');
  const toggleAll = element('button', 'mel-toggle-all', 'Hide all mel spectrograms');
  toggleAll.type = 'button';
  toggleAll.setAttribute('aria-label', `Hide all mel spectrograms: ${meta.name}, ${section}`);
  melToolbar.append(toggleAll);
  const utteranceGroups = element('div', 'utterance-groups');
  const utterances = Object.entries(data.utterances);
  for (const [id, sample] of utterances) {
    const group = element('article', 'utterance-group');
    const sampleHeader = element('div', 'utterance-header');
    const sampleTitle = element('h4', '', `${sample.gender === 'F' ? 'Female' : 'Male'} sample`);
    sampleHeader.append(sampleTitle, element('span', 'utterance-meta', `${id} · ${sample.duration_s} s`));
    const systemGrid = element('div', `system-grid ${section === 'baselines' ? 'baseline-grid' : 'ablation-grid'}`);
    systemGrid.setAttribute('aria-label', `${meta.name}, ${id}, ${section === 'baselines' ? 'baseline comparison' : 'ablation study'}`);
    for (const method of order[section]) {
      const system = data.sections[section][method];
      const proposed = method === 'ours' || method === 'rfc_adaptedD_ours';
      const card = element('article', `system-card ${proposed ? 'proposed' : ['reference', 'input_8k', 'codec_rt'].includes(method) ? 'reference' : ''}`);
      const label = method === 'ours' ? 'CodecFlow' : system.label.replace(' (ours)', '');
      const cardHeader = element('div', 'system-card-header');
      cardHeader.append(element('span', 'system-name', label));
      if (proposed) cardHeader.append(element('span', 'proposed-tag', section === 'baselines' ? 'Proposed' : 'CodecFlow'));
      card.append(cardHeader);
      const audio = element('audio');
      audio.controls = true;
      audio.preload = 'metadata';
      audio.src = `samples/${system.files[id].path}`;
      audio.setAttribute('aria-label', `${meta.name}, ${label}, ${sample.gender === 'F' ? 'female' : 'male'} sample ${id}`);
      audio.append(element('a', '', 'Download audio'));
      audio.firstChild.href = audio.src;
      audio.addEventListener('play', () => {
        document.querySelectorAll('audio').forEach(other => { if (other !== audio) other.pause(); });
        card.classList.add('playing');
      });
      for (const event of ['pause', 'ended']) audio.addEventListener(event, () => card.classList.remove('playing'));
      card.append(audio);
      const melDetails = element('details', 'sample-mel');
      melDetails.open = true;
      const summary = element('summary', '', 'Hide mel spectrogram');
      const figure = element('figure');
      const link = element('a', 'zoomable');
      link.href = `samples/mel/${system.files[id].path.replace(/\.wav$/i, '.png')}`;
      link.setAttribute('aria-label', `Enlarge mel spectrogram: ${meta.name}, ${label}, ${id}`);
      const img = element('img');
      img.src = link.href;
      img.loading = 'lazy';
      img.decoding = 'async';
      img.width = 900;
      img.height = 420;
      img.alt = `Full-length mel spectrogram: ${meta.name}, ${label}, ${id}`;
      link.append(img, element('span', 'zoom-label', 'View full size ↗'));
      figure.append(link);
      melDetails.append(summary, figure);
      melDetails.addEventListener('toggle', () => {
        summary.textContent = melDetails.open ? 'Hide mel spectrogram' : 'Show mel spectrogram';
        const allOpen = [...block.querySelectorAll('.sample-mel')].every(item => item.open);
        toggleAll.textContent = allOpen ? 'Hide all mel spectrograms' : 'Show all mel spectrograms';
        toggleAll.setAttribute('aria-label', `${allOpen ? 'Hide' : 'Show'} all mel spectrograms: ${meta.name}, ${section}`);
      });
      card.append(melDetails);
      systemGrid.append(card);
    }
    group.append(sampleHeader, systemGrid);
    utteranceGroups.append(group);
  }
  toggleAll.addEventListener('click', () => {
    const panels = [...block.querySelectorAll('.sample-mel')];
    const expand = !panels.every(panel => panel.open);
    panels.forEach(panel => { panel.open = expand; });
  });
  block.append(header, melToolbar, utteranceGroups);
  return block;
}

fetch('samples/manifest.json').then(response => {
  if (!response.ok) throw new Error('Cannot load sample manifest');
  return response.json();
}).then(manifest => {
  for (const [section, target] of [['baselines', 'baseline-audio'], ['ablation', 'ablation-audio']]) {
    document.getElementById(target).replaceChildren(...Object.keys(datasets).map(key => buildDataset(key, manifest.sets[key], section)));
  }
}).catch(error => {
  for (const id of ['baseline-audio', 'ablation-audio']) {
    document.getElementById(id).replaceChildren(element('p', 'loading', 'Audio samples could not be loaded. Please refresh this page or serve the site over HTTP.'));
  }
  console.error(error);
});

const dialog = document.querySelector('.figure-dialog');
const closeDialog = () => dialog.close();
document.addEventListener('click', event => {
  const link = event.target.closest('.zoomable');
  if (!link) return;
  if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || typeof dialog.showModal !== 'function') return;
  event.preventDefault();
  dialog.querySelector('img').src = link.href;
  dialog.querySelector('img').alt = link.querySelector('img').alt;
  dialog.querySelector('.original-link').href = link.href;
  dialog.showModal();
  document.body.classList.add('dialog-open');
});
dialog.querySelector('button').addEventListener('click', closeDialog);
dialog.addEventListener('close', () => document.body.classList.remove('dialog-open'));
dialog.addEventListener('click', event => { if (event.target === dialog) closeDialog(); });

if ('IntersectionObserver' in window) {
  const navLinks = [...document.querySelectorAll('.section-nav a')];
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) if (entry.isIntersecting) {
      navLinks.forEach(link => {
        const active = link.hash === `#${entry.target.id}`;
        link.classList.toggle('active', active);
        if (active) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    }
  }, {rootMargin: '-10% 0px -65% 0px'});
  document.querySelectorAll('main>section').forEach(section => observer.observe(section));
}
