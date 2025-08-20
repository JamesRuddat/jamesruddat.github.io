import * as uniformData from '/js/data/uniformData.js';

export function getGrades(members) {
    const groups = members === 'Cadet'
        ? ['Cadet Grades']
        : ['Officer Grades', 'NCO Grades', 'Flight Officer Grades', 'Senior Grades'];

    return uniformData.grades.filter(u => groups.includes(u.group));
}

export function getUniforms(members) {
    const groups = members === 'Cadet'
        ? ['Cadet Uniforms', 'USAF Uniforms', '18+ Uniforms']
        : ['Senior Uniforms', 'USAF Uniforms', '18+ Uniforms'];

    return uniformData.uniforms.filter(u => groups.includes(u.group));
}

export function isFlightSuit(uniformObj) {
    return uniformObj && uniformObj.uniformCategory === 'flight';
}

export function getGenders(uniformObj) {
    if (uniformObj.uniformCategory === 'flight') {
        return [{ value: 'unisex', label: 'Unisex' }];
    }
    
    return uniformData.genders.filter(u => "Gender Type".includes(u.group));
}

export function getBadgesAndPatches(uniformObj) {
    const category = uniformObj?.uniformCategory;
    const result = {
        specialtyTrackBadges: [],
        aviationBadges: [],
        occupationalBadges: [],
        ncsaPatches: [],
        patches: []
    };

    if (category === 'badge') {
        result.specialtyTrackBadges = uniformData.specialtyTrackBadges;
        result.aviationBadges = uniformData.aviationBadges;
        result.occupationalBadges = uniformData.occupationalBadges;
    }

    if (category === 'patch') {
        result.ncsaPatches = uniformData.ncsaPatches;
        result.patches = uniformData.patches;
    }

    if (category === 'flight') {
        result.ncsaPatches = uniformData.ncsaPatches;
    }

    return result;
}
