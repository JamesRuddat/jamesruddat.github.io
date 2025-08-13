import * as uniformData from '/js/uniformData.js';
import { getGradesForMemberType, getUniformsForMemberType, getGendersForUniform, getBadgesAndPatchesForUniform, isFlightSuit } from '/js/uniformLogic.js';

document.addEventListener('DOMContentLoaded', () => {
    const memberTypeSelect = document.getElementById('member-type');
    const gradeSelect = document.getElementById('grade-type');
    const uniformSelect = document.getElementById('uniform-type');
    const genderSelect = document.getElementById('gender-type');

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

    // Map of arrays to their display names
    const allDataArrays = {
        memberTypes: "Member Types",
        cadetGrades: "Cadet Grades",
        seniorGrades: "Senior Grades",
        intergroupUniforms: "Intergroup Uniforms",
        cadetUniforms: "Cadet Uniforms",
        seniorUniforms: "Senior Uniforms",
        nameplates: "Nameplates",
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

    const uniformArrays = {
        serviceBadges: "Service Badges",
        aviationBadges: "Aviation Badges",
        occupationalBadges: "Occupational Badges",
        ncsaPatches: "NCSA Patches",
        patches: "Patches",
        commandInsigniaPin: "Command Insignia Pin",
        shoulderCords: "Shoulder Cords",
        specialtyTrackBadges: "Specialty Track Badges"
    };

    const container = document.getElementById("form-container");

    Object.entries(uniformArrays).forEach(([arrayKey, displayName]) => {
        const arrayItems = uniformData[arrayKey] || [];
        if (!arrayItems.length) return; // skip empty arrays

        // Create header for this array
        const header = document.createElement("h4");
        header.textContent = displayName;
        container.appendChild(header);

        // Group items by "group"
        const groupedData = arrayItems.reduce((acc, item) => {
            if (!acc[item.group]) acc[item.group] = [];
            acc[item.group].push(item);
            return acc;
        }, {});

        // Render each group
        Object.entries(groupedData).forEach(([groupName, items]) => {
            const wrapper = document.createElement("div");
            wrapper.classList.add("form-group");

            if (items.length > 1) {
                const label = document.createElement("label");
                label.textContent = groupName;
                wrapper.appendChild(label);
                wrapper.appendChild(document.createElement("br"));

                const select = document.createElement("select");
                // Add generic placeholder
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


    // When member type changes, load grades & uniforms
    memberTypeSelect.addEventListener('change', () => {
        const memberType = memberTypeSelect.value;
        if (!memberType) {
            populateSelect(gradeSelect, [], true, 'Select Member First');
            populateSelect(uniformSelect, [], true, 'Select Member First');
            populateSelect(genderSelect, [], true, 'Select Uniform First');
            return;
        }
        const grades = getGradesForMemberType(memberType);
        const uniforms = getUniformsForMemberType(memberType);
        populateSelect(gradeSelect, grades, true, 'Select Grade');
        populateSelect(uniformSelect, uniforms, true, 'Select Uniform');
        populateSelect(genderSelect, [], true, 'Select Gender');
    });

    // When uniform changes, load genders and badges/patches
    uniformSelect.addEventListener('change', () => {
        const memberType = memberTypeSelect.value;
        const uniformValue = uniformSelect.value;
        if (!uniformValue) {
            populateSelect(genderSelect, [], true, 'Select Gender');
            return;
        }
        const uniforms = getUniformsForMemberType(memberType);
        const uniformObj = uniforms.find(u => u.value === uniformValue);
        if (!uniformObj) {
            populateSelect(genderSelect, [], true, 'Select Uniform First');
            return;
        }
        // get genders & badges/patches from uniform logic
        const genders = getGendersForUniform(uniformObj);
        populateSelect(genderSelect, genders, true, 'Select Gender');

        // default gender male if not flight suit
        if (!isFlightSuit(uniformObj)) {
            genderSelect.value = 'male';
        }
    });

    // On page load, initialize member types and defaults
    populateSelect(memberTypeSelect, uniformData.memberTypes, true, 'Select Member');
    if (memberTypeSelect.options.length > 1) {
        memberTypeSelect.selectedIndex = 1;
    }
    memberTypeSelect.dispatchEvent(new Event('change'));


    //--- GRAB UNIFORM selections AND ADD IT TO sessionStorage ---
    // Create a lookup map: value → full object
    const itemMap = {};
    
    // Loop through all uniform arrays
    Object.keys(allDataArrays).forEach(arrayKey => {
        const arrayItems = uniformData[arrayKey] || [];
        arrayItems.forEach(item => {
            itemMap[item.value] = item;
        });
    });


    const form = document.getElementById('uniform-form');

    form.addEventListener('submit', (e) => {
        e.preventDefault(); // prevent actual form submission

        const selectedObjects = [];

        // Collect selected values from all selects
        document.querySelectorAll('select').forEach(select => {
            if (select.value) {
                const item = itemMap[select.value];
                if (item) selectedObjects.push(item);
            }
        });

        // Collect checked checkboxes
        document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
            if (checkbox.checked) {
                const item = itemMap[checkbox.value];
                if (item) selectedObjects.push(item);
            }
        });

        // Save the full objects to sessionStorage
        sessionStorage.setItem('uniformSelections', JSON.stringify(selectedObjects));

        // Redirect to next page
        window.location.href = '/capPages/uniform.html';
    });
});
