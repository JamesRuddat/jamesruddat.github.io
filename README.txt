uniformData.js → static data lists.

uniformLogic.js → rules for what badges/pins/insignia apply to which uniforms. fills dropdowns from uniformData.js.

uniformImage.js → takes results and visually builds the uniform.




exaple
export const memberTypes = [
    { group: "Member Types", value: "cadet", label: "Cadet", level: null, img: null },
    { group: "Member Types", value: "adult", label: "Adult", level: null, img: null },
];

export const cadetGrades = [
    { group: "Cadet Grades", value: "cadet_airman_basic", label: "Cadet Airman Basic (C/AB)", level: null, img: null },
]

export const seniorGrades = [
    { group: "Senior Grades", value: "senior_member_no_grade", label: "Senior Member (No Grade)", level: null, img: null },
];

export const intergroupUniforms = [
    { group: "Intergroup Uniforms", value: "class_a", label: "Service Dress Uniform (Class A)", level: null, img: null },
];

export const seniorUniforms = [
    { group: "Senior Uniforms", value: "mess_dress", label: "Mess Dress Uniform", level: null, img: null },
    { group: "Senior Uniforms", value: "corporate_semi_formal", label: "Corporate Semi-Formal Uniform", level: null, img: null },
    { group: "Senior Uniforms", value: "corporate_service_dress", label: "Corporate Service Dress Uniform", level: null, img: null },
    { group: "Senior Uniforms", value: "corporate_working", label: "Corporate Working Uniform", level: null, img: null },
];

export const cadetUniforms = [
    { group: "Cadet Uniforms", value: "semi_formal_dress", label: "Semi-Formal Dress Uniform", level: null, img: null },
    { group: "Cadet Uniforms", value: "hgu", label: "Honor Guard Uniform", level: null, img: null },
];

export const uniformNameplates = [
    { group: "Uniform Nameplates", value: "blazer_nameplate", label: "Blazer Nameplate", level: null, img: null },
    { group: "Uniform Nameplates", value: "brush_silver_nameplate", label: "Brush Silver Nameplate", level: null, img: null },
];

export const uniformCollarInsignia = [
    { group: "Uniform Collar Insignia", value: "cap", label: "CAP (Cadet Officers)", level: null, img: "cap.png" },
    { group: "Uniform Collar Insignia", value: "cap_nco", label: "CAP (Cadet NCOs)", level: null, img: "cap_nco.png" },
    { group: "Uniform Collar Insignia", value: "us", label: "US (Officers)", level: null, img: "us.png" },
    { group: "Uniform Collar Insignia", value: "us_nco", label: "US (NCOs)", level: null, img: "us_nco.png" },
];

export const uniformSexTypes = [
    { group: "Uniform Sex Types", value: "male", label: "Male", level: null, img: "male.png" },
    { group: "Uniform Sex Types", value: "female", label: "Female", level: null, img: "female.png" },
    { group: "Uniform Sex Types", value: "unisex", label: "Unisex", level: null, img: "unisex.png" },
];

export const serviceBadges = [
    { group: "Service Badges", value: "csag", label: "CAP Senior Advisory Group Badge", level: null, img: "csag.png" },
    { group: "Service Badges", value: "cc", label: "CAP Command Council Badge", level: null, img: "cc.png" },
];

export const commandInsigniaPin = [
    { group: "Command Insignia Pin", value: "cgc", label: "Current Group Commander", level: null, img: "cgc.png" },
];

export const aviationBadges = [
    { group: "Pilot", value: "pilot", label: "Pilot", level: "basic", img: "pilot_basic.png" },
    { group: "Pilot", value: "senior_pilot", label: "Senior Pilot", level: "senior", img: "pilot_senior.png" },
    { group: "Pilot", value: "command_pilot", label: "Command Pilot", level: "command", img: "pilot_command.png" },

    { group: "Cadet sUAS Badge", value: "cadet_suas_badge", label: "Cadet sUAS Badge", level: null, img: "cadet_suas_badge.png" },
    { group: "Cadet Model Rocketry Badge", value: "cadet_model_rocketry_badge", label: "Cadet Model Rocketry Badge", level: null, img: "cadet_model_rocketry.png" },
];

export const occupationalBadges = [
    { group: "Chaplain Insignia", value: "chaplaininsignia_jewish", label: "Chaplain Insignia - Jewish", level: null, img: "chaplain_jewish.png" },
    { group: "Chaplain Insignia", value: "chaplaininsignia_christian", label: "Chaplain Insignia - Christian", level: null, img: "chaplain_christian.png" },
    { group: "Chaplain Insignia", value: "chaplaininsignia_buddhist", label: "Chaplain Insignia - Buddhist", level: null, img: "chaplain_buddhist.png" },
    { group: "Chaplain Insignia", value: "chaplaininsignia_muslim", label: "Chaplain Insignia - Muslim", level: null, img: "chaplain_muslim.png" },

    { group: "Medical", value: "medical_officer_badge", label: "Medical Officer Badge", level: null, img: "medical_officer.png" },
    { group: "Medical", value: "nurse_officer_badge", label: "Nurse Officer Badge", level: null, img: "nurse_officer.png" },

    { group: "Legal", value: "legal_officer_badge", label: "Legal Officer Badge", level: null, img: "legal_officer.png" },

];

export const specialtyTrackBadges = [
    { group: "Personnel", value: "personnel_badge_technician", label: "Personnel Badge - Technician", level: "technician", img: "personnel_technician.png" },
    { group: "Personnel", value: "personnel_badge_senior", label: "Personnel Badge - Senior", level: "senior", img: "personnel_senior.png" },
    { group: "Personnel", value: "personnel_badge_master", label: "Personnel Badge - Master", level: "master", img: "personnel_master.png" },

];

export const additionalBadges = [
    { group: "NRA Marksmanship", value: "nra_distinguished_expert", label: "NRA Distinguished Expert Badge", level: "distinguished", img: "nra_distinguished.png" },
];

export const patches = [
    { group: "Patches", value: "american_flag_patch", label: "American Flag Patch", level: null, img: "american_flag_patch.png" },
];

export const ncsaPatches = [
    { group: "NCSA Patches", value: "air_force_space_command_familiarization_course", label: "Air Force Space Command Familiarization Course", level: null, img: "af_space_command_familiarization.png" },
];

export const shoulderCords = [
    { group: "Shoulder Cords", value: "gold", label: "Gold - National Cadet Advisory Council", level: null, img: "gold_cord.png" },
];