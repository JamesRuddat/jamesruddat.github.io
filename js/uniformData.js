//types of items
/*
memberTypes
cadetGrades
seniorGrades
intergroupUniforms
cadetUniforms
seniorUniforms
nameplates
collarInsignia
genderTypes

serviceBadges
aviationBadges
occupationalBadges
ncsaPatches
patches
commandInsigniaPin
shoulderCords
specialtyTrackBadges
*/

export const memberTypes = [
    { group: "Member Types", value: "cadet", label: "Cadet", level: null, img: null },
    { group: "Member Types", value: "adult", label: "Adult", level: null, img: null },
];

export const cadetGrades = [
    { group: "Cadet Grades", value: "cadet_airman_basic", label: "Cadet Airman Basic (C/AB)", level: null, img: `/uniformImages/A1C.png` },
    { group: "Cadet Grades", value: "cadet_airman", label: "Cadet Airman (C/Amn)", level: null, img: `/uniformImages/grade/cadetGrades/Cadet_Amn_Insignia.png` },
    { group: "Cadet Grades", value: "cadet_airman_first_class", label: "Cadet Airman First Class (C/A1C)", level: null, img: `/uniformImages/grade/cadetGrades/Cadet_A1C_Insignia.png` },
    { group: "Cadet Grades", value: "cadet_senior_airman", label: "Cadet Senior Airman (C/SrA)", level: null, img: `/uniformImages/grade/cadetGrades/Cadet_SrA_Insignia.png` },
    { group: "Cadet Grades", value: "cadet_staff_sergeant", label: "Cadet Staff Sergeant (C/SSgt)", level: null, img: `/uniformImages/grade/cadetGrades/Cadet_SSgt_Insignia.png` },
    { group: "Cadet Grades", value: "cadet_technical_sergeant", label: "Cadet Technical Sergeant (C/TSgt)", level: null, img: `/uniformImages/grade/cadetGrades/Cadet_TSgt_Insignia.png` },
    { group: "Cadet Grades", value: "cadet_master_sergeant", label: "Cadet Master Sergeant (C/MSgt)", level: null, img: `/uniformImages/grade/cadetGrades/Cadet_MSgt_Insignia.png` },
    { group: "Cadet Grades", value: "cadet_senior_master_sergeant", label: "Cadet Senior Master Sergeant (C/SMSgt)", level: null, img: `/uniformImages/grade/cadetGrades/Cadet_SMSgt_Insignia.png` },
    { group: "Cadet Grades", value: "cadet_chief_master_sergeant", label: "Cadet Chief Master Sergeant (C/CMSgt)", level: null, img: `/uniformImages/grade/cadetGrades/Cadet_CMSgt_Insignia.png` },
    { group: "Cadet Grades", value: "cadet_second_lieutenant", label: "Cadet Second Lieutenant (C/2d Lt)", level: null, img: `/uniformImages/grade/cadetGrades/Cadet_2dLt_Insignia.png` },
    { group: "Cadet Grades", value: "cadet_first_lieutenant", label: "Cadet First Lieutenant (C/1st Lt)", level: null, img: `/uniformImages/grade/cadetGrades/Cadet_1stLt_Insignia.png` },
    { group: "Cadet Grades", value: "cadet_captain", label: "Cadet Captain (C/Capt)", level: null, img: `/uniformImages/grade/cadetGrades/Cadet_Capt_Insignia.png` },
    { group: "Cadet Grades", value: "cadet_major", label: "Cadet Major (C/Maj)", level: null, img: `/uniformImages/grade/cadetGrades/Cadet_Maj_Insignia.png` },
    { group: "Cadet Grades", value: "cadet_lieutenant_colonel", label: "Cadet Lieutenant Colonel (C/Lt Col)", level: null, img: `/uniformImages/grade/cadetGrades/Cadet_Lt_Col_Insignia.png` },
    { group: "Cadet Grades", value: "cadet_colonel", label: "Cadet Colonel (C/Col)", level: null, img: `/uniformImages/grade/cadetGrades/Cadet_Col_Insignia.png` },
];

export const seniorGrades = [
    {
        group: "Senior Grades", value: "senior_member_no_grade", label: "Senior Member (No Grade)", level: null, img: `/uniformImages/A1C.png` },
    { group: "Senior Grades", value: "staff_sergeant", label: "Staff Sergeant (SSgt)", level: null, img: `/uniformImages/grade/ncoGrades/SSgt_Insignia.png` },
    { group: "Senior Grades", value: "technical_sergeant", label: "Technical Sergeant (TSgt)", level: null, img: `/uniformImages/grade/ncoGrades/TSgt_Insignia.png` },
    { group: "Senior Grades", value: "master_sergeant", label: "Master Sergeant (MSgt)", level: null, img: `/uniformImages/grade/ncoGrades/MSgt_Insignia.png` },
    { group: "Senior Grades", value: "senior_master_sergeant", label: "Senior Master Sergeant (SMSgt)", level: null, img: `/uniformImages/grade/ncoGrades/SMSgt_Insignia.png` },
    { group: "Senior Grades", value: "chief_master_sergeant", label: "Chief Master Sergeant (CMSgt)", level: null, img: `/uniformImages/grade/ncoGrades/CMSgt_Insignia.png` },
    { group: "Senior Grades", value: "flight_officer", label: "Flight Officer (FO)", level: null, img: `/uniformImages/grade/officerGrades/FO.png` },
    { group: "Senior Grades", value: "technical_flight_officer", label: "Technical Flight Officer (TFO)", level: null, img: `/uniformImages/grade/officerGrades/TFO.png` },
    { group: "Senior Grades", value: "senior_flight_officer", label: "Senior Flight Officer (SFO)", level: null, img: `/uniformImages/grade/officerGrades/SFO.png` },
    { group: "Senior Grades", value: "second_lieutenant", label: "Second Lieutenant (2d Lt)", level: null, img: `/uniformImages/grade/officerGrades/US-O1_insignia.png` },
    { group: "Senior Grades", value: "first_lieutenant", label: "First Lieutenant (1st Lt)", level: null, img: `/uniformImages/grade/officerGrades/US-O2_insignia.png` },
    { group: "Senior Grades", value: "captain", label: "Captain (Capt)", level: null, img: `/uniformImages/grade/officerGrades/US-O3_insignia.png` },
    { group: "Senior Grades", value: "major", label: "Major (Maj)", level: null, img: `/uniformImages/grade/officerGrades/US-O4_insignia.png` },
    { group: "Senior Grades", value: "lieutenant_colonel", label: "Lieutenant Colonel (Lt Col)", level: null, img: `/uniformImages/grade/officerGrades/US-O5_insignia.png` },
    { group: "Senior Grades", value: "colonel", label: "Colonel (Col)", level: null, img: `/uniformImages/grade/officerGrades/US-O6_insignia.png` },
    { group: "Senior Grades", value: "command_chief", label: "National Command Chief", level: null, img: `/uniformImages/grade/ncoGrades/National_Command_Chief_Insignia.png` },
    { group: "Senior Grades", value: "brigadier_general", label: "Brigadier General (Brig Gen)", level: null, img: `/uniformImages/grade/officerGrades/US-O7_insignia.png` },
    { group: "Senior Grades", value: "major_general", label: "Major General (Maj Gen)", level: null, img: `/uniformImages/grade/officerGrades/US-O8_insignia.png` },
];

export const intergroupUniforms = [
    { group: "Intergroup Uniforms", value: "class_a", label: "Service Dress Uniform (Class A)", uniformCategory: "badge", img: `/uniformImages/A1C.png` },
    { group: "Intergroup Uniforms", value: "class_b", label: "Blue Service Uniform (Class B)", uniformCategory: "badge", img: `/uniformImages/A1C.png` },
    { group: "Intergroup Uniforms", value: "abu", label: "Airman Battle Uniform (ABU)", uniformCategory: "patch", img: `/uniformImages/A1C.png` },
    { group: "Intergroup Uniforms", value: "fdu", label: "Flight Duty Uniform (FDU)", uniformCategory: "flight", img: `/uniformImages/A1C.png` },
    { group: "Intergroup Uniforms", value: "cfdu", label: "Corporate Flight Duty Uniform (CFDU)", uniformCategory: "flight", img: `/uniformImages/A1C.png` },
    { group: "Intergroup Uniforms", value: "corporate_field", label: "Corporate Field Uniform", uniformCategory: "patch", img: `/uniformImages/A1C.png` },
    { group: "Intergroup Uniforms", value: "aviator_shirt", label: "Aviator Shirt Uniform", uniformCategory: "badge", img: `/uniformImages/A1C.png` },
    { group: "Intergroup Uniforms", value: "bdu", label: "Battle Dress Uniform (BDU)", uniformCategory: "patch", img: `/uniformImages/A1C.png` },
    { group: "Intergroup Uniforms", value: "ocp", label: "Operational Camouflage Pattern (OCP)", uniformCategory: "patch", img: `/uniformImages/A1C.png` },
];

export const seniorUniforms = [
    { group: "Senior Uniforms", value: "mess_dress", label: "Mess Dress Uniform", uniformCategory: "badge", img: `/uniformImages/A1C.png` },
    { group: "Senior Uniforms", value: "corporate_semi_formal", label: "Corporate Semi-Formal Uniform", uniformCategory: "badge", img: `/uniformImages/A1C.png` },
    { group: "Senior Uniforms", value: "corporate_service_dress", label: "Corporate Service Dress Uniform", uniformCategory: "badge", img: `/uniformImages/A1C.png` },
    { group: "Senior Uniforms", value: "corporate_working", label: "Corporate Working Uniform", uniformCategory: "patch", img: `/uniformImages/A1C.png` },
];

export const cadetUniforms = [
    { group: "Cadet Uniforms", value: "semi_formal_dress", label: "Semi-Formal Dress Uniform", uniformCategory: "badge", img: `/uniformImages/A1C.png` },
    { group: "Cadet Uniforms", value: "hgu", label: "Honor Guard Uniform", uniformCategory: "badge", img: `/uniformImages/A1C.png` },
];

export const nameplates = [
    { group: "Uniform Nameplates", value: "blazer_nameplate", label: "Blazer Nameplate", level: null, img: null },
    { group: "Uniform Nameplates", value: "brush_silver_nameplate", label: "Brush Silver Nameplate", level: null, img: null },
    { group: "Uniform Nameplates", value: "cap_nameplate_cadet", label: "CAP Nameplate - Cadets", level: null, img: null },
    { group: "Uniform Nameplates", value: "cap_nameplate_adult", label: "CAP Nameplate - Adults", level: null, img: null },
    { group: "Uniform Nameplates", value: "flight_suit_embroidered_name_tag", label: "Dark Blue Embroidered Flight Suit Name Tag", level: null, img: null },
    { group: "Uniform Nameplates", value: "black_leather_jacket_name_tag", label: "Black Leather Jacket Name Tag", level: null, img: null },
    { group: "Uniform Nameplates", value: "black_leather_flight_suit_name_tag", label: "Black Leather Flight Suit Name Tag", level: null, img: null },
    { group: "Uniform Nameplates", value: "abu_name_tag", label: "ABU Name Tag", level: null, img: null },
    { group: "Uniform Nameplates", value: "abu_cap_tag", label: "ABU CAP Tag", level: null, img: null },
];

export const collarInsignia = [
    { group: "Uniform Collar Insignia", value: "cap", label: "CAP (Cadet Officers)", level: null, img: "cap.png" },
    { group: "Uniform Collar Insignia", value: "cap_nco", label: "CAP (Cadet NCOs)", level: null, img: "cap_nco.png" },
    { group: "Uniform Collar Insignia", value: "us", label: "US (Officers)", level: null, img: "us.png" },
    { group: "Uniform Collar Insignia", value: "us_nco", label: "US (NCOs)", level: null, img: "us_nco.png" },
];

export const genderTypes = [
    { group: "Gender Type", value: "male", label: "Male", level: null, img: "male.png" },
    { group: "Gender Type", value: "female", label: "Female", level: null, img: "female.png" },
    { group: "Gender Type", value: "unisex", label: "Unisex", level: null, img: "unisex.png" },
];

export const serviceBadges = [
    { group: "Service Badge", value: "csag", label: "CAP Senior Advisory Group Badge", level: null, img: "csag.png" },
    { group: "Service Badge", value: "cc", label: "CAP Command Council Badge", level: null, img: "cc.png" },
    { group: "Service Badge", value: "nec", label: "National Executive Committee Badge", level: null, img: "nec.png" },
    { group: "Service Badge", value: "nb", label: "National Board Badge", level: null, img: "nb.png" },
    { group: "National Staff/Volunteer Badge", value: "ns", label: "National Staff/Volunteer Badge", level: null, img: "ns.png" },
    { group: "Volunteer University Instructor Badge", value: "vu", label: "Volunteer University Instructor Badge", level: null, img: "vu.png" },
];

export const commandInsigniaPin = [
    { group: "Command Insignia Pin", value: "cgc", label: "Current Group Commander", level: null, img: "cgc.png" },
    { group: "Command Insignia Pin", value: "csg", label: "Current Squadron Commander", level: null, img: "csg.png" },
    { group: "Command Insignia Pin", value: "pgc", label: "Past Group Commander", level: null, img: "pgc.png" },
    { group: "Command Insignia Pin", value: "psg", label: "Past Squadron Commander", level: null, img: "psg.png" },
];

export const aviationBadges = [
    { group: "Pilot Badge", value: "pilot", label: "Pilot", level: "basic", img: "pilot_basic.png" },
    { group: "Pilot Badge", value: "senior_pilot", label: "Senior Pilot", level: "senior", img: "pilot_senior.png" },
    { group: "Pilot Badge", value: "command_pilot", label: "Command Pilot", level: "command", img: "pilot_command.png" },

    { group: "Observer Badge", value: "observer", label: "Observer", level: "basic", img: "observer_basic.png" },
    { group: "Observer Badge", value: "senior_observer", label: "Senior Observer", level: "senior", img: "observer_senior.png" },
    { group: "Observer Badge", value: "master_observer", label: "Master Observer", level: "master", img: "observer_master.png" },

    { group: "Air Crew Badge", value: "air_crew", label: "Air Crew", level: "basic", img: "air_crew_basic.png" },
    { group: "Air Crew Badge", value: "senior_air_crew", label: "Senior Air Crew", level: "senior", img: "air_crew_senior.png" },
    { group: "Air Crew Badge", value: "master_air_crew", label: "Master Air Crew", level: "master", img: "air_crew_master.png" },

    { group: "Glider Pilot Badge", value: "glider_pilot", label: "Glider Pilot", level: null, img: "glider_pilot.png" },
    { group: "Balloon Pilot Badge", value: "balloon_pilot", label: "Balloon Pilot", level: null, img: "balloon_pilot.png" },
    { group: "Solo Badge", value: "solo_badge", label: "Solo Badge", level: null, img: "solo_badge.png" },
    { group: "Pre-Solo Badge", value: "pre_solo_badge", label: "Pre-Solo Badge", level: null, img: "pre_solo_badge.png" },

    { group: "sUAS Pilot Badge", value: "suas_pilot", label: "sUAS Pilot", level: "basic", img: "suas_pilot_basic.png" },
    { group: "sUAS Pilot Badge", value: "senior_suas_pilot", label: "Senior sUAS Pilot", level: "senior", img: "suas_pilot_senior.png" },
    { group: "sUAS Pilot Badge", value: "command_suas_pilot", label: "Command sUAS Pilot", level: "command", img: "suas_pilot_command.png" },

    { group: "sUAS Technician Badge", value: "suas_technician", label: "sUAS Technician", level: "basic", img: "suas_technician_basic.png" },
    { group: "sUAS Technician Badge", value: "senior_suas_technician", label: "Senior sUAS Technician", level: "senior", img: "suas_technician_senior.png" },
    { group: "sUAS Technician Badge", value: "master_suas_technician", label: "Master sUAS Technician", level: "master", img: "suas_technician_master.png" },

    { group: "Cadet sUAS Badge", value: "cadet_suas_badge", label: "Cadet sUAS Badge", level: null, img: "cadet_suas_badge.png" },
    { group: "Cadet Model Rocketry Badge", value: "cadet_model_rocketry_badge", label: "Cadet Model Rocketry Badge", level: null, img: "cadet_model_rocketry.png" },
];

export const occupationalBadges = [
    { group: "Chaplain Insignia", value: "chaplaininsignia_jewish", label: "Chaplain Insignia - Jewish", level: null, img: "chaplain_jewish.png" },
    { group: "Chaplain Insignia", value: "chaplaininsignia_christian", label: "Chaplain Insignia - Christian", level: null, img: "chaplain_christian.png" },
    { group: "Chaplain Insignia", value: "chaplaininsignia_buddhist", label: "Chaplain Insignia - Buddhist", level: null, img: "chaplain_buddhist.png" },
    { group: "Chaplain Insignia", value: "chaplaininsignia_muslim", label: "Chaplain Insignia - Muslim", level: null, img: "chaplain_muslim.png" },

    { group: "Medical Officer Badge", value: "medical_officer_badge", label: "Medical Officer Badge", level: null, img: "medical_officer.png" },
    { group: "Medical Officer Badge", value: "nurse_officer_badge", label: "Nurse Officer Badge", level: null, img: "nurse_officer.png" },

    { group: "Legal Officer Badge", value: "legal_officer_badge", label: "Legal Officer Badge", level: null, img: "legal_officer.png" },

    { group: "Ground Team Badge", value: "ground_team_badge_basic", label: "Ground Team Badge - Basic", level: "basic", img: "ground_team_basic.png" },
    { group: "Ground Team Badge", value: "ground_team_badge_senior", label: "Ground Team Badge - Senior", level: "senior", img: "ground_team_senior.png" },
    { group: "Ground Team Badge", value: "ground_team_badge_master", label: "Ground Team Badge - Master", level: "master", img: "ground_team_master.png" },

    { group: "Incident Commander Badge", value: "incident_commander_badge_1", label: "Incident Commander 1 Badge", level: "1", img: "incident_commander_1.png" },
    { group: "Incident Commander Badge", value: "incident_commander_badge_2", label: "Incident Commander 2 Badge", level: "2", img: "incident_commander_2.png" },
    { group: "Incident Commander Badge", value: "incident_commander_badge_3", label: "Incident Commander 3 Badge", level: "3", img: "incident_commander_3.png" },

    { group: "Emergency Medical Technician Badge", value: "emt_badge_basic", label: "EMT Badge - Basic", level: "basic", img: "emt_basic.png" },
    { group: "Emergency Medical Technician Badge", value: "emt_badge_intermediate", label: "EMT Badge - Intermediate", level: "intermediate", img: "emt_intermediate.png" },
    { group: "Emergency Medical Technician Badge", value: "emt_badge_paramedic", label: "EMT Badge - Paramedic", level: "paramedic", img: "emt_paramedic.png" },
];

export const specialtyTrackBadges = [
    { group: "Personnel", value: "personnel_badge_technician", label: "Personnel Badge - Technician", level: "technician", img: "personnel_technician.png" },
    { group: "Personnel", value: "personnel_badge_senior", label: "Personnel Badge - Senior", level: "senior", img: "personnel_senior.png" },
    { group: "Personnel", value: "personnel_badge_master", label: "Personnel Badge - Master", level: "master", img: "personnel_master.png" },

    { group: "Aerospace Education", value: "aerospace_education_badge_technician", label: "Aerospace Education Badge - Technician", level: "technician", img: "aerospace_education_technician.png" },
    { group: "Aerospace Education", value: "aerospace_education_badge_senior", label: "Aerospace Education Badge - Senior", level: "senior", img: "aerospace_education_senior.png" },
    { group: "Aerospace Education", value: "aerospace_education_badge_master", label: "Aerospace Education Badge - Master", level: "master", img: "aerospace_education_master.png" },

    { group: "Public Affairs", value: "public_affairs_badge_technician", label: "Public Affairs Badge - Technician", level: "technician", img: "public_affairs_technician.png" },
    { group: "Public Affairs", value: "public_affairs_badge_senior", label: "Public Affairs Badge - Senior", level: "senior", img: "public_affairs_senior.png" },
    { group: "Public Affairs", value: "public_affairs_badge_master", label: "Public Affairs Badge - Master", level: "master", img: "public_affairs_master.png" },

    { group: "Cadet Program", value: "cadet_program_badge_technician", label: "Cadet Program Badge - Technician", level: "technician", img: "cadet_program_technician.png" },
    { group: "Cadet Program", value: "cadet_program_badge_senior", label: "Cadet Program Badge - Senior", level: "senior", img: "cadet_program_senior.png" },
    { group: "Cadet Program", value: "cadet_program_badge_master", label: "Cadet Program Badge - Master", level: "master", img: "cadet_program_master.png" },

    { group: "Finance", value: "finance_badge_technician", label: "Finance Badge - Technician", level: "technician", img: "finance_technician.png" },
    { group: "Finance", value: "finance_badge_senior", label: "Finance Badge - Senior", level: "senior", img: "finance_senior.png" },
    { group: "Finance", value: "finance_badge_master", label: "Finance Badge - Master", level: "master", img: "finance_master.png" },

    { group: "Safety", value: "safety_badge_technician", label: "Safety Badge - Technician", level: "technician", img: "safety_technician.png" },
    { group: "Safety", value: "safety_badge_senior", label: "Safety Badge - Senior", level: "senior", img: "safety_senior.png" },
    { group: "Safety", value: "safety_badge_master", label: "Safety Badge - Master", level: "master", img: "safety_master.png" },

    { group: "Inspector General", value: "inspector_general_badge_technician", label: "Inspector General Badge - Technician", level: "technician", img: "inspector_general_technician.png" },
    { group: "Inspector General", value: "inspector_general_badge_senior", label: "Inspector General Badge - Senior", level: "senior", img: "inspector_general_senior.png" },
    { group: "Inspector General", value: "inspector_general_badge_master", label: "Inspector General Badge - Master", level: "master", img: "inspector_general_master.png" },

    { group: "Legal", value: "legal_badge_technician", label: "Legal Badge - Technician", level: "technician", img: "legal_technician.png" },
    { group: "Legal", value: "legal_badge_senior", label: "Legal Badge - Senior", level: "senior", img: "legal_senior.png" },
    { group: "Legal", value: "legal_badge_master", label: "Legal Badge - Master", level: "master", img: "legal_master.png" },

    { group: "Professional Development", value: "professional_development_badge_technician", label: "Professional Development Badge - Technician", level: "technician", img: "professional_development_technician.png" },
    { group: "Professional Development", value: "professional_development_badge_senior", label: "Professional Development Badge - Senior", level: "senior", img: "professional_development_senior.png" },
    { group: "Professional Development", value: "professional_development_badge_master", label: "Professional Development Badge - Master", level: "master", img: "professional_development_master.png" },

    { group: "Health Services", value: "health_services_badge_technician", label: "Health Services Badge - Technician", level: "technician", img: "health_services_technician.png" },
    { group: "Health Services", value: "health_services_badge_senior", label: "Health Services Badge - Senior", level: "senior", img: "health_services_senior.png" },
    { group: "Health Services", value: "health_services_badge_master", label: "Health Services Badge - Master", level: "master", img: "health_services_master.png" },

    { group: "Administration", value: "administration_badge_technician", label: "Administration Badge - Technician", level: "technician", img: "administration_technician.png" },
    { group: "Administration", value: "administration_badge_senior", label: "Administration Badge - Senior", level: "senior", img: "administration_senior.png" },
    { group: "Administration", value: "administration_badge_master", label: "Administration Badge - Master", level: "master", img: "administration_master.png" },

    { group: "Chaplain", value: "chaplain_badge_technician", label: "Chaplain Badge - Technician", level: "technician", img: "chaplain_technician.png" },
    { group: "Chaplain", value: "chaplain_badge_senior", label: "Chaplain Badge - Senior", level: "senior", img: "chaplain_senior.png" },
    { group: "Chaplain", value: "chaplain_badge_master", label: "Chaplain Badge - Master", level: "master", img: "chaplain_master.png" },

    { group: "Operations", value: "operations_badge_technician", label: "Operations Badge - Technician", level: "technician", img: "operations_technician.png" },
    { group: "Operations", value: "operations_badge_senior", label: "Operations Badge - Senior", level: "senior", img: "operations_senior.png" },
    { group: "Operations", value: "operations_badge_master", label: "Operations Badge - Master", level: "master", img: "operations_master.png" },

    { group: "Historian", value: "historian_badge_technician", label: "Historian Badge - Technician", level: "technician", img: "historian_technician.png" },
    { group: "Historian", value: "historian_badge_senior", label: "Historian Badge - Senior", level: "senior", img: "historian_senior.png" },
    { group: "Historian", value: "historian_badge_master", label: "Historian Badge - Master", level: "master", img: "historian_master.png" },

    { group: "Logistics", value: "logistics_badge_technician", label: "Logistics Badge - Technician", level: "technician", img: "logistics_technician.png" },
    { group: "Logistics", value: "logistics_badge_senior", label: "Logistics Badge - Senior", level: "senior", img: "logistics_senior.png" },
    { group: "Logistics", value: "logistics_badge_master", label: "Logistics Badge - Master", level: "master", img: "logistics_master.png" },

    { group: "Command", value: "command_badge_technician", label: "Command Badge - Technician", level: "technician", img: "command_technician.png" },
    { group: "Command", value: "command_badge_senior", label: "Command Badge - Senior", level: "senior", img: "command_senior.png" },
    { group: "Command", value: "command_badge_master", label: "Command Badge - Master", level: "master", img: "command_master.png" },

    { group: "Standardization & Evaluation", value: "standardization_evaluation_badge_technician", label: "Standardization & Evaluation Badge - Technician", level: "technician", img: "standardization_evaluation_technician.png" },
    { group: "Standardization & Evaluation", value: "standardization_evaluation_badge_senior", label: "Standardization & Evaluation Badge - Senior", level: "senior", img: "standardization_evaluation_senior.png" },
    { group: "Standardization & Evaluation", value: "standardization_evaluation_badge_master", label: "Standardization & Evaluation Badge - Master", level: "master", img: "standardization_evaluation_master.png" },

    { group: "Character Development", value: "character_development_badge_technician", label: "Character Development Badge - Technician", level: "technician", img: "character_development_technician.png" },
    { group: "Character Development", value: "character_development_badge_senior", label: "Character Development Badge - Senior", level: "senior", img: "character_development_senior.png" },
    { group: "Character Development", value: "character_development_badge_master", label: "Character Development Badge - Master", level: "master", img: "character_development_master.png" },

    { group: "Emergency Services", value: "emergency_services_badge_technician", label: "Emergency Services Badge - Technician", level: "technician", img: "emergency_services_technician.png" },
    { group: "Emergency Services", value: "emergency_services_badge_senior", label: "Emergency Services Badge - Senior", level: "senior", img: "emergency_services_senior.png" },
    { group: "Emergency Services", value: "emergency_services_badge_master", label: "Emergency Services Badge - Master", level: "master", img: "emergency_services_master.png" },

    { group: "Recruiting and Retention", value: "recruiting_retention_badge_technician", label: "Recruiting and Retention Badge - Technician", level: "technician", img: "recruiting_retention_technician.png" },
    { group: "Recruiting and Retention", value: "recruiting_retention_badge_senior", label: "Recruiting and Retention Badge - Senior", level: "senior", img: "recruiting_retention_senior.png" },
    { group: "Recruiting and Retention", value: "recruiting_retention_badge_master", label: "Recruiting and Retention Badge - Master", level: "master", img: "recruiting_retention_master.png" },

    { group: "Communication", value: "communication_badge_technician", label: "Communication Badge - Technician", level: "technician", img: "communication_technician.png" },
    { group: "Communication", value: "communication_badge_senior", label: "Communication Badge - Senior", level: "senior", img: "communication_senior.png" },
    { group: "Communication", value: "communication_badge_master", label: "Communication Badge - Master", level: "master", img: "communication_master.png" },

    { group: "Information Technology", value: "information_technology_badge_technician", label: "Information Technology Badge - Technician", level: "technician", img: "information_technology_technician.png" },
    { group: "Information Technology", value: "information_technology_badge_senior", label: "Information Technology Badge - Senior", level: "senior", img: "information_technology_senior.png" },
    { group: "Information Technology", value: "information_technology_badge_master", label: "Information Technology Badge - Master", level: "master", img: "information_technology_master.png" },

];

export const additionalBadges = [
    { group: "NRA Marksmanship", value: "nra_distinguished_expert", label: "NRA Distinguished Expert Badge", level: "distinguished", img: "nra_distinguished.png" },
    { group: "NRA Marksmanship", value: "nra_expert", label: "NRA Expert Badge", level: "expert", img: "nra_expert.png" },
    { group: "NRA Marksmanship", value: "nra_sharpshooter", label: "NRA Sharpshooter Badge", level: "sharpshooter", img: "nra_sharpshooter.png" },
    { group: "NRA Marksmanship", value: "nra_marksman_first_class", label: "NRA Marksman First-Class Badge", level: "first_class", img: "nra_marksman_1c.png" },
    { group: "NRA Marksmanship", value: "nra_marksman", label: "NRA Marksman Badge", level: "marksman", img: "nra_marksman.png" },
    { group: "NRA Marksmanship", value: "nra_pro_marksman", label: "NRA Pro-Marksman Badge", level: "pro_marksman", img: "nra_pro_marksman.png" },

    { group: "Cadet STEM Badge", value: "cadet_stem_basic", label: "Cadet STEM Badge - Basic (Blue Star)", level: "basic", img: "cadet_stem_basic.png" },
    { group: "Cadet STEM Badge", value: "cadet_stem_advanced", label: "Cadet STEM Badge - Advanced (Silver Star)", level: "advanced", img: "cadet_stem_advanced.png" },
    { group: "Cadet STEM Badge", value: "cadet_stem_master", label: "Cadet STEM Badge - Master (Gold Star)", level: "master", img: "cadet_stem_master.png" },

    { group: "Cadet Cyber Badge", value: "cadet_cyber_basic", label: "Cadet Cyber Badge - Basic (Blue Star)", level: "basic", img: "cadet_cyber_basic.png" },
    { group: "Cadet Cyber Badge", value: "cadet_cyber_advanced", label: "Cadet Cyber Badge - Advanced (Silver Star)", level: "advanced", img: "cadet_cyber_advanced.png" },
    { group: "Cadet Cyber Badge", value: "cadet_cyber_master", label: "Cadet Cyber Badge - Master (Gold Star)", level: "master", img: "cadet_cyber_master.png" },
];

export const patches = [
    { group: "American Flag Patch", value: "american_flag_patch", label: "American Flag Patch", level: null, img: "american_flag_patch.png" },
    { group: "CAP Command Patch", value: "cap_command_patch", label: "CAP Command Patch", level: null, img: "cap_command_patch.png" },
    { group: "National Shoulder Rocker Patch", value: "national_shoulder_rocker", label: "National Shoulder Rocker", level: null, img: "national_shoulder_rocker.png" },
    { group: "Region Shield Patch", value: "region_shield_patch", label: "Region Shield Patch", level: null, img: "region_shield_patch.png" },
    { group: "Wing Patch Patch", value: "wing_patch", label: "Wing Patch", level: null, img: "wing_patch.png" },
    { group: "Overseas Unit Patch", value: "overseas_unit_shoulder_patch", label: "Overseas Unit Shoulder Patch", level: null, img: "overseas_unit_shoulder_patch.png" },
    { group: "National Check Pilot Patch", value: "national_check_pilot_patch", label: "National Check Pilot Patch", level: null, img: "national_check_pilot_patch.png" },
    { group: "Pilot Proficiency Patch", value: "pilot_proficiency_patch", label: "Pilot Proficiency Patch", level: null, img: "pilot_proficiency_patch.png" },
    { group: "AFRCC Basic Inland Search and Rescue Course (BISC) Patch", value: "afrcc_basic_inland_search_rescue_patch", label: "AFRCC Basic Inland Search and Rescue Course (BISC) Patch", level: null, img: "afrcc_basic_inland_search_rescue_patch.png" },
    { group: "Inland SAR Planning Course Patch", value: "inland_sar_planning_course_patch", label: "Inland SAR Planning Course Patch", level: null, img: "inland_sar_planning_course_patch.png" },
    { group: "Cadet Orientation Pilot Patch", value: "cadet_orientation_pilot_patch", label: "Cadet Orientation Pilot Patch", level: null, img: "cadet_orientation_pilot_patch.png" },
    { group: "AFJROTC Patch", value: "afjrotc_patch", label: "AFJROTC Patch", level: null, img: "afjrotc_patch.png" },
    { group: "Venture/Aviation Explorer Patch", value: "venture_aviation_explorer_patch", label: "Venture/Aviation Explorer Patch", level: null, img: "venture_aviation_explorer_patch.png" },
    { group: "Communications Patch", value: "communications_patch", label: "Communications Patch", level: null, img: "communications_patch.png" },
    { group: "Safety Patch", value: "safety_patch", label: "Safety Patch", level: null, img: "safety_patch.png" },
    { group: "Model Rocketry Patch", value: "model_rocketry_patch", label: "Model Rocketry Patch", level: null, img: "model_rocketry_patch.png" },
    { group: "Emergency Services Patch", value: "emergency_services_patch", label: "Emergency Services Patch (style 1 & 2)", level: null, img: "emergency_services_patch.png" },
    { group: "CPR Patch", value: "cpr_patch", label: "Cardiopulmonary Resuscitation (CPR) Patch", level: null, img: "cpr_patch.png" },
    { group: "ARCHER Patch", value: "archer_patch", label: "ARCHER Patch", level: null, img: "archer_patch.png" },
    { group: "CISM Patch", value: "cism_patch", label: "Critical Incident Stress Management (CISM) Patch", level: null, img: "cism_patch.png" },
    { group: "NASAR Patch", value: "nasar_patch", label: "National Association for Search and Rescue (NASAR) Patch", level: null, img: "nasar_patch.png" },
];

export const ncsaPatches = [
    { group: "NCSA AFSCFC Patch", value: "air_force_space_command_familiarization_course", label: "Air Force Space Command Familiarization Course", level: null, img: "af_space_command_familiarization.png" },
    { group: "NCSA AFCEA Patch", value: "air_force_civil_engineering_academy", label: "Air Force Civil Engineering Academy", level: null, img: "af_civil_engineering_academy.png" },
    { group: "NCSA COS Patch", value: "cadet_officer_school", label: "Cadet Officer School", level: null, img: "cadet_officer_school.png" },
    { group: "NCSA NESA Patch", value: "national_emergency_services_academy", label: "National Emergency Services Academy", level: null, img: "national_emergency_services_academy.png" },
    { group: "NCSA HMRS Patch", value: "hawk_mountain_ranger_school", label: "Hawk Mountain Ranger School", level: null, img: "hawk_mountain_ranger_school.png" },
    { group: "NCSA QT Patch", value: "hawk_mountain_ranger_qualification_tabs", label: "Hawk Mountain Ranger Qualification Tabs", level: null, img: "hawk_mountain_ranger_qualification_tabs.png" },
    { group: "NCSA HGA Patch", value: "honor_guard_academy", label: "Honor Guard Academy", level: null, img: "honor_guard_academy.png" },
    { group: "NCSA NBB Patch", value: "national_blue_beret", label: "National Blue Beret", level: null, img: "national_blue_beret.png" },
    { group: "NCSA EA Patch", value: "engineering_academy", label: "Engineering Academy", level: null, img: "engineering_academy.png" },
    { group: "NCSA NFA Patch", value: "national_flight_academy", label: "National Flight Academy", level: null, img: "national_flight_academy.png" },
    { group: "NCSA POC Patch", value: "pararescue_orientation_course", label: "Pararescue Orientation Course", level: null, img: "pararescue_orientation_course.png" },
    { group: "NCSA SUPTFC Patch", value: "specialized_undergraduate_pilot_training_familiarization_course", label: "Specialized Undergraduate Pilot Training Familiarization Course", level: null, img: "specialized_undergraduate_pilot_training.png" },
];

export const shoulderCords = [
    { group: "Shoulder Cord", value: "gold", label: "Gold - National Cadet Advisory Council", level: null, img: "gold_cord.png" },
    { group: "Shoulder Cord", value: "blue", label: "Blue - Region Cadet Advisory Council", level: null, img: "blue_cord.png" },
    { group: "Shoulder Cord", value: "red", label: "Red - Wing Cadet Advisory Council", level: null, img: "red_cord.png" },
    { group: "Shoulder Cord", value: "green", label: "Green - Group Cadet Advisory Council", level: null, img: "green_cord.png" },
    { group: "Shoulder Cord", value: "white", label: "White - Drill or Color Guard Competition/Team", level: null, img: "white_cord.png" },
    { group: "Shoulder Cord", value: "silver", label: "Silver - Honor Guard Academy graduate or member", level: null, img: "silver_cord.png" },
    { group: "Shoulder Cord", value: "gray", label: "Gray - USAF Aide de Camp", level: null, img: "gray_cord.png" },
    { group: "Shoulder Cord", value: "black", label: "Cadet of the Month/Quarter", level: null, img: "black_cord.png" },
    { group: "Shoulder Cord", value: "mix", label: "Region/Wing Supplmented Cord", level: null, img: "mix_cord.png" },
];