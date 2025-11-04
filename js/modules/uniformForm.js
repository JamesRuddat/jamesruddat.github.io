import { allUniformItems } from '/js/modules/uniformMapping.js';
import * as uniformData from '/js/libraries/uniformData.js';
import { getGrades, getUniforms, getGenders, isFlightSuit } from '/js/modules/uniformLogic.js';

document.addEventListener('DOMContentLoaded', () => {
    const memberSelect = document.getElementById('member');
    const gradeSelect = document.getElementById('grade');
    const uniformSelect = document.getElementById('uniform');
    const genderSelect = document.getElementById('gender');
    const container = document.getElementById("form-container");

    function clearElement(elem) {
        while (elem.firstChild) elem.removeChild(elem.firstChild);
    }

    function populateSelect(selectElem, options, includePlaceholder = true, placeholderText = 'Select') {
        clearElement(selectElem);

        if (includePlaceholder) {
            const opt = document.createElement('option');
            opt.value = '';
            opt.textContent = placeholderText;
            opt.selected = true;
            selectElem.appendChild(opt);
        }

        // Detect if options have groups
        const grouped = options.reduce((acc, opt) => {
            const group = opt.group || "Other";
            if (!acc[group]) acc[group] = [];
            acc[group].push(opt);
            return acc;
        }, {});

        // If multiple groups exist, use <optgroup>
        if (Object.keys(grouped).length > 1) {
            Object.entries(grouped).forEach(([groupName, groupItems]) => {
                const optgroup = document.createElement("optgroup");
                optgroup.label = groupName;

                groupItems.forEach(optData => {
                    const opt = document.createElement('option');
                    opt.value = optData.value;
                    opt.textContent = optData.label;
                    optgroup.appendChild(opt);
                });

                selectElem.appendChild(optgroup);
            });
        } else {
            // Flat options
            options.forEach(optData => {
                const opt = document.createElement('option');
                opt.value = optData.value;
                opt.textContent = optData.label;
                selectElem.appendChild(opt);
            });
        }
    }

    // 1️⃣ Filter uniform items based on uniform and gender
    function getUniformItems(uniform, gender, member) {
        const filteredData = {};

        console.log('--- Filtering Items ---');
        console.log('Selected Uniform:', uniform, 'Gender:', gender, 'Member:', member);

        Object.entries(allUniformItems).forEach(([categoryKey, groupObj]) => {
            const { displayName, items } = groupObj;

            if (!Array.isArray(items)) { return; }

            const filteredItems = items.filter(item => {
                const types = Array.isArray(item.type) ? item.type : [item.type];

                if (!types.includes(uniform)) { return false; }

                if (item.wearer && item.wearer !== "All" && item.wearer !== member) {
                    if ((item.wearer === "Male" && gender !== "Male") ||
                        (item.wearer === "Female" && gender !== "Female") ||
                        (item.wearer !== "Male" && item.wearer !== "Female")) {
                        return false;
                    }
                }

                if (item.gender && item.gender !== "unisex" && item.gender !== gender) { return false; }

                return true;
            });

            if (filteredItems.length) {
                filteredData[categoryKey] = { displayName, items: filteredItems };
                console.log(`Category "${displayName}" has ${filteredItems.length} item(s) after filtering.`);
            }
        });

        console.log('--- Filtered Data ---', filteredData);
        return filteredData;
    }

    // 2️⃣ Render filtered uniform items to the container
    function renderUniformItems(filteredData, container) {
        clearElement(container);

        Object.entries(filteredData).forEach(([groupKey, groupObj]) => {
            const { displayName, items: arrayItems } = groupObj;

            // Header for the group
            const header = document.createElement("h4");
            header.textContent = displayName;
            container.appendChild(header);

            // Group items by their "group" property
            const groupedData = arrayItems.reduce((acc, item) => {
                const group = item.group || "Other";
                if (!acc[group]) acc[group] = [];
                acc[group].push(item);
                return acc;
            }, {});

            Object.entries(groupedData).forEach(([groupName, groupItems]) => {
                const wrapper = document.createElement("div");
                wrapper.classList.add("form-group");

                if (groupItems.length > 1) {
                    const label = document.createElement("label");
                    label.textContent = groupName;
                    wrapper.appendChild(label);
                    wrapper.appendChild(document.createElement("br"));

                    const select = document.createElement("select");

                    // Placeholder
                    const placeholder = document.createElement("option");
                    placeholder.value = "";
                    placeholder.textContent = "Select";
                    placeholder.selected = true;
                    select.appendChild(placeholder);

                    const subGroups = groupItems.reduce((acc, item) => {
                        const group = item.group || "Other";
                        if (!acc[group]) acc[group] = [];
                        acc[group].push(item);
                        return acc;
                    }, {});

                    Object.entries(subGroups).forEach(([subGroup, subItems]) => {
                        const optgroup = document.createElement("optgroup");
                        optgroup.label = subGroup;

                        subItems.forEach(item => {
                            const option = document.createElement("option");
                            option.value = item.value;
                            option.textContent = item.label;

                            if (item.required) option.selected = true;
                            optgroup.appendChild(option);
                        });
                        select.appendChild(optgroup);
                    });
                    wrapper.appendChild(select);

                } else {
                    const item = groupItems[0];
                    const label = document.createElement("label");
                    const checkbox = document.createElement("input");
                    checkbox.type = "checkbox";
                    checkbox.value = item.value;

                    if (item.required) checkbox.checked = true;
                    label.appendChild(checkbox);
                    label.appendChild(document.createTextNode(" " + item.label));
                    wrapper.appendChild(label);
                }
                container.appendChild(wrapper);
            });
        });
    }

    // --- When member changes, update grades & uniforms ---
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

    // --- When uniform changes, update gender ---
    uniformSelect.addEventListener('change', () => {
        const member = memberSelect.value;
        const uniformValue = uniformSelect.value;
        if (!uniformValue) {
            populateSelect(genderSelect, [], true);
            clearElement(container);
            return;
        }

        const uniforms = getUniforms(member);
        const uniformObj = uniforms.find(u => u.value === uniformValue);
        if (!uniformObj) {
            populateSelect(genderSelect, [], true);
            clearElement(container);
            return;
        }
        populateSelect(genderSelect, getGenders(uniformObj), true);

        // Default gender if not flight suit
        if (!isFlightSuit(uniformObj)) genderSelect.value = 'Male';
        else genderSelect.selectedIndex = 1;

        // Trigger after setting the gender
        genderSelect.dispatchEvent(new Event('change'));
    });

    // --- When gender changes, render the items ---
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
    });

    // --- Initialize member types ---
    populateSelect(memberSelect, uniformData.members, true);
    memberSelect.value = 'Cadet';
    memberSelect.dispatchEvent(new Event('change'));

    // --- Prepare itemMap for form submission ---
    const itemMap = {};
    Object.entries(allUniformItems).forEach(([categoryKey, groupObj]) => {
        const { items } = groupObj;
        if (Array.isArray(items)) {
            items.forEach(item => {
                if (item.value) itemMap[item.value] = item;
            });
        }
    });

    // --- Form submit ---
    const form = document.getElementById('uniform-form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const selectedObjects = [];

        document.querySelectorAll('select').forEach(select => {
            const selectedItem = itemMap[select.value];
            if (selectedItem) selectedObjects.push(selectedItem);
        });

        document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
            const selectedItem = itemMap[checkbox.value];
            if (checkbox.checked && selectedItem) selectedObjects.push(selectedItem);
        });

        sessionStorage.setItem('uniformSelections', JSON.stringify(selectedObjects));
        window.location.href = '/pages/uniforms/uniform.html';
    });
});
