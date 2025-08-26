import * as uniformData from '/js/data/uniformData.js';
import { getGrades, getUniforms, getGenders, getBadgesAndPatches, isFlightSuit } from '/js/data/uniformLogic.js';

document.addEventListener('DOMContentLoaded', () => {
    const memberSelect = document.getElementById('member');
    const gradeSelect = document.getElementById('grade');
    const uniformSelect = document.getElementById('uniform');
    const genderSelect = document.getElementById('gender');
    const container = document.getElementById("form-container");

    const uniformArrays = {
        messDressUniform: "Mess Dress Uniform",
        semiFormalUniform: "Semi-Formal Uniform",
        corporateSemiFormalUniform: "Corporate Semi-Formal Uniform",

        serviceDressUniform: "Service Dress Uniform (Class A)",
        blueServiceUniform: "Blue Service Uniform (Class B)",
        corporateServiceDressUniform: "Corporate Semi-Formal",
        aviatorShirtUniform: "Aviator Shirt Uniform",
        corporateWorkingUniform: "Corporate Working Uniform",

        airmanBattleUniform: "Airman Battle Uniform",
        battleDressUniform: "Battle Dress Uniform",
        flightDutyUniform: "Flight Duty Uniform",
        corporateWorkingUniform: "Corporate Working Uniform",
        corporateFlightDutyUniform: "Corporate Flight Duty Uniform",
        corporateFieldUniform: "Corporate Field Uniform",

        OCPs: "OCPs",
    };

    const badgeArrays = {
        serviceBadges: "Service Badges",
        aviationBadges: "Aviation Badges",
        occupationalBadges: "Occupational Badges",
        commandInsigniaPin: "Command Insignia Pin",

        //abus
        ncsaPatches: "NCSA Patches",
        patches: "Patches",
        
        //blues
        shoulderCords: "Shoulder Cords",
        specialtyTrackBadges: "Specialty Track Badges",
        cadetBadges: "Cadet Badges",
    };

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

    function renderUniformItems(gender) {
        clearElement(container);

        if (!uniform?.value) return; // nothing selected

        const selectedUniform = uniform.value.toLowerCase();

        // Only loop through arrays that match this uniform
        Object.entries(badgeArrays).forEach(([arrayKey, displayName]) => {
            const arrayItems = (uniformData[arrayKey] || []).filter(item => {
                // check if item is for this uniform
                if (item.uniformCategory && !item.uniformCategory.toLowerCase().includes(selectedUniform)) {
                    return false;
                }

                // check wearer (cadet/senior)
                if (item.wearer !== "All" && item.wearer !== member.value) {
                    return false;
                }

                // check gender
                if (item.gender && item.gender !== gender && item.gender !== "unisex") {
                    return false;
                }

                return true;
            });

            if (!arrayItems.length) return;

            const header = document.createElement("h4");
            header.textContent = displayName;
            container.appendChild(header);

            // Group by "group"
            const groupedData = arrayItems.reduce((acc, item) => {
                if (!acc[item.group]) acc[item.group] = [];
                acc[item.group].push(item);
                return acc;
            }, {});

            Object.entries(groupedData).forEach(([groupName, items]) => {
                const wrapper = document.createElement("div");
                wrapper.classList.add("form-group");

                if (items.length > 1) {
                    const label = document.createElement("label");
                    label.textContent = groupName;
                    wrapper.appendChild(label);
                    wrapper.appendChild(document.createElement("br"));

                    const select = document.createElement("select");

                    // Placeholder
                    const placeholder = document.createElement("option");
                    placeholder.value = "";
                    placeholder.textContent = `Select ${groupName}`;
                    placeholder.selected = true;
                    select.appendChild(placeholder);

                    // Group by subgroup
                    const groupedItems = items.reduce((acc, item) => {
                        const group = item.group || "Other";
                        if (!acc[group]) acc[group] = [];
                        acc[group].push(item);
                        return acc;
                    }, {});

                    Object.entries(groupedItems).forEach(([subGroup, subItems]) => {
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
                    // Single checkbox fallback
                    const item = items[0];
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

    // When member type changes, update grades & uniforms
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

    // When uniform changes, update gender
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
        if (!isFlightSuit(uniformObj)) genderSelect.value = 'male';
        else genderSelect.selectedIndex = 1;

        // Trigger after setting the gender
        genderSelect.dispatchEvent(new Event('change'));
    });

    // When gender changes, render the items
    genderSelect.addEventListener('change', () => {
        const member = memberSelect.value;
        const gender = genderSelect.value;
        if (!gender) {
            clearElement(container);
            return;
        }
        renderUniformItems(member, gender);
    });

    // Initialize member types
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

    // Form submit
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
