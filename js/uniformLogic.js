import * as uniformData from '/js/uniformData.js';

export function getGradesForMemberType(memberType) {
    return memberType === 'cadet' ? uniformData.cadetGrades : uniformData.seniorGrades;
}

export function getUniformsForMemberType(memberType) {
    return memberType === 'cadet'
        ? [...uniformData.intergroupUniforms, ...uniformData.cadetUniforms]
        : [...uniformData.intergroupUniforms, ...uniformData.seniorUniforms];
}

export function isFlightSuit(uniformObj) {
    return uniformObj && uniformObj.uniformCategory === 'flight';
}

export function getGendersForUniform(uniformObj) {
    if (isFlightSuit(uniformObj)) {
        return [{ value: 'unisex', label: 'Unisex' }];
    }
    return uniformData.genderTypes;  // Male & Female
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
