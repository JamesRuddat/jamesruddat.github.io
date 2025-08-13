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

    // Combine all arrays from uniformData into a single array
    const allItems = [
        ...(uniformData.memberTypes || []),
        ...(uniformData.cadetGrades || []),
        ...(uniformData.seniorGrades || []),
        ...(uniformData.intergroupUniforms || []),
        ...(uniformData.cadetUniforms || []),
        ...(uniformData.seniorUniforms || []),
        ...(uniformData.uniformNameplates || []),
        ...(uniformData.uniformCollarInsignia || []),
        ...(uniformData.uniformSexTypes || []),

        ...(uniformData.serviceBadges || []),
        ...(uniformData.aviationBadges || []),
        ...(uniformData.occupationalBadges || []),
        ...(uniformData.ncsaPatches || []),
        ...(uniformData.patches || []),
        ...(uniformData.commandInsigniaPin || []),
        ...(uniformData.shoulderCords || []),
        ...(uniformData.specialtyTrackBadges || [])
    ];

    // Group the items by "group"
    const groupedData = allItems.reduce((acc, item) => {
        if (!acc[item.group]) acc[item.group] = [];
        acc[item.group].push(item);
        return acc;
    }, {});
    
    //create form with slelections for items
    const container = document.getElementById("form-container");

    Object.entries(groupedData).forEach(([groupName, items]) => {
        const wrapper = document.createElement("div");
        wrapper.classList.add("form-group");

        if (items.length > 1) {
            // Multiple items → dropdown
            const label = document.createElement("label");
            label.textContent = groupName + " ";
            const br = document.createElement("br");
            const select = document.createElement("select");

            // Add generic placeholder as first option
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

            wrapper.appendChild(label);
            wrapper.appendChild(br);
            wrapper.appendChild(select);
        } else {
            // Only one item → checkbox
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









    const form = document.getElementById('uniform-form');

    form.addEventListener('submit', (e) => {
        e.preventDefault(); // prevent actual form submission

        const selections = {
            memberType: document.getElementById('member-type').value,
            grade: document.getElementById('grade').value,
            uniformType: document.getElementById('uniform-type').value,
            genderType: document.getElementById('gender-type').value,
        };

        // Save to sessionStorage
        sessionStorage.setItem('uniformSelections', JSON.stringify(selections));

        // Redirect
        window.location.href = '/capPages/uniform.html';
    });
});
