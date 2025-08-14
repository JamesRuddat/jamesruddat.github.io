import * as uniformData from '/js/uniformData.js';

document.addEventListener('DOMContentLoaded', () => {
  const selectionsString = sessionStorage.getItem('uniformSelections');
  const displayDiv = document.getElementById('uniformDisplay');

  if (!selectionsString) {
    displayDiv.textContent = 'No uniform data found. Please fill out the form first.';
    return;
  }

  const selections = JSON.parse(selectionsString);

  displayDiv.innerHTML = '<h3>Your Uniform Details</h3>';

  // --- Overview: Rank, Uniform Name, Nameplate ---
  const overview = document.createElement('div');
  overview.style.marginBottom = '20px';
  overview.style.textAlign = 'center';

  const grade = selections.find(item => item.group && item.group.toLowerCase().includes('grade'));
  const baseUniform = selections.find(item => item.group === 'Base Uniforms');
  const memberType = selections.find(item => item.group && item.group.toLowerCase().includes('member'));

  const rankText = grade ? grade.label : 'No Grade Selected';
  const uniformText = baseUniform ? baseUniform.label : 'No Uniform Selected';

  // Grade + image span
  const gradeSpan = document.createElement('span');
  gradeSpan.innerHTML = `<strong>Grade:</strong> ${rankText}`;

  if (grade?.image) {
    const gradeImg = document.createElement('img');
    gradeImg.src = grade.image;
    gradeImg.alt = grade.label || 'Grade Image';
    gradeImg.style.height = '50px';
    gradeImg.style.verticalAlign = 'middle';
    gradeImg.style.marginLeft = '5px';
    gradeSpan.appendChild(gradeImg);
  }

  overview.appendChild(gradeSpan);

  // Uniform name
  const uniformSpan = document.createElement('div');
  uniformSpan.innerHTML = `<strong>Uniform:</strong> ${uniformText}`;
  overview.appendChild(uniformSpan);

  // --- Nameplate selection ---
  let nameplateItem = null;

  if (memberType?.value === 'cadet') {
    // Cadets get the CAP nameplate
    nameplateItem = uniformData.nameplates.find(n => n.value === 'cap_nameplate_cadet');
  } else if (memberType?.value === 'adult') {
    // Adults: pick based on Class A or Class B uniform
    if (baseUniform?.value === 'class_a') {
      nameplateItem = uniformData.nameplates.find(n => n.value === 'brush_silver_nameplate');
    } else if (baseUniform?.value === 'class_b') {
      nameplateItem = uniformData.nameplates.find(n => n.value === 'cap_nameplate_adult');
    } else {
      // fallback for other uniforms
      nameplateItem = uniformData.nameplates.find(n => n.uniformCategory && n.uniformCategory.toLowerCase().includes('adult'));
    }
  }

  if (nameplateItem?.image) {
    const nameplateImg = document.createElement('img');
    nameplateImg.src = nameplateItem.image;
    nameplateImg.alt = nameplateItem.label || 'Nameplate';
    nameplateImg.style.height = '50px';
    nameplateImg.style.verticalAlign = 'middle';
    nameplateImg.style.marginLeft = '5px';
    gradeSpan.appendChild(nameplateImg);
  }

  displayDiv.appendChild(overview);

  // --- Uniform Container ---
  const uniformContainer = document.createElement('div');
  uniformContainer.style.position = 'relative';
  uniformContainer.style.width = '500px';
  uniformContainer.style.height = '800px';
  uniformContainer.style.margin = 'auto';

  const genderSelection = selections.find(item => item.group === 'Gender Type');
  const gender = genderSelection ? genderSelection.value.toLowerCase() : 'male';

  // Extra items (shirts, slacks, etc.)
  let extraItems = [];
  if (baseUniform?.value === 'class_a') extraItems = uniformData.classA;
  else if (baseUniform?.value === 'class_b') extraItems = uniformData.classB;

  // Filter by gender
  extraItems = extraItems.filter(u => {
    if (!u.group) return true;
    const groupLower = u.group.toLowerCase();
    if (groupLower.startsWith('male') && gender === 'male') return true;
    if (groupLower.startsWith('female') && gender === 'female') return true;
    if (groupLower.includes('unisex')) return true;
    return false;
  });

  // Sort: shirts first, pants/slacks after
  extraItems.sort((a, b) => {
    if (a.group.toLowerCase().includes('shirt')) return -1;
    if (b.group.toLowerCase().includes('shirt')) return 1;
    return 0;
  });

  // Render uniform images
  extraItems.forEach((item, index) => {
    const img = document.createElement('img');
    img.src = item.image || "../uniformImages/A1C.png";
    img.alt = item.label || 'Item Image';
    img.style.position = 'absolute';
    img.style.width = '300px';
    img.style.top = item.group.toLowerCase().includes('shirt') ? '0px' : '150px';
    img.style.zIndex = index + 1;
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
  quotesDiv.innerHTML = `
    <h3>CAPR 39-1 Details</h3>
    <em>"Always maintain your uniform to the highest standard."</em>
    <br>
    <em>"Professionalism is reflected in your appearance and conduct."</em>
  `;
  displayDiv.appendChild(quotesDiv);

  // --- Outerwear Section ---
  const outerwearDiv = document.createElement('div');
  outerwearDiv.style.marginTop = '20px';
  outerwearDiv.style.textAlign = 'center';
  outerwearDiv.innerHTML = `<strong>Outerwear:</strong> No outerwear selected`; // Add logic if needed
  displayDiv.appendChild(outerwearDiv);
});
