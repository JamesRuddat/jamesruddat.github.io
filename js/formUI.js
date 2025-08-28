import * as uniformData from '/js/data/uniformData.js';
import { getGrades, getUniforms, getGenders, isFlightSuit } from '/js/data/uniformLogic.js';
import { uniformBadgeMap } from '/js/data/uniforms/uniformBadgeMap.js';

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
    function getUniformItems(selectedUniform, gender, member) {
        const uniformObj = uniformBadgeMap[selectedUniform];

        const filteredData = {};

        Object.entries(uniformObj).forEach(([groupKey, groupObj]) => {
            const { displayName, items } = groupObj;
            const filteredItems = items.filter(item => {
                if (item.wearer && item.wearer !== "All" && item.wearer !== member) {
                    // Allow Male/Female items if member type is Cadet and gender matches
                    if (item.wearer === "Male" && gender === "Male") return true;
                    if (item.wearer === "Female" && gender === "Female") return true;
                    return false;
                }
                if (item.gender && item.gender !== gender && item.gender !== "unisex") return false;
                return true;
            });

            if (filteredItems.length) {
                filteredData[groupKey] = { displayName, items: filteredItems };
            }
        });

        console.log("Selected Uniform:", selectedUniform);
        console.log("Uniform Array:", uniformBadgeMap[selectedUniform]);

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
        const selectedUniform = uniformSelect.value;

        const gender = genderSelect.value;
        if (!gender) {
            clearElement(container);
            return;
        }

        const filteredData = getUniformItems(selectedUniform, gender, member);
        renderUniformItems(filteredData, container);
    });

    // --- Initialize member types ---
    populateSelect(memberSelect, uniformData.members, true);
    memberSelect.value = 'Cadet';
    memberSelect.dispatchEvent(new Event('change'));

    // --- Prepare itemMap for form submission ---
    const itemMap = {};
    Object.entries(uniformData).forEach(([key, arrayItems]) => {
        if (Array.isArray(arrayItems)) {
            arrayItems.forEach(item => {
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
            if (select.value) selectedObjects.push(itemMap[select.value]);
        });

        document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
            if (checkbox.checked) selectedObjects.push(itemMap[checkbox.value]);
        });

        sessionStorage.setItem('uniformSelections', JSON.stringify(selectedObjects));
        window.location.href = '/capPages/uniform.html';
    });
});
