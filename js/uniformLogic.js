import * as uniformData from '/js/uniformData.js';

document.addEventListener('DOMContentLoaded', () => {
    const memberTypeSelect = document.getElementById('memberType');
    const gradeSelect = document.getElementById('grade');
    const uniformSelect = document.getElementById('uniformType');
    const genderTypeSelect = document.getElementById('genderType');

    const serviceBadgesSelect = document.getElementById('serviceBadges');
    const commandInsigniaPinSelect = document.getElementById('commandInsigniaPin');
    const specialtyTrackBadgesSelect = document.getElementById('specialtyTrackBadges');
    const shoulderCordsSelect = document.getElementById('shoulderCords');
    const patchesSelect = document.getElementById('patches');

    // Containers for checkbox groups (no selects here)
    const aviationBadgesContainer = document.getElementById('aviationBadgesContainer');
    const occupationalBadgesContainer = document.getElementById('occupationalBadgesContainer');
    const ncsaPatchesContainer = document.getElementById('ncsaPatchesContainer');

    // Form element
    const form = document.getElementById('uniformForm');

    function populateSelect(selectElem, options) {
        selectElem.innerHTML = '';
        options.forEach(opt => {
            const option = document.createElement('option');
            option.value = opt.value || opt;
            option.textContent = opt.label || opt;
            selectElem.appendChild(option);
        });
    }

    function populateWithDefault(selectElem, options) {
        selectElem.innerHTML = '';
        const defaultOption = document.createElement('option');
        defaultOption.value = '';
        defaultOption.textContent = 'None / Select';
        selectElem.appendChild(defaultOption);

        options.forEach(opt => {
            const option = document.createElement('option');
            option.value = opt.value;
            option.textContent = opt.label;
            selectElem.appendChild(option);
        });
    }

    function showDisplay(elem, show) {
        elem.style.display = show ? 'inline-block' : 'none';
    }

    function clearItemSelects() {
        serviceBadgesSelect.innerHTML = '';
        commandInsigniaPinSelect.innerHTML = '';
        specialtyTrackBadgesSelect.innerHTML = '';
        shoulderCordsSelect.innerHTML = '';
        patchesSelect.innerHTML = '';

        aviationBadgesContainer.innerHTML = '';
        occupationalBadgesContainer.innerHTML = '';
        ncsaPatchesContainer.innerHTML = '';
    }

    function populateCheckboxes(containerElem, options, groupName) {
        containerElem.innerHTML = ''; // clear previous

        options.forEach(opt => {
            const checkboxId = `${groupName}_${opt.value}`;

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.id = checkboxId;
            checkbox.name = groupName;
            checkbox.value = opt.value;

            const label = document.createElement('label');
            label.htmlFor = checkboxId;
            label.textContent = opt.label;

            const wrapper = document.createElement('div');
            wrapper.appendChild(checkbox);
            wrapper.appendChild(label);

            containerElem.appendChild(wrapper);
        });
    }

    function populateBadgeAndPatchSelects(uniformCategory) {
        clearItemSelects();

        const showBadges = uniformCategory === 'badge' || uniformCategory === 'flight';
        const showPatches = uniformCategory === 'patch' || uniformCategory === 'flight';

        if (showBadges) {
            populateWithDefault(serviceBadgesSelect, uniformData.serviceBadges);
            populateWithDefault(commandInsigniaPinSelect, uniformData.commandInsigniaPin);
            populateWithDefault(specialtyTrackBadgesSelect, uniformData.specialtyTrackBadges);
            populateWithDefault(shoulderCordsSelect, uniformData.shoulderCords);

            populateCheckboxes(aviationBadgesContainer, uniformData.aviationBadges, 'aviationBadges');
            populateCheckboxes(occupationalBadgesContainer, uniformData.occupationalBadges, 'occupationalBadges');
        }

        if (showPatches) {
            populateWithDefault(patchesSelect, uniformData.patches);
            populateCheckboxes(ncsaPatchesContainer, uniformData.ncsaPatches, 'ncsaPatches');
        }

        showDisplay(serviceBadgesSelect, showBadges);
        showDisplay(commandInsigniaPinSelect, showBadges);
        showDisplay(specialtyTrackBadgesSelect, showBadges);
        showDisplay(shoulderCordsSelect, showBadges);
        showDisplay(aviationBadgesContainer, showBadges);
        showDisplay(occupationalBadgesContainer, showBadges);

        showDisplay(patchesSelect, showPatches);
        showDisplay(ncsaPatchesContainer, showPatches);
    }

    function updateGradeAndUniforms() {
        const memberType = memberTypeSelect.value;

        if (!memberType) {
            gradeSelect.innerHTML = '<option value="">Select Member Type</option>';
            uniformSelect.innerHTML = '<option value="">Select Member Type</option>';
            genderTypeSelect.innerHTML = '<option value="">Select Uniform Type</option>';
            clearItemSelects();
            hideAllBadgeAndPatchSelects(true);
            return;
        }

        const grades = memberType === 'cadet' ? uniformData.cadetGrades : uniformData.seniorGrades;
        const uniforms = memberType === 'cadet'
            ? [...uniformData.intergroupUniforms, ...uniformData.cadetUniforms]
            : [...uniformData.intergroupUniforms, ...uniformData.seniorUniforms];

        populateSelect(gradeSelect, grades);
        populateSelect(uniformSelect, uniforms);

        genderTypeSelect.innerHTML = '<option value="">Select Uniform Type</option>';
        clearItemSelects();
        hideAllBadgeAndPatchSelects(true);
    }

    function updateGenderAndBadges() {
        const uniformValue = uniformSelect.value;
        const memberType = memberTypeSelect.value;
        const uniforms = memberType === 'cadet'
            ? [...uniformData.intergroupUniforms, ...uniformData.cadetUniforms]
            : [...uniformData.intergroupUniforms, ...uniformData.seniorUniforms];

        const uniformObj = uniforms.find(u => u.value === uniformValue);

        if (!uniformObj) {
            genderTypeSelect.innerHTML = '<option value="">Select Uniform Type</option>';
            clearItemSelects();
            hideAllBadgeAndPatchSelects(true);
            return;
        }

        if (uniformObj.uniformCategory === 'flight') {
            populateSelect(genderTypeSelect, [{ value: 'unisex', label: 'Unisex' }]);
        } else {
            populateSelect(genderTypeSelect, uniformData.uniformSexTypes);
        }

        populateBadgeAndPatchSelects(uniformObj.uniformCategory);
    }

    function hideAllBadgeAndPatchSelects(hide) {
        const displayStyle = hide ? 'none' : 'inline-block';

        serviceBadgesSelect.style.display = displayStyle;
        commandInsigniaPinSelect.style.display = displayStyle;
        specialtyTrackBadgesSelect.style.display = displayStyle;
        shoulderCordsSelect.style.display = displayStyle;
        patchesSelect.style.display = displayStyle;

        aviationBadgesContainer.style.display = displayStyle;
        occupationalBadgesContainer.style.display = displayStyle;
        ncsaPatchesContainer.style.display = displayStyle;
    }

    // Event listeners
    memberTypeSelect.addEventListener('change', () => {
        updateGradeAndUniforms();
        uniformSelect.value = '';
        genderTypeSelect.innerHTML = '<option value="">Select Uniform Type</option>';
        clearItemSelects();
        hideAllBadgeAndPatchSelects(true);
    });

    uniformSelect.addEventListener('change', () => {
        updateGenderAndBadges();
    });

    // Initialize
    updateGradeAndUniforms();
    hideAllBadgeAndPatchSelects(true);

    // Helper to get checked values from checkboxes
    function getCheckedValues(groupName) {
        return [...document.querySelectorAll(`input[name="${groupName}"]:checked`)].map(cb => cb.value);
    }

    // Form submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const selections = {
            memberType: memberTypeSelect.value,
            grade: gradeSelect.value,
            uniformType: uniformSelect.value,
            genderType: genderTypeSelect.value,
            serviceBadges: serviceBadgesSelect.value,
            commandInsigniaPin: commandInsigniaPinSelect.value,
            aviationBadges: getCheckedValues('aviationBadges'),
            occupationalBadges: getCheckedValues('occupationalBadges'),
            specialtyTrackBadges: specialtyTrackBadgesSelect.value,
            shoulderCords: shoulderCordsSelect.value,
            patches: patchesSelect.value,
            ncsaPatches: getCheckedValues('ncsaPatches'),
        };

        sessionStorage.setItem('uniformSelections', JSON.stringify(selections));
        window.location.href = 'uniform.html';
    });
});
