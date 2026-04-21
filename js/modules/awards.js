import { ribbonData } from '/js/libraries/awards/banners.js';

const S = {
  awardName: '',
  recipient: '',
  reason: '',
  date: '',
  unitCommander: '',
  wingCommander: ''
};

function bindInputs() {
  const map = [
    ['award-name', 'awardName'],
    ['awardee', 'recipient'],
    ['award-reason', 'reason'],
    ['dates', 'date']
  ];

  map.forEach(([id, key]) => {
    const el = document.getElementById(id);
    if (!el) return;

    el.addEventListener('input', e => {
      S[key] = e.target.value;
      render();
    });
  });
}

function bindDropdown(id, key) {
  const el = document.getElementById(id);
  if (!el) return;

  el.addEventListener('change', e => {
    S[key] = e.target.value;
    render();
  });
}

function fillDropdowns() {
  const unit = document.getElementById('unit-commander');
  const wing = document.getElementById('wing-commander');

  const unitOpts = [
    "School Director",
    "Flight Commander",
    "Squadron Commander",
    "Group Commander"
  ];

  const wingOpts = [
    "Squadron Commander",
    "Group Commander",
    "Wing Commander",
    "Region Commander",
    "National Commander",
  ];

  unit.innerHTML = unitOpts.map(o => `<option>${o}</option>`).join('');
  wing.innerHTML = wingOpts.map(o => `<option>${o}</option>`).join('');
}

function render() {
  const svg = document.querySelector('.certificate svg');

  setText('svg-award-name', S.awardName || 'The Meritorious Service Award');
  setText('svg-recipient', S.recipient || 'Maj. Joe Smith, CAP');
  setText('svg-reason', S.reason || 'For outstanding duty in his field');
  setText('svg-date', S.date || '1/1/2026 TO 3/1/2027');
  setText('svg-unit', S.unitCommander || 'Flight Commander');
  setText('svg-wing', S.wingCommander || 'Wing Commander');
}

function setText(id, val) {
  const el = document.getElementById(id);
  if (el) el.textContent = val || '';
}

function init() {
  bindInputs();
  fillDropdowns();

  bindDropdown('unit-commander', 'unitCommander');
  bindDropdown('wing-commander', 'wingCommander');
  
  bindRibbonSelect();
  renderRibbon(ribbonData.backdrop);

  render();
}

init();



function bindRibbonSelect() {
  const select = document.getElementById('ribbon-select');
  if (!select) return;

  select.addEventListener('change', e => {
    renderRibbon(e.target.value);
  });
}

function renderRibbon(stripeKey) {
  const ribbon = document.getElementById('ribbon');
  if (!ribbon) return;

  ribbon.innerHTML = '';

  const rootGroup = createSvgEl('g');
  rootGroup.setAttribute("transform", "translate(230,180) scale(20)");

  const backdropLayer = createSvgEl('g');
  const stripeLayer = createSvgEl('g');
  const borderLayer = createSvgEl('g');

  // ONLY HERE we use x/y from JSON
  backdropLayer.setAttribute(
    "transform",
    `translate(${ribbonData.backdrop.x || 0}, ${ribbonData.backdrop.y || 0})`
  );

  stripeLayer.setAttribute(
    "transform",
    `translate(${ribbonData[stripeKey]?.x || 0}, ${ribbonData[stripeKey]?.y || 0})`
  );

  borderLayer.setAttribute(
    "transform",
    `translate(${ribbonData.border.x || 0}, ${ribbonData.border.y || 0})`
  );

  renderElements(ribbonData.backdrop.elements, backdropLayer);

  const stripe = ribbonData[stripeKey];
  if (stripe) {
    renderElements(stripe.elements, stripeLayer);
  }

  renderElements(ribbonData.border.elements, borderLayer);

  rootGroup.appendChild(backdropLayer);
  rootGroup.appendChild(stripeLayer);
  rootGroup.appendChild(borderLayer);

  ribbon.appendChild(rootGroup);
}

function createSvgEl(type) {
  return document.createElementNS('http://www.w3.org/2000/svg', type);
}

function renderElements(elements, container) {
  elements.forEach(el => {
    container.appendChild(buildElement(el));
  });
}

function buildElement(def) {
  const el = createSvgEl(def.type);

  // only apply explicit transform if provided
  if (def.transform) {
    el.setAttribute('transform', def.transform);
  }

  if (def.style) {
    Object.entries(def.style).forEach(([k, v]) => {
      el.style[k] = v;
    });
  }

  if (def.d) {
    el.setAttribute('d', def.d);
  }

  if (def.children) {
    def.children.forEach(child => {
      el.appendChild(buildElement(child));
    });
  }

  return el;
}