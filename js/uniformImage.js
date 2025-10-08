import * as uniformData from '/js/data/uniformData.js';
import { allUniformItems } from '/js/data/uniformMapping.js';
import { positions } from '/js/data/uniformPositions.js';

function renderUniform() {
  const selectionsString = sessionStorage.getItem('uniformSelections');
  if (!selectionsString) return;
  console.log('selectionsString:', selectionsString);

  const selections = JSON.parse(selectionsString).filter(item => item); // keep all non-null
  console.log('Selections:', selections);

  // --- Overview info ---
  const member = selections.find(item => item.group?.toLowerCase().includes('member'));
  const grade = selections.find(item => item.group?.toLowerCase().includes('grades'));
  const uniform = selections.find(item =>
    item.group && ['usaf uniforms', 'cadet uniforms', 'senior uniforms', '18+ uniforms'].includes(item.group.toLowerCase())
  );
  const gradeItem = selections.find(item => item?.group?.toLowerCase().includes('grades'));

  if (gradeItem) {
    // Positions to show the grade
    const gradePositions = ['collar-grade', 'hat-grade', 'shirt-grade-left', 'shirt-grade-right'];

    gradePositions.forEach(posName => {
      const pos = positions.find(p => p.names.includes(posName));
      if (!pos) return;

      const img = document.createElement('img');
      img.src = gradeItem.image; // same grade image
      img.alt = gradeItem.label || 'Grade';
      img.style.position = 'absolute';
      img.style.left = (pos.x ?? 0) + 'px';
      img.style.top = (pos.y ?? 0) + 'px';
      img.style.width = (pos.size ?? 30) + 'px';
      img.style.height = 'auto';
      img.style.zIndex = 100;

      document.getElementById('overview-image')?.appendChild(img);
    });
  }

  const singleItems = {
    collar: selections.find(item => item.group?.toLowerCase() === 'collar'),
    hat: selections.find(item => item.group?.toLowerCase() === 'hat'),
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
    } else { overviewText.textContent = 'No regulations found'; }
  }

  // --- Gather all items to render (with images) ---
  const itemsToRender = selections.filter(item => item?.image);

  itemsToRender.sort((a, b) => {
    const posA = positions.find(p => p.names.some(n => a.group?.toLowerCase().includes(n.toLowerCase()))) || {};
    const posB = positions.find(p => p.names.some(n => b.group?.toLowerCase().includes(n.toLowerCase()))) || {};
    return (positions.indexOf(posA) || 0) - (positions.indexOf(posB) || 0);
  });

  // Include single items separately if not already in list
  ['collar', 'hat'].forEach(key => {
    const item = singleItems[key];
    if (item && !itemsToRender.includes(item)) itemsToRender.push(item);
  });

  function getItemsForPosition(position, selections) {
    const posKey = position.names[0];

    const specialPositions = {
      'cap-nameplate': ['CAP plates'],
      'shirt-grade-left': ['Grades'],
      'shirt-grade-right': ['Grades'],
      // add others here
    };

    return selections.filter(item => {
      if (!item.group) return false;

      const mappedPos = Object.entries(specialPositions).find(([posName, groups]) =>
        groups.includes(item.group)
      );

      if (mappedPos) {
        // Only render if current position matches the mapped position
        return mappedPos[0] === posKey;
      }

      return position.names.some(n => item.group.toLowerCase().includes(n.toLowerCase()));
    });
  }

  // --- Generic render function ---
  function renderItems(container, selections) {
    if (!container) return;
    container.innerHTML = '';

    const baseWidth = 200;
    const baseHeight = 665;
    const rect = container.getBoundingClientRect();
    const scale = Math.min(rect.width / baseWidth, rect.height / baseHeight);

    positions.forEach((pos, posIndex) => {
      const itemsAtPos = getItemsForPosition(pos, selections);
      if (itemsAtPos.length === 0) return;

      itemsAtPos.forEach((item, itemIndex) => {
        const img = document.createElement('img');
        img.src = item.image;
        img.alt = item.label || '';
        img.style.position = 'absolute';
        img.style.zIndex = posIndex + 1 + itemIndex;

        img.style.left = ((pos.x ?? item.x ?? 0) * scale) + 'px';
        img.style.top = ((pos.y ?? item.y ?? 0) * scale) + 'px';
        img.style.width = ((pos.size ?? item.size ?? 30) * scale) + 'px';
        img.style.height = 'auto';

        const rotation = pos?.rotation ?? item.rotation ?? 0;
        img.style.transformOrigin = 'center center';
        img.style.transform = `rotate(${rotation}deg)`;

        container.appendChild(img);
      });
    });
  }

  renderItems(document.getElementById('overview-image'), itemsToRender);

  // --- Map group names to positions ---
  const multiGroups = [
    { elementId: 'extra-left', groups: ['collar', 'grades'], positions: ['collar-grade', 'shirt-grade-left'] },
    { elementId: 'extra-right', groups: ['hat', 'grades'], positions: ['hat-grade', 'shirt-grade-right'] },
  ];

  multiGroups.forEach(({ elementId, groups, positions: posNamesForContainer }) => {
    const container = document.getElementById(elementId);
    if (!container) return;
    container.innerHTML = '';

    const rect = container.getBoundingClientRect();
    const baseWidth = 200;
    const baseHeight = 200;
    const scale = Math.min(rect.width / baseWidth, rect.height / baseHeight);

    const items = selections.filter(i =>
      groups.some(g => i.group && i.group.toLowerCase().includes(g.toLowerCase()))
    );

    if (items.length === 0) {
      container.textContent = 'Optional ' + groups.join(', ');
      return;
    }

    items.forEach(item => {
      // Filter only positions relevant for this container
      posNamesForContainer.forEach(posName => {
        const pos = positions.find(p => p.names.includes(posName));
        if (!pos) return;

        const img = document.createElement('img');
        img.src = item.image;
        img.alt = item.label || '';
        img.style.position = 'absolute';
        img.style.left = ((pos.x ?? 0) * scale) + 'px';
        img.style.top = ((pos.y ?? 0) * scale) + 'px';
        img.style.width = ((pos.size ?? item.size ?? 30) * scale) + 'px';
        img.style.height = 'auto';
        img.style.transformOrigin = 'center center';
        img.style.transform = `rotate(${pos?.rotation ?? item.rotation ?? 0}deg)`;

        container.appendChild(img);
      });
    });
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
