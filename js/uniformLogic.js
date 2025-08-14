import * as uniformData from '/js/uniformData.js';

export function getGradesForMemberType(memberType) {
    const groups = memberType === 'cadet'
        ? ['Cadet Grades']
        : ['Senior Grades'];

    return uniformData.allGrades.filter(u => groups.includes(u.group));
}

export function getUniformsForMemberType(memberType) {
    const groups = memberType === 'cadet'
        ? ['Cadet Uniforms', 'Base Uniforms']
        : ['Senior Uniforms', 'Base Uniforms'];

    return uniformData.allUniforms.filter(u => groups.includes(u.group));
}

export function isFlightSuit(uniformObj) {
    return uniformObj && uniformObj.uniformCategory === 'flight';
}

export function getGendersForUniform(uniformObj) {
    if (uniformObj.uniformCategory === 'flight') {
        return [{ value: 'unisex', label: 'Unisex' }];
    }
    
    return uniformData.genderTypes.filter(u => "Gender Type".includes(u.group));
}

export function getBadgesAndPatchesForUniform(uniformObj) {
    const category = uniformObj?.uniformCategory;
    const result = {
        specialtyTrackBadges: [],
        aviationBadges: [],
        occupationalBadges: [],
        ncsaPatches: []
    };

    if (category === 'badge') {
        result.specialtyTrackBadges = uniformData.specialtyTrackBadges;
        result.aviationBadges = uniformData.aviationBadges;
        result.occupationalBadges = uniformData.occupationalBadges;
    }

    if (category === 'patch') {
        result.ncsaPatches = uniformData.ncsaPatches;
    }

    if (category === 'flight') {
        result.ncsaPatches = uniformData.ncsaPatches;
    }

    return result;
}
