import * as uniformData from '/js/uniformData.js';
import { getGradesForMemberType, getUniformsForMemberType, getGendersForUniform, getBadgesAndPatchesForUniform, isFlightSuit } from '/js/uniformLogic.js';

document.addEventListener('DOMContentLoaded', () => {
    const memberTypeSelect = document.getElementById('member-type');
    const gradeSelect = document.getElementById('grade-type');
    const uniformSelect = document.getElementById('uniform-type');
    const genderSelect = document.getElementById('gender-type');
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
        ncsaPatches: "NCSA Patches",
        patches: "Patches",
        commandInsigniaPin: "Command Insignia Pin",
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
            selectElem.appendChild(opt);
        }
        options.forEach(optData => {
            const opt = document.createElement('option');
            opt.value = optData.value;
            opt.textContent = optData.label;
            selectElem.appendChild(opt);
        });
    }

    function renderUniformItems(memberType, gender) {
        clearElement(container);

        Object.entries(badgeArrays).forEach(([arrayKey, displayName]) => {
            const arrayItems = uniformData[arrayKey] || [];
            if (!arrayItems.length) return;

            // Filter by wearer and gender
            const filteredItems = arrayItems.filter(
                item => item.wearer === memberType || item.wearer === 'all'
            ).filter(
                item => !item.gender || item.gender === gender || item.gender === 'unisex'
            );

            if (!filteredItems.length) return;

            const header = document.createElement("h4");
            header.textContent = displayName;
            container.appendChild(header);

            // Group by "group"
            const groupedData = filteredItems.reduce((acc, item) => {
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
                    const placeholder = document.createElement("option");
                    placeholder.value = "";
                    placeholder.textContent = `Select ${groupName}`;
                    placeholder.selected = true;
                    select.appendChild(placeholder);

                    items.forEach(item => {
                        const option = document.createElement("option");
                        option.value = item.value;
                        option.textContent = item.label;
                        select.appendChild(option);
                    });

                    wrapper.appendChild(select);
                } else {
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
    memberTypeSelect.addEventListener('change', () => {
        const memberType = memberTypeSelect.value;
        if (!memberType) {
            populateSelect(gradeSelect, [], true, 'Select Member First');
            populateSelect(uniformSelect, [], true, 'Select Member First');
            populateSelect(genderSelect, [], true, 'Select Uniform First');
            clearElement(container);
            return;
        }

        const grades = getGradesForMemberType(memberType);
        const uniforms = getUniformsForMemberType(memberType);
        populateSelect(gradeSelect, grades, true, 'Select Grade');
        populateSelect(uniformSelect, uniforms, true, 'Select Uniform');
        populateSelect(genderSelect, [], true, 'Select Gender');
        clearElement(container);
    });

    // When uniform changes, update gender
    uniformSelect.addEventListener('change', () => {
        const memberType = memberTypeSelect.value;
        const uniformValue = uniformSelect.value;
        if (!uniformValue) {
            populateSelect(genderSelect, [], true, 'Select Gender');
            clearElement(container);
            return;
        }

        const uniforms = getUniformsForMemberType(memberType);
        const uniformObj = uniforms.find(u => u.value === uniformValue);
        if (!uniformObj) {
            populateSelect(genderSelect, [], true, 'Select Gender');
            clearElement(container);
            return;
        }

        const genders = getGendersForUniform(uniformObj);
        populateSelect(genderSelect, genders, true, 'Select Gender');

        // Default gender if not flight suit
        if (!isFlightSuit(uniformObj)) {
            genderSelect.value = 'male';
        } else {
            // select first available gender if not default
            genderSelect.selectedIndex = 1;
        }

        // Trigger the rendering after setting the gender
        const event = new Event('change');
        genderSelect.dispatchEvent(event);
    });

    // When gender changes, render the items
    genderSelect.addEventListener('change', () => {
        const memberType = memberTypeSelect.value;
        const gender = genderSelect.value;
        if (!gender) {
            clearElement(container);
            return;
        }

        renderUniformItems(memberType, gender);
    });

    // Initialize member types
    populateSelect(memberTypeSelect, uniformData.memberTypes, true, 'Select Member');
    memberTypeSelect.value = 'cadet';
    memberTypeSelect.dispatchEvent(new Event('change'));

    //--- Prepare sessionStorage itemMap ---
    const allDataArrays = {
        memberTypes: "Member Types",
        allGrades: "Grades",
        allUniforms: "Uniforms",
        allNameplates: "Nameplates",
        collarInsignia: "Collar Insignia",
        genderTypes: "Gender Types",
        serviceBadges: "Service Badges",
        aviationBadges: "Aviation Badges",
        occupationalBadges: "Occupational Badges",
        ncsaPatches: "NCSA Patches",
        patches: "Patches",
        commandInsigniaPin: "Command Insignia Pin",
        shoulderCords: "Shoulder Cords",
        specialtyTrackBadges: "Specialty Track Badges"
    };

    const itemMap = {};
    Object.keys(allDataArrays).forEach(arrayKey => {
        const arrayItems = uniformData[arrayKey] || [];
        arrayItems.forEach(item => {
            itemMap[item.value] = item;
        });
    });

    //--- Form submit ---
    const form = document.getElementById('uniform-form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const selectedObjects = [];

        document.querySelectorAll('select').forEach(select => {
            if (select.value) {
                const item = itemMap[select.value];
                if (item) selectedObjects.push(item);
            }
        });

        document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
            if (checkbox.checked) {
                const item = itemMap[checkbox.value];
                if (item) selectedObjects.push(item);
            }
        });

        sessionStorage.setItem('uniformSelections', JSON.stringify(selectedObjects));
        window.location.href = '/capPages/uniform.html';
    });
});
