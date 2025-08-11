import * as uniformData from '/js/uniformData.js';

document.addEventListener('DOMContentLoaded', () => {
    // DOM elements
    const memberTypeSelect = document.getElementById('memberType');
    const gradeSelect = document.getElementById('grade');
    const uniformSelect = document.getElementById('uniformType');
    const genderTypeSelect = document.getElementById('genderType');

    const badgeTable = document.getElementById('badgeTable'); // specialty track badge selects

    const aviationBadgesTable = document.getElementById('aviationBadgesTable');   // checkboxes/selects
    const occupationalBadgesTable = document.getElementById('occupationalBadgesTable');
    const ncsaPatchesTable = document.getElementById('ncsaPatchesTable');

    // Clear element children helper
    function clearElement(elem) {
        while (elem.firstChild) elem.removeChild(elem.firstChild);
    }

    // Group array items by key helper
    function groupBy(array, key) {
        return array.reduce((result, item) => {
            (result[item[key]] = result[item[key]] || []).push(item);
            return result;
        }, {});
    }

    // Populate select with grouped options helper
    function populateGroupedSelect(selectElem, options, includeDefault = false, defaultText = 'Select...') {
        clearElement(selectElem);
        if (includeDefault) {
            const defaultOption = document.createElement('option');
            defaultOption.value = '';
            defaultOption.textContent = defaultText;
            selectElem.appendChild(defaultOption);
        }
        const groups = groupBy(options, 'group');
        Object.entries(groups).forEach(([groupName, groupItems]) => {
            if (groupItems.length === 1) {
                // Single option, no optgroup
                const option = document.createElement('option');
                option.value = groupItems[0].value;
                option.textContent = groupItems[0].label;
                selectElem.appendChild(option);
            } else {
                // Multiple items, use optgroup
                const optgroup = document.createElement('optgroup');
                optgroup.label = groupName;
                groupItems.forEach(item => {
                    const option = document.createElement('option');
                    option.value = item.value;
                    option.textContent = item.label;
                    optgroup.appendChild(option);
                });
                selectElem.appendChild(optgroup);
            }
        });
    }

    // Build selects for specialty track badges (levels)
    function buildBadgeRow(badgeList) {
        clearElement(badgeTable);
        const tr = document.createElement('tr');
        badgeList.forEach(badge => {
            const td = document.createElement('td');
            const label = document.createElement('label');
            label.htmlFor = badge.value;
            label.textContent = badge.label;
            label.style.display = 'block';

            const select = document.createElement('select');
            select.id = badge.value;
            select.name = badge.value;
            // Use levels if badge has a level or standard levels
            const levels = ['basic', 'intermediate', 'advanced'];
            levels.forEach(level => {
                const option = document.createElement('option');
                option.value = level;
                option.textContent = level.charAt(0).toUpperCase() + level.slice(1);
                select.appendChild(option);
            });

            td.appendChild(label);
            td.appendChild(select);
            tr.appendChild(td);
        });
        badgeTable.appendChild(tr);
    }

    // Build checkbox group or select for badge/patch group
    function buildBadgeGroupControl(groupName, items) {
        if (items.length === 1) {
            // Single checkbox
            const tr = document.createElement('tr');
            const td = document.createElement('td');
            td.colSpan = 3;
            const checkboxId = `${groupName}_${items[0].value}`;
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.id = checkboxId;
            checkbox.name = groupName;
            checkbox.value = items[0].value;

            const label = document.createElement('label');
            label.htmlFor = checkboxId;
            label.textContent = items[0].label;

            td.appendChild(checkbox);
            td.appendChild(label);
            tr.appendChild(td);
            return tr;
        } else {
            // Multiple items, show a select dropdown inside a table row
            const tr = document.createElement('tr');
            const td = document.createElement('td');
            td.colSpan = 3;

            const label = document.createElement('label');
            label.textContent = groupName;
            label.style.fontWeight = 'bold';
            label.style.display = 'block';

            const select = document.createElement('select');
            select.name = groupName;
            select.id = groupName;
            const defaultOption = document.createElement('option');
            defaultOption.value = '';
            defaultOption.textContent = `Select ${groupName}`;
            select.appendChild(defaultOption);

            items.forEach(item => {
                const option = document.createElement('option');
                option.value = item.value;
                option.textContent = item.label;
                select.appendChild(option);
            });

            td.appendChild(label);
            td.appendChild(select);
            tr.appendChild(td);
            return tr;
        }
    }

    // Populate badge/patch tables based on uniform category
    function populateBadgeAndPatchTables(uniformCategory) {
        clearElement(badgeTable);
        clearElement(aviationBadgesTable);
        clearElement(occupationalBadgesTable);
        clearElement(ncsaPatchesTable);

        if (uniformCategory === 'badge' || uniformCategory === 'flight') {
            buildBadgeRow(uniformData.specialtyTrackBadges);

            // Aviation badges grouped by group name, build controls
            const aviationGroups = groupBy(uniformData.aviationBadges, 'group');
            Object.entries(aviationGroups).forEach(([group, items]) => {
                aviationBadgesTable.appendChild(buildBadgeGroupControl(group, items));
            });

            const occupationalGroups = groupBy(uniformData.occupationalBadges, 'group');
            Object.entries(occupationalGroups).forEach(([group, items]) => {
                occupationalBadgesTable.appendChild(buildBadgeGroupControl(group, items));
            });
        }

        if (uniformCategory === 'patch' || uniformCategory === 'flight') {
            const ncsaGroups = groupBy(uniformData.ncsaPatches, 'group');
            Object.entries(ncsaGroups).forEach(([group, items]) => {
                ncsaPatchesTable.appendChild(buildBadgeGroupControl(group, items));
            });
        }
    }

    // Update grade and uniform selects based on member type
    function updateGradeAndUniforms() {
        const memberType = memberTypeSelect.value;
        if (!memberType) {
            populateGroupedSelect(gradeSelect, [], true, 'Select Member Type First');
            populateGroupedSelect(uniformSelect, [], true, 'Select Member Type First');
            populateGroupedSelect(genderTypeSelect, [], true, 'Select Uniform Type First');
            clearElement(badgeTable);
            clearElement(aviationBadgesTable);
            clearElement(occupationalBadgesTable);
            clearElement(ncsaPatchesTable);
            return;
        }

        const grades = memberType === 'cadet' ? uniformData.cadetGrades : uniformData.seniorGrades;
        const uniforms = memberType === 'cadet'
            ? [...uniformData.intergroupUniforms, ...uniformData.cadetUniforms]
            : [...uniformData.intergroupUniforms, ...uniformData.seniorUniforms];

        populateGroupedSelect(gradeSelect, grades, true, 'Select Grade');
        populateGroupedSelect(uniformSelect, uniforms, true, 'Select Uniform');
        populateGroupedSelect(genderTypeSelect, [], true, 'Select Uniform First');

        clearElement(badgeTable);
        clearElement(aviationBadgesTable);
        clearElement(occupationalBadgesTable);
        clearElement(ncsaPatchesTable);
    }

    // Update gender and badge/patch displays based on selected uniform
    function updateGenderAndBadges() {
        const uniformValue = uniformSelect.value;
        const memberType = memberTypeSelect.value;

        if (!uniformValue) {
            populateGroupedSelect(genderTypeSelect, [], true, 'Select Uniform First');
            clearElement(badgeTable);
            clearElement(aviationBadgesTable);
            clearElement(occupationalBadgesTable);
            clearElement(ncsaPatchesTable);
            return;
        }

        const uniforms = memberType === 'cadet'
            ? [...uniformData.intergroupUniforms, ...uniformData.cadetUniforms]
            : [...uniformData.intergroupUniforms, ...uniformData.seniorUniforms];

        const uniformObj = uniforms.find(u => u.value === uniformValue);

        if (!uniformObj) {
            populateGroupedSelect(genderTypeSelect, [], true, 'Select Uniform First');
            clearElement(badgeTable);
            clearElement(aviationBadgesTable);
            clearElement(occupationalBadgesTable);
            clearElement(ncsaPatchesTable);
            return;
        }

        if (uniformObj.uniformCategory === 'flight') {
            populateGroupedSelect(genderTypeSelect, [{ value: 'unisex', label: 'Unisex' }]);
        } else {
            populateGroupedSelect(genderTypeSelect, uniformData.uniformSexTypes, true, 'Select Gender');
        }

        populateBadgeAndPatchTables(uniformObj.uniformCategory);
    }

    // Event listeners
    memberTypeSelect.addEventListener('change', updateGradeAndUniforms);
    uniformSelect.addEventListener('change', updateGenderAndBadges);

    // Initialize on page load with defaults
    // Populate member types
    populateGroupedSelect(memberTypeSelect, uniformData.memberTypes, true, 'Select Member Type');

    // Default to first actual option (skip the "Select..." placeholder)
    if (memberTypeSelect.options.length > 1) {
        memberTypeSelect.selectedIndex = 1;
    }
    updateGradeAndUniforms();

    // After grades/uniforms are populated, default them
    if (gradeSelect.options.length > 1) {
        gradeSelect.selectedIndex = 1;
    }
    if (uniformSelect.options.length > 1) {
        uniformSelect.selectedIndex = 1;
    }
    updateGenderAndBadges();

    // After genders are populated, default them
    if (genderTypeSelect.options.length > 1) {
        genderTypeSelect.selectedIndex = 1;
    }
});
