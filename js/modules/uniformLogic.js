import * as uniformData from '/js/libraries/uniformData.js';

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
