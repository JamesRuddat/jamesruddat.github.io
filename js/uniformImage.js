import * as uniformData from '/js/data/uniformData.js';

document.addEventListener('DOMContentLoaded', () => {
  const selectionsString = sessionStorage.getItem('uniformSelections');
  const displayDiv = document.getElementById('uniformDisplay');

  if (!selectionsString) {
    displayDiv.textContent = 'No uniform data found. Please fill out the form first.';
    return;
  }

  const selections = JSON.parse(selectionsString);

  displayDiv.innerHTML = '<h3>Your Uniform Details</h3>';

  // --- Overview: Rank & Uniform name only ---
  const overview = document.createElement('div');
  overview.style.marginBottom = '20px';
  overview.style.textAlign = 'center';

  const grade = selections.find(item => item.group && item.group.toLowerCase().includes('grade'));
  const uniform = selections.find(item => item.group && (
    item.group === 'USAF Uniforms' ||
    item.group === 'Cadet Uniforms' ||
    item.group === 'Senior Uniforms' ||
    item.group === '18+ Uniforms'
  ));
  const member = selections.find(item => item.group && item.group.toLowerCase().includes('member'));

  const rankText = grade ? grade.label : 'No Grade Selected';
  const uniformText = uniform ? uniform.label : 'No Uniform Selected';

  const overviewText = document.createElement('div');
  overviewText.innerHTML = `<strong>Grade:</strong> ${rankText} <br> <strong>Uniform:</strong> ${uniformText}`;
  overview.appendChild(overviewText);
  displayDiv.appendChild(overview);

  // --- Uniform Container ---
  const uniformContainer = document.createElement('div');
  uniformContainer.style.position = 'relative';
  uniformContainer.style.width = '300px';
  uniformContainer.style.height = '600px';
  uniformContainer.style.margin = 'auto';
  uniformContainer.style.border = '3px solid #ccc'; // optional visual aid

  const genderSelection = selections.find(item => item.group === 'Gender Type');
  const gender = genderSelection ? genderSelection.value.toLowerCase() : 'male';

  // Extra uniform items (shirt, slacks, etc.)
  let extraItems = [];
  if (uniform?.value === 'class_a') extraItems = uniformData.serviceDressUniform || [];
  else if (uniform?.value === 'class_b') extraItems = uniformData.blueServiceUniform || [];

  // Filter by gender
  extraItems = extraItems.filter(u => {
    if (!u.group) return true;
    const groupLower = u.group.toLowerCase();
    return (groupLower.startsWith('male') && gender === 'male') ||
      (groupLower.startsWith('female') && gender === 'female') ||
      groupLower.includes('unisex');
  });

  // Add grade and nameplate from data
  let nameplate = null;
  if (member?.value === 'Cadet') {
    nameplate = uniformData.nameplates.find(n => n.value === 'cap_nameplate_cadet');
  } else if (member?.value === 'Senior') {
    if (uniform?.value === 'class_a') nameplate = uniformData.nameplates.find(n => n.value === 'brush_silver_nameplate');
    else if (uniform?.value === 'class_b') nameplate = uniformData.nameplates.find(n => n.value === 'cap_nameplate_adult');
    else nameplate = uniformData.nameplates.find(n => n.uniformCategory && n.uniformCategory.toLowerCase().includes('senior'));
  }

  const uniformItems = [...extraItems];
  if (grade) uniformItems.push(grade);
  if (nameplate) uniformItems.push(nameplate);

  // --- Render all uniform items ---
  uniformItems.forEach((item, index) => {
    const img = document.createElement('img');
    img.src = item.image || "/js/data/beret8.gif";
    img.alt = item.label || 'Item Image';
    img.style.position = 'absolute';

    // Use X/Y and size from JS data
    img.style.left = (item.x ?? 0) + 'px';
    img.style.top = (item.y ?? 0) + 'px';
    const size = item.size ?? 100;
    img.style.width = size + 'px';
    img.style.height = 'auto';

    img.style.zIndex = index + 1;

    // Store the coordinates in dataset for later use
    img.dataset.x = item.x;
    img.dataset.y = item.y;
    img.dataset.size = item.size;

    uniformContainer.appendChild(img);
  });

  displayDiv.appendChild(uniformContainer);

  // --- Regulation Quotes ---
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

  quotesDiv.innerHTML = `
    <h3>CAPR 39-1 Details</h3>
    ${allRegulations.length > 0 ? allRegulations.join('') : '<em>No regulations for selected items.</em>'}
  `;
  displayDiv.appendChild(quotesDiv);

  // --- Outerwear Section ---
  const outerwearDiv = document.createElement('div');
  outerwearDiv.style.marginTop = '20px';
  outerwearDiv.style.textAlign = 'center';
  outerwearDiv.innerHTML = `<strong>Outerwear:</strong> No outerwear selected`;
  displayDiv.appendChild(outerwearDiv);
});
