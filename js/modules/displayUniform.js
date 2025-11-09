import { allUniformItems } from '/js/modules/uniformMapping.js';
import * as uniformData from '/js/libraries/uniformData.js';
import { getGrades, getUniforms, getGenders, isFlightSuit } from '/js/modules/uniformLogic.js';
import { positions } from '/js/modules/uniformPositions.js';

document.addEventListener('DOMContentLoaded', () => {
  // --- Build itemMap once for quick lookups ---
  const itemMap = {};
  Object.values(allUniformItems).forEach(({ items }) => {
    if (Array.isArray(items)) {
      items.forEach(item => {
        if (item.value) itemMap[item.value] = item;
      });
    }
  });

  // --- Helper: Clear all children from an element ---
  function clearElement(elem) {
    while (elem.firstChild) elem.removeChild(elem.firstChild);
  }

  // --- Helper: Populate <select> with options (supports optgroups) ---
  function populateSelect(selectElem, options, includePlaceholder = true, placeholderText = 'Select') {
    clearElement(selectElem);

    if (includePlaceholder) {
      const placeholder = document.createElement('option');
      placeholder.value = '';
      placeholder.textContent = placeholderText;
      placeholder.selected = true;
      selectElem.appendChild(placeholder);
    }

    // Group options by their group property
    const grouped = options.reduce((acc, opt) => {
      const group = opt.group || "Other";
      acc[group] = acc[group] || [];
      acc[group].push(opt);
      return acc;
    }, {});

    if (Object.keys(grouped).length > 1) {
      Object.entries(grouped).forEach(([groupName, groupItems]) => {
        const optgroup = document.createElement('optgroup');
        optgroup.label = groupName;
        groupItems.forEach(item => {
          const option = document.createElement('option');
          option.value = item.value;
          option.textContent = item.label;
          optgroup.appendChild(option);
        });
        selectElem.appendChild(optgroup);
      });
    } else {
      options.forEach(item => {
        const option = document.createElement('option');
        option.value = item.value;
        option.textContent = item.label;
        selectElem.appendChild(option);
      });
    }
  }

  // --- Get currently selected uniform items from form ---
  function getCurrentSelections() {
    const selections = [];

    document.querySelectorAll('#uniform-form select').forEach(select => {
      if (itemMap[select.value]) selections.push(itemMap[select.value]);
    });

    document.querySelectorAll('#uniform-form input[type="checkbox"]').forEach(checkbox => {
      if (checkbox.checked && itemMap[checkbox.value]) {
        selections.push(itemMap[checkbox.value]);
      }
    });

    return selections;
  }

  // --- Filter uniform items based on uniform, gender, and member ---
  function getUniformItems(uniform, gender, member) {
    const filteredData = {};

    Object.entries(allUniformItems).forEach(([categoryKey, { displayName, items }]) => {
      if (!Array.isArray(items)) return;

      const filteredItems = items.filter(item => {
        const types = Array.isArray(item.type) ? item.type : [item.type];

        if (!types.includes(uniform)) return false;

        if (item.wearer && item.wearer !== "All" && item.wearer !== member) {
          if ((item.wearer === "Male" && gender !== "Male") ||
              (item.wearer === "Female" && gender !== "Female") ||
              (item.wearer !== "Male" && item.wearer !== "Female")) {
            return false;
          }
        }

        if (item.gender && item.gender !== "unisex" && item.gender !== gender) return false;

        return true;
      });

      if (filteredItems.length) filteredData[categoryKey] = { displayName, items: filteredItems };
    });

    return filteredData;
  }

  // --- Render uniform item controls (select or checkboxes) into container ---
  function renderUniformItems(filteredData, container) {
    clearElement(container);

    Object.entries(filteredData).forEach(([groupKey, { displayName, items }]) => {
      const header = document.createElement('h4');
      header.textContent = displayName;
      container.appendChild(header);

      // Group by subgroup for form controls
      const grouped = items.reduce((acc, item) => {
        const group = item.group || "Other";
        acc[group] = acc[group] || [];
        acc[group].push(item);
        return acc;
      }, {});

      Object.entries(grouped).forEach(([groupName, groupItems]) => {
        const wrapper = document.createElement('div');
        wrapper.classList.add('form-group');

        if (groupItems.length > 1) {
          const label = document.createElement('label');
          label.textContent = groupName;
          wrapper.appendChild(label);
          wrapper.appendChild(document.createElement('br'));

          const select = document.createElement('select');

          const placeholder = document.createElement('option');
          placeholder.value = '';
          placeholder.textContent = 'Select';
          placeholder.selected = true;
          select.appendChild(placeholder);

          // Find first required item index
          const firstRequiredIndex = groupItems.findIndex(item => item.required);

          groupItems.forEach((item, index) => {
            const option = document.createElement("option");
            option.value = item.value;
            option.textContent = item.label;

            // Select first required item if exists, otherwise none
            if (firstRequiredIndex !== -1 && index === firstRequiredIndex) {
              option.selected = true;
            }

            select.appendChild(option);
          });

          wrapper.appendChild(select);
        } else {
          // Single item: checkbox
          const item = groupItems[0];
          const label = document.createElement('label');
          const checkbox = document.createElement('input');
          checkbox.type = 'checkbox';
          checkbox.value = item.value;
          if (item.required) checkbox.checked = true;
          label.appendChild(checkbox);
          label.appendChild(document.createTextNode(' ' + item.label));
          wrapper.appendChild(label);
        }

        container.appendChild(wrapper);
      });
    });
  }

  // --- Elements ---
  const memberSelect = document.getElementById('member');
  const gradeSelect = document.getElementById('grade');
  const uniformSelect = document.getElementById('uniform');
  const genderSelect = document.getElementById('gender');
  const container = document.getElementById('form-container');
  const form = document.getElementById('uniform-form');

  // --- Event Handlers ---

  // When member changes: update grades and uniforms
  memberSelect.addEventListener('change', () => {
    const member = memberSelect.value;

    if (!member) {
      populateSelect(gradeSelect, [], true, 'Select Member First');
      populateSelect(uniformSelect, [], true, 'Select Member First');
      populateSelect(genderSelect, [], true, 'Select Uniform First');
      clearElement(container);
      return;
    }

    populateSelect(gradeSelect, getGrades(member), true);
    populateSelect(uniformSelect, getUniforms(member), true);
    populateSelect(genderSelect, [], true);
    clearElement(container);
  });

  // When uniform changes: update gender options and default selection
  uniformSelect.addEventListener('change', () => {
    const member = memberSelect.value;
    const uniformValue = uniformSelect.value;

    if (!uniformValue) {
      populateSelect(genderSelect, [], true);
      clearElement(container);
      return;
    }

    const uniformObj = getUniforms(member).find(u => u.value === uniformValue);
    if (!uniformObj) {
      populateSelect(genderSelect, [], true);
      clearElement(container);
      return;
    }

    populateSelect(genderSelect, getGenders(uniformObj), true);

    // Default gender selection based on flight suit status
    if (!isFlightSuit(uniformObj)) {
      genderSelect.value = 'Male';
    } else {
      genderSelect.selectedIndex = 1;
    }

    genderSelect.dispatchEvent(new Event('change'));
  });

  // When gender changes: render uniform items and update preview
  genderSelect.addEventListener('change', () => {
    const member = memberSelect.value;
    const uniform = uniformSelect.value;
    const gender = genderSelect.value;

    if (!gender) {
      clearElement(container);
      return;
    }

    const filteredData = getUniformItems(uniform, gender, member);
    renderUniformItems(filteredData, container);
    updatePreview();
  });

  // --- Initialize ---
  populateSelect(memberSelect, uniformData.members, true);
  memberSelect.value = 'Cadet';
  memberSelect.dispatchEvent(new Event('change'));

  // --- Update preview on form changes ---
  form.addEventListener('change', updatePreview);

  function updatePreview() {
    const selections = getCurrentSelections();
    renderUniform(selections);
  }

  updatePreview();
});

// --- Render uniform preview and details ---
function renderUniform(selections) {
  if (!selections || selections.length === 0) return;

  console.log("All selections:", selections);

  // Find key items by group
  const member = selections.find(item => item.group?.toLowerCase().includes('member'));
  const gradeItem = selections.find(item => item.group?.toLowerCase().includes('grades'));
  const uniform = selections.find(item =>
    item.group && ['usaf uniforms', 'cadet uniforms', 'senior uniforms', '18+ uniforms'].includes(item.group.toLowerCase())
  );

  // Clear overview image container first
  const overviewImage = document.getElementById('overview-image');
  if (overviewImage) overviewImage.innerHTML = '';

  // Render grade images at specified positions
  if (gradeItem) {
    const gradePositions = ['collar-grade', 'hat-grade', 'shirt-grade-left', 'shirt-grade-right'];
    gradePositions.forEach(posName => {
      const pos = positions.find(p => p.names.includes(posName));
      if (!pos) return;

      const img = document.createElement('img');
      img.src = gradeItem.image;
      img.alt = gradeItem.label || 'Grade';
      img.style.position = 'absolute';
      img.style.left = (pos.x ?? 0) + 'px';
      img.style.top = (pos.y ?? 0) + 'px';
      img.style.width = (pos.size ?? 30) + 'px';
      img.style.height = 'auto';
      img.style.zIndex = 100;

      if (item.reference) {
        img.classList.add('img-tooltip');
      }

      overviewImage.appendChild(img);
    });
  }

  // Find single items by group
  const singleItems = {
    collar: selections.find(item => item.group?.toLowerCase() === 'collar'),
    hat: selections.find(item => item.group?.toLowerCase() === 'hat'),
    outerwear: selections.find(item => item.group?.toLowerCase().includes('outerwear')),
  };

  // Render overview text with regulations
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

  // Filter items to render (only with images)
  const itemsToRender = selections.filter(item => item?.image);

  // Sort items by position order for layering
  itemsToRender.sort((a, b) => {
    const posA = positions.find(p => p.names.some(n => a.group?.toLowerCase().includes(n.toLowerCase()))) || {};
    const posB = positions.find(p => p.names.some(n => b.group?.toLowerCase().includes(n.toLowerCase()))) || {};
    return (positions.indexOf(posA) || 0) - (positions.indexOf(posB) || 0);
  });

  // Ensure collar and hat items are included last
  ['collar', 'hat'].forEach(key => {
    const item = singleItems[key];
    if (item && !itemsToRender.includes(item)) itemsToRender.push(item);
  });

  // Helper: Get items matching a position
  function getItemsForPosition(position, selections) {
    const posKey = position.names[0];
    const specialPositions = {
      'cap-nameplate': ['CAP plates'],
      'shirt-grade-left': ['Grades'],
      'shirt-grade-right': ['Grades'],
    };

    return selections.filter(item => {
      if (!item.group) return false;

      const mappedPos = Object.entries(specialPositions).find(([posName, groups]) =>
        groups.includes(item.group)
      );

      if (mappedPos) {
        return mappedPos[0] === posKey;
      }

      return position.names.some(n => item.group.toLowerCase().includes(n.toLowerCase()));
    });
  }

  // Render images inside a container with scaling
  function renderItems(container, selections) {
    if (!container) return;
    container.innerHTML = '';

    const baseWidth = 200;
    const baseHeight = 740;
    const rect = container.getBoundingClientRect();
    const containerWidth = rect.width > 0 ? rect.width : baseWidth;
    const containerHeight = rect.height > 0 ? rect.height : baseHeight;
    const scale = Math.min(containerWidth / baseWidth, containerHeight / baseHeight);

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

        const rotation = pos.rotation ?? item.rotation ?? 0;
        img.style.transformOrigin = 'center center';
        img.style.transform = `rotate(${rotation}deg)`;

        if (item.reference) {
          img.title = item.label;
        }

        container.appendChild(img);
      });
    });
  }

  // Render main uniform overview image
  renderItems(document.getElementById('overview-image'), itemsToRender);

  // --- Render multi-group images in side containers ---
  const multiGroups = [
    { elementId: 'extra-left', groups: ['collar', 'grades'], positions: ['collar-grade', 'shirt-grade-left'] },
    { elementId: 'extra-right', groups: ['hat', 'grades'], positions: ['hat-grade', 'shirt-grade-right'] },
  ];

  multiGroups.forEach(({ elementId, groups, positions: posNames }) => {
    const container = document.getElementById(elementId);
    if (!container) return;
    container.innerHTML = '';

    const rect = container.getBoundingClientRect();
    const baseWidth = 200;
    const baseHeight = 200;
    const containerWidth = rect.width > 0 ? rect.width : baseWidth;
    const containerHeight = rect.height > 0 ? rect.height : baseHeight;
    const scale = Math.min(containerWidth / baseWidth, containerHeight / baseHeight);

    const items = selections.filter(i =>
      groups.some(g => i.group && i.group.toLowerCase().includes(g.toLowerCase()))
    );

    if (items.length === 0) {
      container.textContent = 'Optional ' + groups.join(', ');
      return;
    }

    items.forEach(item => {
      posNames.forEach(posName => {
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
        img.style.transform = `rotate(${pos.rotation ?? item.rotation ?? 0}deg)`;

        container.appendChild(img);
      });
    });
  });

  // --- Render outerwear image and text ---
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
    } else {
      outerImg.textContent = 'Outerwear Image';
    }
  }

  const outerText = document.getElementById('outerwear-text');
  if (outerText) {
    outerText.textContent = singleItems.outerwear?.label || 'Outerwear description';
  }
}

// --- Navigation button ---
document.getElementById("uniformButton")?.addEventListener('click', () => {
  location.href = "/pages/uniforms/builder.html";
});
