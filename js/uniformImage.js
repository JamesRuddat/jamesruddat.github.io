import * as uniformData from '/js/data/uniformData.js';
import { positions } from '/js/data/positions.js';

function renderUniform() {
  const selectionsString = sessionStorage.getItem('uniformSelections');
  if (!selectionsString) return;

  const selections = JSON.parse(selectionsString);

  // --- Overview info ---
  const grade = selections.find(i => i.group?.toLowerCase().includes('grade'));
  const uniform = selections.find(i => ['USAF Uniforms', 'Cadet Uniforms', 'Senior Uniforms', '18+ Uniforms'].includes(i.group));
  const member = selections.find(i => i.group?.toLowerCase().includes('member'));
  const gender = selections.find(i => i.group === 'Gender')?.value.toLowerCase() || 'male';

  document.getElementById('overview-text').innerHTML = `
    <strong>Grade:</strong> ${grade?.label || 'No Grade Selected'}<br>
    <strong>Uniform:</strong> ${uniform?.label || 'No Uniform Selected'}
  `;

  // --- Extra uniform items (Class A/B) ---
  let extraItems = [];
  if (uniform?.value.toLowerCase() === 'classa') extraItems = uniformData.serviceDressUniform || [];
  else if (uniform?.value.toLowerCase() === 'classb') extraItems = uniformData.blueServiceUniform || [];

  // Gender filter
  extraItems = extraItems.filter(u => {
    if (!u.group) return true;
    const g = u.group.toLowerCase();
    return g.startsWith('male') && gender === 'male' ||
      g.startsWith('female') && gender === 'female' ||
      g.includes('unisex');
  });

  // Nameplate
  let nameplate = null;
  if (member?.value === 'Cadet') nameplate = uniformData.nameplates.find(n => n.value === 'cap_nameplate_cadet');
  else if (member?.value === 'Senior') {
    if (uniform?.value.toLowerCase() === 'classa') nameplate = uniformData.nameplates.find(n => n.value === 'brush_silver_nameplate');
    else if (uniform?.value.toLowerCase() === 'classb') nameplate = uniformData.nameplates.find(n => n.value === 'cap_nameplate_adult');
    else nameplate = uniformData.nameplates.find(n => n.uniformCategory?.toLowerCase().includes('senior'));
  }

  const itemsToRender = [...extraItems];
  if (nameplate) itemsToRender.push(nameplate);

  // Add hat & collar if selected
  const selectedCollar = uniformData.collars.find(c => selections.some(s => s.group === 'Collar' && s.value === c.value));
  const selectedHat = uniformData.hats.find(h => selections.some(s => s.group === 'Hat' && s.value === h.value));
  if (selectedCollar) itemsToRender.push(selectedCollar);
  if (selectedHat) itemsToRender.push(selectedHat);

  // --- Dynamic rendering function ---
  function renderItems(container, items) {
    container.innerHTML = '';

    const baseWidth = 300;  // base design width for body.svg
    const baseHeight = 800; // base design height for body.svg

    const rect = container.getBoundingClientRect();
    const scaleX = rect.width / baseWidth;
    const scaleY = rect.height / baseHeight;
    const scale = Math.min(scaleX, scaleY);

    // Render each item
    items.forEach((item, index) => {
      const img = document.createElement('img');
      img.src = item.image || '/js/data/beret8.gif';
      img.alt = item.label || '';
      img.style.position = 'absolute';

      const pos = positions.find(p => p.names.some(n => item.group?.toLowerCase().includes(n.toLowerCase()))) || {};

      img.style.left = ((pos.x ?? item.x ?? 0) * scale) + 'px';
      img.style.top = ((pos.y ?? item.y ?? 0) * scale) + 'px';
      img.style.width = ((pos.size ?? item.size ?? 30) * scale) + 'px';
      img.style.height = 'auto';
      img.style.zIndex = index + 1;

      container.appendChild(img);
    });
  }

  // --- Render overview (smaller) ---
  const overviewImg = document.getElementById('overview-image');
  renderItems(overviewImg, itemsToRender);

  // --- Render main uniform (zoomed) ---
  const uniformMain = document.getElementById('uniform-main');
  uniformMain.style.overflow = 'hidden';
  renderItems(uniformMain, itemsToRender);

  // --- Regulations ---
  const regs = selections.filter(i => i.reference?.trim() !== '');
  const midpoint = Math.ceil(regs.length / 2);
  document.getElementById('reg-left').innerHTML = regs.slice(0, midpoint).map(r => `<div><strong>${r.label}:</strong> ${r.reference}</div>`).join('');
  document.getElementById('reg-right').innerHTML = regs.slice(midpoint).map(r => `<div><strong>${r.label}:</strong> ${r.reference}</div>`).join('');

  // --- Extra divs (collar + hat) ---
  const extraLeft = document.getElementById('extra-left');
  extraLeft.innerHTML = '';
  if (selectedCollar) {
    const img = document.createElement('img');
    img.src = selectedCollar.image;
    img.alt = selectedCollar.label;
    img.style.width = '100%';
    img.style.height = 'auto';
    extraLeft.appendChild(img);
  } else extraLeft.textContent = 'Optional Collar';

  const extraRight = document.getElementById('extra-right');
  extraRight.innerHTML = '';
  if (selectedHat) {
    const img = document.createElement('img');
    img.src = selectedHat.image;
    img.alt = selectedHat.label;
    img.style.width = '100%';
    img.style.height = 'auto';
    extraRight.appendChild(img);
  } else extraRight.textContent = 'Optional Hat';

  document.getElementById('extra-text').innerHTML = 'Optional text';

  // --- Outerwear ---
  const outerImg = document.getElementById('outerwear-image');
  outerImg.innerHTML = '';
  const outerwear = extraItems.find(i => i.group?.toLowerCase().includes('outerwear'));
  if (outerwear) {
    const img = document.createElement('img');
    img.src = outerwear.image;
    img.alt = outerwear.label;
    img.style.width = '100%';
    img.style.height = 'auto';
    outerImg.appendChild(img);
  } else outerImg.textContent = 'Outerwear Image';
  document.getElementById('outerwear-text').textContent = 'Outerwear description';
}

// --- Initialize ---
document.addEventListener('DOMContentLoaded', renderUniform);
document.getElementById("uniformButton").onclick = () => location.href = "/../index.html";