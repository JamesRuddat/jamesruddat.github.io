import * as uniformData from '/js/data/uniformData.js';
import { positions } from '/js/data/positions.js';

function renderUniform() {
  const displayDiv = document.getElementById('uniformDisplay');
  const selectionsString = sessionStorage.getItem('uniformSelections');

  displayDiv.innerHTML = '<h3>Your Uniform Details</h3>';

  if (!selectionsString) {
    displayDiv.textContent = 'No uniform data found. Please fill out the form first.';
    return;
  }

  const selections = JSON.parse(selectionsString);

  // --- Overview ---
  const overview = document.createElement('div');
  overview.style.marginBottom = '20px';
  overview.style.textAlign = 'center';

  const grade = selections.find(item => item.group && item.group.toLowerCase().includes('grade'));
  const uniform = selections.find(item => item.group && [
    'USAF Uniforms', 'Cadet Uniforms', 'Senior Uniforms', '18+ Uniforms'
  ].includes(item.group));
  const member = selections.find(item => item.group && item.group.toLowerCase().includes('member'));

  overview.innerHTML = `<strong>Grade:</strong> ${grade ? grade.label : 'No Grade Selected'} <br>
                        <strong>Uniform:</strong> ${uniform ? uniform.label : 'No Uniform Selected'}`;
  displayDiv.appendChild(overview);

  // --- Uniform Container ---
  const uniformContainer = document.createElement('div');
  uniformContainer.style.position = 'relative';
  uniformContainer.style.width = '300px';
  uniformContainer.style.height = '800px';
  uniformContainer.style.margin = 'auto';
  uniformContainer.style.border = '2px solid #ccc';
  //uniformContainer.style.backgroundImage = "url('/js/data/body.svg')"; // watermark

  displayDiv.appendChild(uniformContainer);

  // --- Add the body image first ---
  const bodyImg = document.createElement('img');
  bodyImg.src = '/js/data/body.svg';
  bodyImg.alt = 'Uniform Body';
  bodyImg.style.position = 'absolute';
  bodyImg.style.left = '-45px';
  bodyImg.style.top = '60px';
  bodyImg.style.width = '130%';
  bodyImg.style.height = '90%';
  bodyImg.style.zIndex = 0; // Behind all other items
  uniformContainer.appendChild(bodyImg);

  const genderSelection = selections.find(item => item.group === 'Gender Type');
  const gender = genderSelection ? genderSelection.value.toLowerCase() : 'male';

  // --- Separate items ---
  const selectedItems = selections.filter(item =>
    item.group &&
    !item.group.toLowerCase().includes('grade') &&
    !item.group.toLowerCase().includes('member') &&
    !['USAF Uniforms', 'Cadet Uniforms', 'Senior Uniforms', '18+ Uniforms'].includes(item.group)
  );

  const uniformPieces = selectedItems.filter(item => item.type === 'uniform');
  const otherItems = selectedItems.filter(item => item.type !== 'uniform');

  // --- Extra uniform items from uniformData ---
  let extraUniformItems = [];
  if (uniform?.value.toLowerCase() === 'classa') extraUniformItems = uniformData.serviceDressUniform || [];
  else if (uniform?.value.toLowerCase() === 'classb') extraUniformItems = uniformData.blueServiceUniform || [];

  // Filter extra uniforms by gender
  extraUniformItems = extraUniformItems.filter(u => {
    if (!u.group) return true;
    const groupLower = u.group.toLowerCase();
    return (groupLower.startsWith('male') && gender === 'male') ||
      (groupLower.startsWith('female') && gender === 'female') ||
      groupLower.includes('unisex');
  });

  // --- Add grade & nameplate ---
  let nameplate = null;
  if (member?.value === 'Cadet') {
    nameplate = uniformData.nameplates.find(n => n.value === 'cap_nameplate_cadet');
  } else if (member?.value === 'Senior') {
    if (uniform?.value.toLowerCase() === 'classa') nameplate = uniformData.nameplates.find(n => n.value === 'brush_silver_nameplate');
    else if (uniform?.value.toLowerCase() === 'classb') nameplate = uniformData.nameplates.find(n => n.value === 'cap_nameplate_adult');
    else nameplate = uniformData.nameplates.find(n => n.uniformCategory && n.uniformCategory.toLowerCase().includes('senior'));
  }

  // --- Combine all items ---
  let itemsToRender = [
    ...extraUniformItems,
    ...uniformPieces,
    ...otherItems
  ];
  if (grade) itemsToRender.push(grade);
  if (nameplate) itemsToRender.push(nameplate);

  // --- Sort items by positions order ---
  itemsToRender.sort((a, b) => {
    const indexA = positions.findIndex(p =>
      p.names.some(name => a.group?.toLowerCase().includes(name.toLowerCase()))
    );
    const indexB = positions.findIndex(p =>
      p.names.some(name => b.group?.toLowerCase().includes(name.toLowerCase()))
    );
    return indexA - indexB; // lower index (earlier in positions) gets rendered first
  });

  // --- Render each item with group keyword matching ---
  itemsToRender.forEach((item, index) => {
    const img = document.createElement('img');
    img.src = item.image || '/js/data/beret8.gif';
    img.alt = item.label || 'Item Image';
    img.style.position = 'absolute';

    const posObj = positions.find(p =>
      p.names.some(name => item.group?.toLowerCase().includes(name.toLowerCase()))
    ) || {};

    const x = posObj.x ?? item.x ?? 0;
    const y = posObj.y ?? item.y ?? 0;
    const size = posObj.size ?? item.size ?? 30;

    img.style.left = x + 'px';
    img.style.top = y + 'px';
    img.style.width = size + 'px';
    img.style.height = 'auto';
    img.style.zIndex = index + 1;

    uniformContainer.appendChild(img);
  });

  // --- Regulations ---
  const quotesDiv = document.createElement('div');
  quotesDiv.style.marginTop = '20px';
  quotesDiv.style.padding = '10px';
  quotesDiv.style.borderTop = '1px solid #ccc';
  quotesDiv.style.borderBottom = '1px solid #ccc';
  quotesDiv.style.textAlign = 'center';
  const allRegulations = selections
    .filter(item => item.reference && item.reference.trim() !== "")
    .map(item => `
      <div style="margin-bottom: 10px; text-align: left;">
        <strong>${item.label}:</strong>
        <small>${item.reference}</small>
      </div>
    `);
  quotesDiv.innerHTML = `<h3>CAPR 39-1 Details</h3>${allRegulations.length ? allRegulations.join('') : '<em>No regulations for selected items.</em>'}`;
  displayDiv.appendChild(quotesDiv);

  // --- Outerwear ---
  const outerwearDiv = document.createElement('div');
  outerwearDiv.style.marginTop = '20px';
  outerwearDiv.style.textAlign = 'center';
  outerwearDiv.innerHTML = `<strong>Outerwear:</strong> No outerwear selected`;
  displayDiv.appendChild(outerwearDiv);
}

// --- Render on load ---
document.addEventListener('DOMContentLoaded', renderUniform);

// Optional: re-render if sessionStorage changes
window.addEventListener('storage', (e) => {
  if (e.key === 'uniformSelections') renderUniform();
});
