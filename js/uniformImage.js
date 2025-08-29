import * as uniformData from '/js/data/uniformData.js';
import { positions } from '/js/data/positions.js';

function renderUniform() {
  const selectionsString = sessionStorage.getItem('uniformSelections');
  if (!selectionsString) return;

  const selections = JSON.parse(selectionsString);
  console.log(selectionsString);
  

  // --- Overview info ---
  const member = selections.find(i => i.group?.toLowerCase().includes('member'));
  const grade = selections.find(i => i.group?.toLowerCase().includes('grade'));
  const uniform = selections.find(i => ['USAF Uniforms', 'Cadet Uniforms', 'Senior Uniforms', '18+ Uniforms'].includes(i.group));
  const selectedCollar = selections.find(i => ['Collar', 'Collar', 'Collar'].includes(i.group));
  const selectedHat = selections.find(i => ['Male Service Cap', 'Female Service Cap', 'Male Flight Cap', 'Female Flight Cap', 'ABU', 'CFU'].includes(i.group));

  document.getElementById('overview-text').innerHTML = `
    <strong>Grade:</strong> ${grade?.label || 'No Grade Selected'}<br>
    <strong>Member:</strong> ${member?.label || 'No Member Selected'}<br>
    <strong>Uniform:</strong> ${uniform?.label || 'No Uniform Selected'}
  `;

  // --- Gather items to render ---
  const itemsToRender = selections.filter(i => i.image); // only items that have an image
  itemsToRender.sort((a, b) => {
    const posA = positions.find(p => p.names.some(n => a.group?.toLowerCase().includes(n.toLowerCase()))) || {};
    const posB = positions.find(p => p.names.some(n => b.group?.toLowerCase().includes(n.toLowerCase()))) || {};

    const indexA = positions.indexOf(posA);
    const indexB = positions.indexOf(posB);

    return indexA - indexB;
  });


  // Add hat & collar if selected
  if (selectedCollar) itemsToRender.push(selectedCollar);
  if (selectedHat) itemsToRender.push(selectedHat);

  // --- Dynamic rendering function ---
  function renderItems(container, items) {
    container.innerHTML = '';

    const baseWidth = 200;
    const baseHeight = 800;
    const rect = container.getBoundingClientRect();
    const scale = Math.min(rect.width / baseWidth, rect.height / baseHeight);

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

  // --- Render overview and main uniform ---
  renderItems(document.getElementById('overview-image'), itemsToRender);
  //renderItems(document.getElementById('uniform-main'), itemsToRender);

  // --- Regulations ---
  const regs = selections.filter(i => i.reference?.trim() !== '');
  if (regs.length > 0) {
    const table = `
    <table border="1" cellpadding="4" style="border-collapse: collapse; border: 1px solid #ccc;">
      <thead>
        <tr>
          <th style="text-align: left;">Item</th>
          <th style="text-align: left;">Reference</th>
        </tr>
      </thead>
      <tbody>
        ${regs.map(r => `
          <tr>
            <td><strong>${r.label}</strong>${r.link ? `<br><a href="${r.link}" target="_blank" rel="noopener noreferrer">View on Vanguard</a>` : ""}</td>
            <td>${r.reference ? r.reference : "N/A"}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;

    document.getElementById('reg-main').innerHTML = table;
  } else {
    document.getElementById('reg-extra').innerHTML = "<em>No regulations found</em>";
  }

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
  } else extraRight.textContent = "Optional Hat";

  document.getElementById('extra-text').textContent = 'Optional text';

  // --- Outerwear ---
  const outerImg = document.getElementById('outerwear-image');
  outerImg.innerHTML = '';
  const outerwear = selections.find(i => i.group?.toLowerCase().includes('outerwear'));
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
