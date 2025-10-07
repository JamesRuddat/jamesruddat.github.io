import * as uniformData from '/js/data/uniformData.js';
import { allUniformItems } from '/js/data/uniformMapping.js';
import { positions } from '/js/data/uniformPositions.js';

function renderUniform() {
  const selectionsString = sessionStorage.getItem('uniformSelections');
  if (!selectionsString) return;

  const selections = JSON.parse(selectionsString).filter(item => item); // keep all non-null
  console.log('Selections:', selections);

  // --- Overview info ---
  const member = selections.find(item => item.group?.toLowerCase().includes('member'));
  const grade = selections.find(item => item.group?.toLowerCase().includes('grade'));
  const uniform = selections.find(item => item.group && ['usaf uniforms','cadet uniforms','senior uniforms','18+ uniforms'].includes(item.group.toLowerCase()));

  const singleItems = {
    collar: selections.find(item => item.group?.toLowerCase() === 'collar'),
    hat: selections.find(item => item.group?.toLowerCase() === 'hat'),
    boots: selections.find(item => item.group?.toLowerCase() === 'boots'),
    outerwear: selections.find(item => item.group?.toLowerCase().includes('outerwear')),
  };

  // --- Overview / Regulations in one ---
  const overviewText = document.getElementById('overview-text');

  if (overviewText) {
    const regs = selections.filter(i => i.reference?.trim() !== '');

    if (regs.length > 0) {
      overviewText.innerHTML = `
      <table border="1" cellpadding="4" style="border-collapse: collapse; border: 1px solid #ccc;">
        <thead><tr><th>Item</th><th>Reference</th></tr></thead>
        <tbody>
          ${regs.map(r => `
            <tr>
              <td><strong>${r.label}</strong>${r.link ? `<br><a href="${r.link}" target="_blank" rel="noopener noreferrer">View on Vanguard</a>` : ''}</td>
              <td>${r.reference || 'N/A'}</td>
            </tr>`).join('')}
        </tbody>
      </table>
    `;
    } else {
      overviewText.textContent = 'No regulations found';
    }
  }

  // --- Gather all items to render (with images) ---
  const itemsToRender = selections.filter(item => item?.image);

  // Sort by positions if available
  itemsToRender.sort((a, b) => {
    const posA = positions.find(p => p.names.some(n => a.group?.toLowerCase().includes(n.toLowerCase()))) || {};
    const posB = positions.find(p => p.names.some(n => b.group?.toLowerCase().includes(n.toLowerCase()))) || {};
    return (positions.indexOf(posA) || 0) - (positions.indexOf(posB) || 0);
  });

  // Include single items separately if not already in list
  ['collar','hat','boots'].forEach(key => {
    const item = singleItems[key];
    if (item && !itemsToRender.includes(item)) itemsToRender.push(item);
  });

  // --- Generic render function ---
  function renderItems(container, items) {
    if (!container) return;
    container.innerHTML = '';

    const baseWidth = 200;
    const baseHeight = 800;
    const rect = container.getBoundingClientRect();
    const scale = Math.min(rect.width / baseWidth, rect.height / baseHeight);

    items.forEach((item, index) => {
      if (!item?.image) return;

      const img = document.createElement('img');
      img.src = item.image;
      img.alt = item.label || '';
      img.style.position = 'absolute';
      img.style.zIndex = index + 1;

      const pos = positions.find(p => p.names.some(n => item.group?.toLowerCase().includes(n.toLowerCase()))) || {};
      img.style.left = ((pos.x ?? item.x ?? 0) * scale) + 'px';
      img.style.top = ((pos.y ?? item.y ?? 0) * scale) + 'px';
      img.style.width = ((pos.size ?? item.size ?? 30) * scale) + 'px';
      img.style.height = 'auto';

      container.appendChild(img);
    });
  }

  renderItems(document.getElementById('overview-image'), itemsToRender);

  // --- Render multi-item groups in extra divs ---
  const multiGroups = [
    { elementId: 'extra-left', groups: ['collar'] },
    { elementId: 'extra-right', groups: ['hat'] },
    { elementId: 'extra-bottom', groups: ['boots'] },
  ];

  multiGroups.forEach(({ elementId, groups }) => {
    const container = document.getElementById(elementId);
    if (!container) return;
    container.innerHTML = '';

    const item = selections.find(i => groups.some(g => i.group?.toLowerCase() === g.toLowerCase()));
    if (!item) {
      container.textContent = 'Optional ' + groups.join(', ');
    } else {
      const img = document.createElement('img');
      img.src = item.image;
      img.alt = item.label || '';
      img.style.width = '100%';
      img.style.height = 'auto';
      container.appendChild(img);
    }
  });

  // --- Outerwear ---
  const outerImg = document.getElementById('outerwear-image');
  if (outerImg) {
    outerImg.innerHTML = '';
    if (singleItems.outerwear?.image) {
      const img = document.createElement('img');
      img.src = singleItems.outerwear.image;
      img.alt = singleItems.outerwear.label || '';
      img.style.width = '100%';
      img.style.height = 'auto';
      outerImg.appendChild(img);
    } else outerImg.textContent = 'Outerwear Image';
  }

  const outerText = document.getElementById('outerwear-text');
  if (outerText) outerText.textContent = singleItems.outerwear?.label || 'Outerwear description';
}

// --- Initialize ---
document.addEventListener('DOMContentLoaded', renderUniform);
document.getElementById("uniformButton")?.addEventListener('click', () => {
  location.href = "/pages/uniforms/builder.html";
});
