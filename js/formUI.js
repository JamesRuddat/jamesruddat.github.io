import * as uniformData from '/js/uniformData.js';
import { getGradesForMemberType, getUniformsForMemberType, getGendersForUniform, getBadgesAndPatchesForUniform, isFlightSuit } from '/js/uniformLogic.js';

document.addEventListener('DOMContentLoaded', () => {
    const memberTypeSelect = document.getElementById('member-type');
    const gradeSelect = document.getElementById('grade-type');
    const uniformSelect = document.getElementById('uniform-type');
    const genderSelect = document.getElementById('gender-type');

    // Badge/Patch containers
    const badgeTable = document.getElementById('badgeTable');
    const aviationBadgesTable = document.getElementById('aviationBadgesTable');
    const occupationalBadgesTable = document.getElementById('occupationalBadgesTable');
    const ncsaPatchesTable = document.getElementById('ncsaPatchesTable');

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

    function renderBadgeCategory(container, items) {
        clearElement(container);
        if (Array.isArray(items) && items.length > 0) {
            items.forEach(item => {
                const row = document.createElement('tr');
                const cell = document.createElement('td');
                cell.textContent = item.label;
                row.appendChild(cell);
                container.appendChild(row);
            });
        }
    }

    function renderBadgesAndPatches(badgeConfig) {
        renderBadgeCategory(badgeTable, badgeConfig.specialtyTrackBadges);
        renderBadgeCategory(aviationBadgesTable, badgeConfig.aviationBadges);
        renderBadgeCategory(occupationalBadgesTable, badgeConfig.occupationalBadges);
        renderBadgeCategory(ncsaPatchesTable, badgeConfig.ncsaPatches);
    }

    // When member type changes, load grades & uniforms
    memberTypeSelect.addEventListener('change', () => {
        const memberType = memberTypeSelect.value;
        if (!memberType) {
            populateSelect(gradeSelect, [], true, 'Select Member First');
            populateSelect(uniformSelect, [], true, 'Select Member Type First');
            populateSelect(genderSelect, [], true, 'Select Uniform First');
            return;
        }
        const grades = getGradesForMemberType(memberType);
        const uniforms = getUniformsForMemberType(memberType);
        populateSelect(gradeSelect, grades, true, 'Select Grade');
        populateSelect(uniformSelect, uniforms, true, 'Select Uniform');
        populateSelect(genderSelect, [], true, 'Select Uniform First');
    });

    // When uniform changes, load genders and badges/patches
    uniformSelect.addEventListener('change', () => {
        const memberType = memberTypeSelect.value;
        const uniformValue = uniformSelect.value;
        if (!uniformValue) {
            populateSelect(genderSelect, [], true, 'Select Uniform First');
            clearElement(badgeTable);
            clearElement(aviationBadgesTable);
            clearElement(occupationalBadgesTable);
            clearElement(ncsaPatchesTable);
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

        const badgeConfig = getBadgesAndPatchesForUniform(uniformObj);
        renderBadgesAndPatches(badgeConfig);
    });

    // On page load, initialize member types and defaults
    populateSelect(memberTypeSelect, uniformData.memberTypes, true, 'Select Member');
    if (memberTypeSelect.options.length > 1) {
        memberTypeSelect.selectedIndex = 1;
    }
    memberTypeSelect.dispatchEvent(new Event('change'));


    const form = document.getElementById('uniformForm');

    form.addEventListener('submit', (e) => {
        e.preventDefault(); // prevent actual form submission

        const gradeValue = document.getElementById('grade').value;
        // Find full grade object by value
        const gradeObj = uniformData.grades.find(g => g.value === gradeValue);
        const gradeImg = gradeObj ? gradeObj.img : null;

        const selections = {
            memberType: document.getElementById('memberType').value,
            grade: gradeObj ? gradeObj.label : gradeValue,
            gradeImg: gradeImg,
            uniformType: document.getElementById('uniformType').value,
            genderType: document.getElementById('genderType').value,
            serviceBadges: document.getElementById('serviceBadges').value,
            commandInsigniaPin: document.getElementById('commandInsigniaPin').value,
            aviationBadges: document.getElementById('aviationBadgesContainer').textContent.trim(),
            shoulderCords: document.getElementById('shoulderCords').value,
            patches: document.getElementById('patches').value,
            ncsaPatches: document.getElementById('ncsaPatchesContainer').textContent.trim(),
        };

        // Save to sessionStorage
        sessionStorage.setItem('uniformSelections', JSON.stringify(selections));

        // Redirect
        window.location.href = '/uniform.html';
    });
});
