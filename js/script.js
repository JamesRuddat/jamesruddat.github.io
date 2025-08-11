import { setupUniformSelectors } from './uniformLogic.js';

document.addEventListener('DOMContentLoaded', () => {
    setupUniformSelectors({
        memberTypeSelect: document.getElementById('memberType'),
        gradeSelect: document.getElementById('grade'),
        uniformSelect: document.getElementById('uniformType'),
        genderSelect: document.getElementById('genderType'),
        serviceBadgesSelect: document.getElementById('serviceBadges'),
        commandInsigniaPinSelect: document.getElementById('commandInsigniaPin'),
        aviationBadgesSelect: document.getElementById('aviationBadges'),
        shoulderCordsSelect: document.getElementById('shoulderCords'),
        patchesSelect: document.getElementById('patches'),
        ncsaPatchesSelect: document.getElementById('ncsaPatches'),
    });
});
