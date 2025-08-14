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
    { group: "Member Types", value: "cadet", label: "Cadet", level: null, image: null },
    { group: "Member Types", value: "adult", label: "Adult", level: null, image: null },
];

export const genderTypes = [
    { group: "Gender Type", value: "male", label: "Male", level: null, image: null },
    { group: "Gender Type", value: "female", label: "Female", level: null, image: null },
    { group: "Unisex Type", value: "unisex", label: "Unisex", level: null, image: null },
];

export const allGrades = [
    // Cadet Grades
    { group: "Cadet Grades", value: "cadet_airman_basic", label: "Cadet Airman Basic (C/AB)", level: null, image: `/uniformImages/A1C.png` },
    { group: "Cadet Grades", value: "cadet_airman", label: "Cadet Airman (C/Amn)", level: null, image: `/uniformImages/grade/cadetGrades/Cadet_Amn_Insignia.png` },
    { group: "Cadet Grades", value: "cadet_airman_first_class", label: "Cadet Airman First Class (C/A1C)", level: null, image: `/uniformImages/grade/cadetGrades/Cadet_A1C_Insignia.png` },
    { group: "Cadet Grades", value: "cadet_senior_airman", label: "Cadet Senior Airman (C/SrA)", level: null, image: `/uniformImages/grade/cadetGrades/Cadet_SrA_Insignia.png` },
    { group: "Cadet Grades", value: "cadet_staff_sergeant", label: "Cadet Staff Sergeant (C/SSgt)", level: null, image: `/uniformImages/grade/cadetGrades/Cadet_SSgt_Insignia.png` },
    { group: "Cadet Grades", value: "cadet_technical_sergeant", label: "Cadet Technical Sergeant (C/TSgt)", level: null, image: `/uniformImages/grade/cadetGrades/Cadet_TSgt_Insignia.png` },
    { group: "Cadet Grades", value: "cadet_master_sergeant", label: "Cadet Master Sergeant (C/MSgt)", level: null, image: `/uniformImages/grade/cadetGrades/Cadet_MSgt_Insignia.png` },
    { group: "Cadet Grades", value: "cadet_senior_master_sergeant", label: "Cadet Senior Master Sergeant (C/SMSgt)", level: null, image: `/uniformImages/grade/cadetGrades/Cadet_SMSgt_Insignia.png` },
    { group: "Cadet Grades", value: "cadet_chief_master_sergeant", label: "Cadet Chief Master Sergeant (C/CMSgt)", level: null, image: `/uniformImages/grade/cadetGrades/Cadet_CMSgt_Insignia.png` },
    { group: "Cadet Grades", value: "cadet_second_lieutenant", label: "Cadet Second Lieutenant (C/2d Lt)", level: null, image: `/uniformImages/grade/cadetGrades/Cadet_2dLt_Insignia.png` },
    { group: "Cadet Grades", value: "cadet_first_lieutenant", label: "Cadet First Lieutenant (C/1st Lt)", level: null, image: `/uniformImages/grade/cadetGrades/Cadet_1stLt_Insignia.png` },
    { group: "Cadet Grades", value: "cadet_captain", label: "Cadet Captain (C/Capt)", level: null, image: `/uniformImages/grade/cadetGrades/Cadet_Capt_Insignia.png` },
    { group: "Cadet Grades", value: "cadet_major", label: "Cadet Major (C/Maj)", level: null, image: `/uniformImages/grade/cadetGrades/Cadet_Maj_Insignia.png` },
    { group: "Cadet Grades", value: "cadet_lieutenant_colonel", label: "Cadet Lieutenant Colonel (C/Lt Col)", level: null, image: `/uniformImages/grade/cadetGrades/Cadet_Lt_Col_Insignia.png` },
    { group: "Cadet Grades", value: "cadet_colonel", label: "Cadet Colonel (C/Col)", level: null, image: `/uniformImages/grade/cadetGrades/Cadet_Col_Insignia.png` },
    
    // Senior Grades
    { group: "Senior Grades", value: "senior_member_no_grade", label: "Senior Member (No Grade)", level: null, image: `/uniformImages/A1C.png` },
    { group: "Senior Grades", value: "staff_sergeant", label: "Staff Sergeant (SSgt)", level: null, image: `/uniformImages/grade/ncoGrades/SSgt_Insignia.png` },
    { group: "Senior Grades", value: "technical_sergeant", label: "Technical Sergeant (TSgt)", level: null, image: `/uniformImages/grade/ncoGrades/TSgt_Insignia.png` },
    { group: "Senior Grades", value: "master_sergeant", label: "Master Sergeant (MSgt)", level: null, image: `/uniformImages/grade/ncoGrades/MSgt_Insignia.png` },
    { group: "Senior Grades", value: "senior_master_sergeant", label: "Senior Master Sergeant (SMSgt)", level: null, image: `/uniformImages/grade/ncoGrades/SMSgt_Insignia.png` },
    { group: "Senior Grades", value: "chief_master_sergeant", label: "Chief Master Sergeant (CMSgt)", level: null, image: `/uniformImages/grade/ncoGrades/CMSgt_Insignia.png` },
    { group: "Senior Grades", value: "flight_officer", label: "Flight Officer (FO)", level: null, image: `/uniformImages/grade/officerGrades/FO.png` },
    { group: "Senior Grades", value: "technical_flight_officer", label: "Technical Flight Officer (TFO)", level: null, image: `/uniformImages/grade/officerGrades/TFO.png` },
    { group: "Senior Grades", value: "senior_flight_officer", label: "Senior Flight Officer (SFO)", level: null, image: `/uniformImages/grade/officerGrades/SFO.png` },
    { group: "Senior Grades", value: "second_lieutenant", label: "Second Lieutenant (2d Lt)", level: null, image: `/uniformImages/grade/officerGrades/US-O1_insignia.png` },
    { group: "Senior Grades", value: "first_lieutenant", label: "First Lieutenant (1st Lt)", level: null, image: `/uniformImages/grade/officerGrades/US-O2_insignia.png` },
    { group: "Senior Grades", value: "captain", label: "Captain (Capt)", level: null, image: `/uniformImages/grade/officerGrades/US-O3_insignia.png` },
    { group: "Senior Grades", value: "major", label: "Major (Maj)", level: null, image: `/uniformImages/grade/officerGrades/US-O4_insignia.png` },
    { group: "Senior Grades", value: "lieutenant_colonel", label: "Lieutenant Colonel (Lt Col)", level: null, image: `/uniformImages/grade/officerGrades/US-O5_insignia.png` },
    { group: "Senior Grades", value: "colonel", label: "Colonel (Col)", level: null, image: `/uniformImages/grade/officerGrades/US-O6_insignia.png` },
    { group: "Senior Grades", value: "command_chief", label: "National Command Chief", level: null, image: `/uniformImages/grade/ncoGrades/National_Command_Chief_Insignia.png` },
    { group: "Senior Grades", value: "brigadier_general", label: "Brigadier General (Brig Gen)", level: null, image: `/uniformImages/grade/officerGrades/US-O7_insignia.png` },
    { group: "Senior Grades", value: "major_general", label: "Major General (Maj Gen)", level: null, image: `/uniformImages/grade/officerGrades/US-O8_insignia.png` },
];

export const allUniforms = [
    // Both
    { group: "Base Uniforms", value: "class_a", label: "Service Dress Uniform (Class A)", uniformCategory: "badge", image: `/uniformImages/classB/ClassB_S_M_Tie.svg` },
    { group: "Base Uniforms", value: "class_b", label: "Blue Service Uniform (Class B)", uniformCategory: "badge", image: `/uniformImages/classB/ClassB_S_M_Tie.svg` },
    { group: "Base Uniforms", value: "abu", label: "Airman Battle Uniform (ABU)", uniformCategory: "patch", image: null },
    { group: "Base Uniforms", value: "fdu", label: "Flight Duty Uniform (FDU)", uniformCategory: "flight", image: null },
    { group: "Base Uniforms", value: "cfdu", label: "Corporate Flight Duty Uniform (CFDU)", uniformCategory: "flight", image: null },
    { group: "Base Uniforms", value: "corporate_field", label: "Corporate Field Uniform", uniformCategory: "patch", image: null },
    { group: "Base Uniforms", value: "aviator_shirt", label: "Aviator Shirt Uniform", uniformCategory: "badge", image: null },
    { group: "Base Uniforms", value: "bdu", label: "Battle Dress Uniform (BDU)", uniformCategory: "patch", image: null },
    { group: "Base Uniforms", value: "ocp", label: "Operational Camouflage Pattern (OCP)", uniformCategory: "patch", image: null },

    // Cadet Uniforms
    { group: "Cadet Uniforms", value: "semi_formal_dress", label: "Semi-Formal Dress Uniform", uniformCategory: "badge", image: null },
    { group: "Cadet Uniforms", value: "hgu", label: "Honor Guard Uniform", uniformCategory: "badge", image: null },

    // Senior Uniforms
    { group: "Senior Uniforms", value: "mess_dress", label: "Mess Dress Uniform", uniformCategory: "badge", image: null },
    { group: "Senior Uniforms", value: "corporate_semi_formal", label: "Corporate Semi-Formal Uniform", uniformCategory: "badge", image: null },
    { group: "Senior Uniforms", value: "corporate_service_dress", label: "Corporate Service Dress Uniform", uniformCategory: "badge", image: null },
    { group: "Senior Uniforms", value: "corporate_working", label: "Corporate Working Uniform", uniformCategory: "patch", image: null },
];

export const nameplates = [
    { group: "Uniform Nameplates", value: "blazer_nameplate", label: "Blazer Nameplate", uniformCategory: "adult_corporate", image: `/uniformImages/items/Blazer_Name_Plate.svg` },
    { group: "Uniform Nameplates", value: "brush_silver_nameplate", label: "Brush Silver Nameplate", uniformCategory: "adult_classA", image: `/uniformImages/items/ClassA_Adult_Name_Plate.svg` },
    { group: "Uniform Nameplates", value: "cap_nameplate_cadet", label: "CAP Nameplate - Cadets", uniformCategory: "Cadets_blues", image: `/uniformImages/items/Cadet_Name_Plate.svg` },
    { group: "Uniform Nameplates", value: "cap_nameplate_adult", label: "CAP Nameplate - Adults", uniformCategory: "adult_classB", image: `/uniformImages/items/ClassB_Adult_Name_Plate.svg` },
    { group: "Uniform Nameplates", value: "flight_suit_embroidered_name_tag", label: "Dark Blue Embroidered Flight Suit Name Tag", uniformCategory: null, image: `/uniformImages/items/Blue_Leather_Name_Patch.svg` },
    { group: "Uniform Nameplates", value: "black_leather_jacket_name_tag", label: "Black Leather Jacket Name Tag", uniformCategory: null, image: `/uniformImages/items/Brown_Leather_Name_Patch.svg` },
    { group: "Uniform Nameplates", value: "black_leather_flight_suit_name_tag", label: "Black Leather Flight Suit Name Tag", uniformCategory: null, image: `/uniformImages/items/Brown_Leather_Name_Patch.svg` },
    { group: "Uniform Nameplates", value: "abu_name_tag", label: "ABU Name Tag", uniformCategory: "ABU", image: null },
    { group: "Uniform Nameplates", value: "abu_cap_tag", label: "ABU CAP Tag", uniformCategory: "ABU", image: null },
];

export const classB = [
    // Male Slacks & Shirts
    { group: "Male Slacks", value: "male_slacks", label: "Male Slacks", level: null, image: `/uniformImages/classB/Slacks_M.svg` },
    { group: "Male Shirt", value: "short_sleeve_no_tie", label: "Short Sleeve Shirt - No Tie", level: null, image: `/uniformImages/classB/ClassB_S_M.svg` },
    { group: "Male Shirt", value: "short_sleeve_with_tie", label: "Short Sleeve Shirt - With Tie", level: null, image: `/uniformImages/classB/ClassB_S_M_Tie.svg` },
    { group: "Male Shirt", value: "long_sleeve_no_tie", label: "Long Sleeve Shirt - No Tie", level: null, image: `/uniformImages/classB/ClassB_L_M.svg` },
    { group: "Male Shirt", value: "long_sleeve_with_tie", label: "Long Sleeve Shirt - With Tie", level: null, image: `/uniformImages/classB/ClassB_L_M_Tie.svg` },

    // Female Slacks & Shirts (no tie / tie tab)
    { group: "Female Slacks", value: "female_slacks", label: "Female Slacks", level: null, image: `/uniformImages/classB/Slacks_F.svg` },
    { group: "Female Slacks", value: "female_slacks_princess", label: "Female Slacks - Princess", level: null, image: `/uniformImages/classB/Slacks_U.svg` },
    { group: "Female Shirt", value: "short_sleeve_no_tietab", label: "Short Sleeve Shirt - No Tie Tab", level: null, image: `/uniformImages/classB/ClassB_S_F.svg` },
    { group: "Female Shirt", value: "short_sleeve_with_tietab", label: "Short Sleeve Shirt - With Tie Tab", level: null, image: `/uniformImages/classB/ClassB_S_F_Tie.svg` },
    { group: "Female Shirt", value: "long_sleeve_no_tietab", label: "Long Sleeve Shirt - No Tie Tab", level: null, image: `/uniformImages/classB/ClassB_L_F.svg` },
    { group: "Female Shirt", value: "long_sleeve_with_tietab", label: "Long Sleeve Shirt - With Tie Tab", level: null, image: `/uniformImages/classB/ClassB_L_F_Tie.svg` },
    { group: "Female Skirt", value: "female_skirt", label: "Skirt", level: null, image: `/uniformImages/classB/Skirt.svg` },
    { group: "Female Skirt", value: "female_skirt_princess", label: "Skirt - Princess", level: null, image: `/uniformImages/classB/Skirt_U.svg` },
];

export const classA = [
    // Male
    { group: "Male Service Coat", value: "male_service_coat_new", label: "Male Service Coat - New Style", level: null, image: `/uniformImages/classA/New_M.svg` },
    { group: "Male Service Coat", value: "male_service_coat_old", label: "Male Service Coat - Old Style", level: null, image: `/uniformImages/classA/Old_M.svg` },

    // Female
    { group: "Female Service Coat", value: "male_service_coat_new", label: "Female Service Coat - New Style", level: null, image: `/uniformImages/classA/New_F.svg` },
    { group: "Female Service Coat", value: "male_service_coat_old", label: "Female Service Coat - Old Style", level: null, image: `/uniformImages/classA/Old_F.svg` },
];

export const collarInsignia = [
    { group: "Uniform Collar Insignia", value: "cap", label: "CAP (Cadet Officers)", level: null, image: null },
    { group: "Uniform Collar Insignia", value: "cap_nco", label: "CAP (Cadet NCOs)", level: null, image: null },
    { group: "Uniform Collar Insignia", value: "us", label: "US (Officers)", level: null, image: null },
    { group: "Uniform Collar Insignia", value: "us_nco", label: "US (NCOs)", level: null, image: null },
];



export const serviceBadges = [
    { group: "Service Badge", value: "csag", label: "CAP Senior Advisory Group Badge", level: null, image: null },
    { group: "Service Badge", value: "cc", label: "CAP Command Council Badge", level: null, image: null },
    { group: "Service Badge", value: "nec", label: "National Executive Committee Badge", level: null, image: null },
    { group: "Service Badge", value: "nb", label: "National Board Badge", level: null, image: null },
    { group: "National Staff/Volunteer Badge", value: "ns", label: "National Staff/Volunteer Badge", level: null, image: null },
    { group: "Volunteer University Instructor Badge", value: "vu", label: "Volunteer University Instructor Badge", level: null, image: null },
];

export const commandInsigniaPin = [
    { group: "Command Insignia Pin", value: "cgc", label: "Current Group Commander", level: null, image: null },
    { group: "Command Insignia Pin", value: "csg", label: "Current Squadron Commander", level: null, image: null },
    { group: "Command Insignia Pin", value: "pgc", label: "Past Group Commander", level: null, image: null },
    { group: "Command Insignia Pin", value: "psg", label: "Past Squadron Commander", level: null, image: null },
];

export const aviationBadges = [
    { group: "Pilot Badge", value: "pilot", label: "Pilot", level: "basic", image: null },
    { group: "Pilot Badge", value: "senior_pilot", label: "Senior Pilot", level: "senior", image: null },
    { group: "Pilot Badge", value: "command_pilot", label: "Command Pilot", level: "command", image: null },

    { group: "Observer Badge", value: "observer", label: "Observer", level: "basic", image: null },
    { group: "Observer Badge", value: "senior_observer", label: "Senior Observer", level: "senior", image: null },
    { group: "Observer Badge", value: "master_observer", label: "Master Observer", level: "master", image: null },

    { group: "Air Crew Badge", value: "air_crew", label: "Air Crew", level: "basic", image: null },
    { group: "Air Crew Badge", value: "senior_air_crew", label: "Senior Air Crew", level: "senior", image: null },
    { group: "Air Crew Badge", value: "master_air_crew", label: "Master Air Crew", level: "master", image: null },

    { group: "Glider Pilot Badge", value: "glider_pilot", label: "Glider Pilot", level: null, image: null },
    { group: "Balloon Pilot Badge", value: "balloon_pilot", label: "Balloon Pilot", level: null, image: null },
    { group: "Solo Badge", value: "solo_badge", label: "Solo Badge", level: null, image: null },
    { group: "Pre-Solo Badge", value: "pre_solo_badge", label: "Pre-Solo Badge", level: null, image: null },

    { group: "sUAS Pilot Badge", value: "suas_pilot", label: "sUAS Pilot", level: "basic", image: null },
    { group: "sUAS Pilot Badge", value: "senior_suas_pilot", label: "Senior sUAS Pilot", level: "senior", image: null },
    { group: "sUAS Pilot Badge", value: "command_suas_pilot", label: "Command sUAS Pilot", level: "command", image: null },

    { group: "sUAS Technician Badge", value: "suas_technician", label: "sUAS Technician", level: "basic", image: null },
    { group: "sUAS Technician Badge", value: "senior_suas_technician", label: "Senior sUAS Technician", level: "senior", image: null },
    { group: "sUAS Technician Badge", value: "master_suas_technician", label: "Master sUAS Technician", level: "master", image: null },

    { group: "Cadet sUAS Badge", value: "cadet_suas_badge", label: "Cadet sUAS Badge", level: null, image: null },
    { group: "Cadet Model Rocketry Badge", value: "cadet_model_rocketry_badge", label: "Cadet Model Rocketry Badge", level: null, image: null },
];

export const occupationalBadges = [
    { group: "Chaplain Insignia", value: "chaplaininsignia_jewish", label: "Chaplain Insignia - Jewish", level: null, image: null },
    { group: "Chaplain Insignia", value: "chaplaininsignia_christian", label: "Chaplain Insignia - Christian", level: null, image: null },
    { group: "Chaplain Insignia", value: "chaplaininsignia_buddhist", label: "Chaplain Insignia - Buddhist", level: null, image: null },
    { group: "Chaplain Insignia", value: "chaplaininsignia_muslim", label: "Chaplain Insignia - Muslim", level: null, image: null },

    { group: "Medical Officer Badge", value: "medical_officer_badge", label: "Medical Officer Badge", level: null, image: null },
    { group: "Medical Officer Badge", value: "nurse_officer_badge", label: "Nurse Officer Badge", level: null, image: null },

    { group: "Legal Officer Badge", value: "legal_officer_badge", label: "Legal Officer Badge", level: null, image: null },

    { group: "Ground Team Badge", value: "ground_team_badge_basic", label: "Ground Team Badge - Basic", level: "basic", image: null },
    { group: "Ground Team Badge", value: "ground_team_badge_senior", label: "Ground Team Badge - Senior", level: "senior", image: null },
    { group: "Ground Team Badge", value: "ground_team_badge_master", label: "Ground Team Badge - Master", level: "master", image: null },

    { group: "Incident Commander Badge", value: "incident_commander_badge_1", label: "Incident Commander 1 Badge", level: "1", image: null },
    { group: "Incident Commander Badge", value: "incident_commander_badge_2", label: "Incident Commander 2 Badge", level: "2", image: null },
    { group: "Incident Commander Badge", value: "incident_commander_badge_3", label: "Incident Commander 3 Badge", level: "3", image: null },

    { group: "Emergency Medical Technician Badge", value: "emt_badge_basic", label: "EMT Badge - Basic", level: "basic", image: null },
    { group: "Emergency Medical Technician Badge", value: "emt_badge_intermediate", label: "EMT Badge - Intermediate", level: "intermediate", image: null },
    { group: "Emergency Medical Technician Badge", value: "emt_badge_paramedic", label: "EMT Badge - Paramedic", level: "paramedic", image: null },
];

export const specialtyTrackBadges = [
    { group: "Personnel", value: "personnel_badge_technician", label: "Personnel Badge - Technician", level: "technician", image: null },
    { group: "Personnel", value: "personnel_badge_senior", label: "Personnel Badge - Senior", level: "senior", image: null },
    { group: "Personnel", value: "personnel_badge_master", label: "Personnel Badge - Master", level: "master", image: null },

    { group: "Aerospace Education", value: "aerospace_education_badge_technician", label: "Aerospace Education Badge - Technician", level: "technician", image: null },
    { group: "Aerospace Education", value: "aerospace_education_badge_senior", label: "Aerospace Education Badge - Senior", level: "senior", image: null },
    { group: "Aerospace Education", value: "aerospace_education_badge_master", label: "Aerospace Education Badge - Master", level: "master", image: null },

    { group: "Public Affairs", value: "public_affairs_badge_technician", label: "Public Affairs Badge - Technician", level: "technician", image: null },
    { group: "Public Affairs", value: "public_affairs_badge_senior", label: "Public Affairs Badge - Senior", level: "senior", image: null },
    { group: "Public Affairs", value: "public_affairs_badge_master", label: "Public Affairs Badge - Master", level: "master", image: null },

    { group: "Cadet Program", value: "cadet_program_badge_technician", label: "Cadet Program Badge - Technician", level: "technician", image: null },
    { group: "Cadet Program", value: "cadet_program_badge_senior", label: "Cadet Program Badge - Senior", level: "senior", image: null },
    { group: "Cadet Program", value: "cadet_program_badge_master", label: "Cadet Program Badge - Master", level: "master", image: null },

    { group: "Finance", value: "finance_badge_technician", label: "Finance Badge - Technician", level: "technician", image: null },
    { group: "Finance", value: "finance_badge_senior", label: "Finance Badge - Senior", level: "senior", image: null },
    { group: "Finance", value: "finance_badge_master", label: "Finance Badge - Master", level: "master", image: null },

    { group: "Safety", value: "safety_badge_technician", label: "Safety Badge - Technician", level: "technician", image: null },
    { group: "Safety", value: "safety_badge_senior", label: "Safety Badge - Senior", level: "senior", image: null },
    { group: "Safety", value: "safety_badge_master", label: "Safety Badge - Master", level: "master", image: null },

    { group: "Inspector General", value: "inspector_general_badge_technician", label: "Inspector General Badge - Technician", level: "technician", image: null },
    { group: "Inspector General", value: "inspector_general_badge_senior", label: "Inspector General Badge - Senior", level: "senior", image: null },
    { group: "Inspector General", value: "inspector_general_badge_master", label: "Inspector General Badge - Master", level: "master", image: null },

    { group: "Legal", value: "legal_badge_technician", label: "Legal Badge - Technician", level: "technician", image: null },
    { group: "Legal", value: "legal_badge_senior", label: "Legal Badge - Senior", level: "senior", image: null },
    { group: "Legal", value: "legal_badge_master", label: "Legal Badge - Master", level: "master", image: null },

    { group: "Professional Development", value: "professional_development_badge_technician", label: "Professional Development Badge - Technician", level: "technician", image: null },
    { group: "Professional Development", value: "professional_development_badge_senior", label: "Professional Development Badge - Senior", level: "senior", image: null },
    { group: "Professional Development", value: "professional_development_badge_master", label: "Professional Development Badge - Master", level: "master", image: null },

    { group: "Health Services", value: "health_services_badge_technician", label: "Health Services Badge - Technician", level: "technician", image: null },
    { group: "Health Services", value: "health_services_badge_senior", label: "Health Services Badge - Senior", level: "senior", image: null },
    { group: "Health Services", value: "health_services_badge_master", label: "Health Services Badge - Master", level: "master", image: null },

    { group: "Administration", value: "administration_badge_technician", label: "Administration Badge - Technician", level: "technician", image: null },
    { group: "Administration", value: "administration_badge_senior", label: "Administration Badge - Senior", level: "senior", image: null },
    { group: "Administration", value: "administration_badge_master", label: "Administration Badge - Master", level: "master", image: null },

    { group: "Chaplain", value: "chaplain_badge_technician", label: "Chaplain Badge - Technician", level: "technician", image: null },
    { group: "Chaplain", value: "chaplain_badge_senior", label: "Chaplain Badge - Senior", level: "senior", image: null },
    { group: "Chaplain", value: "chaplain_badge_master", label: "Chaplain Badge - Master", level: "master", image: null },

    { group: "Operations", value: "operations_badge_technician", label: "Operations Badge - Technician", level: "technician", image: null },
    { group: "Operations", value: "operations_badge_senior", label: "Operations Badge - Senior", level: "senior", image: null },
    { group: "Operations", value: "operations_badge_master", label: "Operations Badge - Master", level: "master", image: null },

    { group: "Historian", value: "historian_badge_technician", label: "Historian Badge - Technician", level: "technician", image: null },
    { group: "Historian", value: "historian_badge_senior", label: "Historian Badge - Senior", level: "senior", image: null },
    { group: "Historian", value: "historian_badge_master", label: "Historian Badge - Master", level: "master", image: null },

    { group: "Logistics", value: "logistics_badge_technician", label: "Logistics Badge - Technician", level: "technician", image: null },
    { group: "Logistics", value: "logistics_badge_senior", label: "Logistics Badge - Senior", level: "senior", image: null },
    { group: "Logistics", value: "logistics_badge_master", label: "Logistics Badge - Master", level: "master", image: null },

    { group: "Command", value: "command_badge_technician", label: "Command Badge - Technician", level: "technician", image: null },
    { group: "Command", value: "command_badge_senior", label: "Command Badge - Senior", level: "senior", image: null },
    { group: "Command", value: "command_badge_master", label: "Command Badge - Master", level: "master", image: null },

    { group: "Standardization & Evaluation", value: "standardization_evaluation_badge_technician", label: "Standardization & Evaluation Badge - Technician", level: "technician", image: null },
    { group: "Standardization & Evaluation", value: "standardization_evaluation_badge_senior", label: "Standardization & Evaluation Badge - Senior", level: "senior", image: null },
    { group: "Standardization & Evaluation", value: "standardization_evaluation_badge_master", label: "Standardization & Evaluation Badge - Master", level: "master", image: null },

    { group: "Character Development", value: "character_development_badge_technician", label: "Character Development Badge - Technician", level: "technician", image: null },
    { group: "Character Development", value: "character_development_badge_senior", label: "Character Development Badge - Senior", level: "senior", image: null },
    { group: "Character Development", value: "character_development_badge_master", label: "Character Development Badge - Master", level: "master", image: null },

    { group: "Emergency Services", value: "emergency_services_badge_technician", label: "Emergency Services Badge - Technician", level: "technician", image: null },
    { group: "Emergency Services", value: "emergency_services_badge_senior", label: "Emergency Services Badge - Senior", level: "senior", image: null },
    { group: "Emergency Services", value: "emergency_services_badge_master", label: "Emergency Services Badge - Master", level: "master", image: null },

    { group: "Recruiting and Retention", value: "recruiting_retention_badge_technician", label: "Recruiting and Retention Badge - Technician", level: "technician", image: null },
    { group: "Recruiting and Retention", value: "recruiting_retention_badge_senior", label: "Recruiting and Retention Badge - Senior", level: "senior", image: null },
    { group: "Recruiting and Retention", value: "recruiting_retention_badge_master", label: "Recruiting and Retention Badge - Master", level: "master", image: null },

    { group: "Communication", value: "communication_badge_technician", label: "Communication Badge - Technician", level: "technician", image: null },
    { group: "Communication", value: "communication_badge_senior", label: "Communication Badge - Senior", level: "senior", image: null },
    { group: "Communication", value: "communication_badge_master", label: "Communication Badge - Master", level: "master", image: null },

    { group: "Information Technology", value: "information_technology_badge_technician", label: "Information Technology Badge - Technician", level: "technician", image: null },
    { group: "Information Technology", value: "information_technology_badge_senior", label: "Information Technology Badge - Senior", level: "senior", image: null },
    { group: "Information Technology", value: "information_technology_badge_master", label: "Information Technology Badge - Master", level: "master", image: null },

];

export const additionalBadges = [
    { group: "NRA Marksmanship", value: "nra_distinguished_expert", label: "NRA Distinguished Expert Badge", level: "distinguished", image: null },
    { group: "NRA Marksmanship", value: "nra_expert", label: "NRA Expert Badge", level: "expert", image: null },
    { group: "NRA Marksmanship", value: "nra_sharpshooter", label: "NRA Sharpshooter Badge", level: "sharpshooter", image: null },
    { group: "NRA Marksmanship", value: "nra_marksman_first_class", label: "NRA Marksman First-Class Badge", level: "first_class", image: null },
    { group: "NRA Marksmanship", value: "nra_marksman", label: "NRA Marksman Badge", level: "marksman", image: null },
    { group: "NRA Marksmanship", value: "nra_pro_marksman", label: "NRA Pro-Marksman Badge", level: "pro_marksman", image: null },

    { group: "Cadet STEM Badge", value: "cadet_stem_basic", label: "Cadet STEM Badge - Basic (Blue Star)", level: "basic", image: null },
    { group: "Cadet STEM Badge", value: "cadet_stem_advanced", label: "Cadet STEM Badge - Advanced (Silver Star)", level: "advanced", image: null },
    { group: "Cadet STEM Badge", value: "cadet_stem_master", label: "Cadet STEM Badge - Master (Gold Star)", level: "master", image: null },

    { group: "Cadet Cyber Badge", value: "cadet_cyber_basic", label: "Cadet Cyber Badge - Basic (Blue Star)", level: "basic", image: null },
    { group: "Cadet Cyber Badge", value: "cadet_cyber_advanced", label: "Cadet Cyber Badge - Advanced (Silver Star)", level: "advanced", image: null },
    { group: "Cadet Cyber Badge", value: "cadet_cyber_master", label: "Cadet Cyber Badge - Master (Gold Star)", level: "master", image: null },
];

export const patches = [
    { group: "American Flag Patch", value: "american_flag_patch", label: "American Flag Patch", level: null, image: null },
    { group: "CAP Command Patch", value: "cap_command_patch", label: "CAP Command Patch", level: null, image: null },
    { group: "National Shoulder Rocker Patch", value: "national_shoulder_rocker", label: "National Shoulder Rocker", level: null, image: null },
    { group: "Region Shield Patch", value: "region_shield_patch", label: "Region Shield Patch", level: null, image: null },
    { group: "Wing Patch Patch", value: "wing_patch", label: "Wing Patch", level: null, image: null },
    { group: "Overseas Unit Patch", value: "overseas_unit_shoulder_patch", label: "Overseas Unit Shoulder Patch", level: null, image: null },
    { group: "National Check Pilot Patch", value: "national_check_pilot_patch", label: "National Check Pilot Patch", level: null, image: null },
    { group: "Pilot Proficiency Patch", value: "pilot_proficiency_patch", label: "Pilot Proficiency Patch", level: null, image: null },
    { group: "AFRCC Basic Inland Search and Rescue Course (BISC) Patch", value: "afrcc_basic_inland_search_rescue_patch", label: "AFRCC Basic Inland Search and Rescue Course (BISC) Patch", level: null, image: null },
    { group: "Inland SAR Planning Course Patch", value: "inland_sar_planning_course_patch", label: "Inland SAR Planning Course Patch", level: null, image: null },
    { group: "Cadet Orientation Pilot Patch", value: "cadet_orientation_pilot_patch", label: "Cadet Orientation Pilot Patch", level: null, image: null },
    { group: "AFJROTC Patch", value: "afjrotc_patch", label: "AFJROTC Patch", level: null, image: null },
    { group: "Venture/Aviation Explorer Patch", value: "venture_aviation_explorer_patch", label: "Venture/Aviation Explorer Patch", level: null, image: null },
    { group: "Communications Patch", value: "communications_patch", label: "Communications Patch", level: null, image: null },
    { group: "Safety Patch", value: "safety_patch", label: "Safety Patch", level: null, image: null },
    { group: "Model Rocketry Patch", value: "model_rocketry_patch", label: "Model Rocketry Patch", level: null, image: null },
    { group: "Emergency Services Patch", value: "emergency_services_patch", label: "Emergency Services Patch (style 1 & 2)", level: null, image: null },
    { group: "CPR Patch", value: "cpr_patch", label: "Cardiopulmonary Resuscitation (CPR) Patch", level: null, image: null },
    { group: "ARCHER Patch", value: "archer_patch", label: "ARCHER Patch", level: null, image: null },
    { group: "CISM Patch", value: "cism_patch", label: "Critical Incident Stress Management (CISM) Patch", level: null, image: null },
    { group: "NASAR Patch", value: "nasar_patch", label: "National Association for Search and Rescue (NASAR) Patch", level: null, image: null },
];

export const ncsaPatches = [
    { group: "NCSA AFSCFC Patch", value: "air_force_space_command_familiarization_course", label: "Air Force Space Command Familiarization Course", level: null, image: null },
    { group: "NCSA AFCEA Patch", value: "air_force_civil_engineering_academy", label: "Air Force Civil Engineering Academy", level: null, image: null },
    { group: "NCSA COS Patch", value: "cadet_officer_school", label: "Cadet Officer School", level: null, image: null },
    { group: "NCSA NESA Patch", value: "national_emergency_services_academy", label: "National Emergency Services Academy", image: null },
    { group: "NCSA HMRS Patch", value: "hawk_mountain_ranger_school", label: "Hawk Mountain Ranger School", level: null, image: null },
    { group: "NCSA QT Patch", value: "hawk_mountain_ranger_qualification_tabs", label: "Hawk Mountain Ranger Qualification Tabs", level: null, image: null },
    { group: "NCSA HGA Patch", value: "honor_guard_academy", label: "Honor Guard Academy", level: null, image: null },
    { group: "NCSA NBB Patch", value: "national_blue_beret", label: "National Blue Beret", level: null, image: null },
    { group: "NCSA EA Patch", value: "engineering_academy", label: "Engineering Academy", level: null, image: null },
    { group: "NCSA NFA Patch", value: "national_flight_academy", label: "National Flight Academy", level: null, image: null },
    { group: "NCSA POC Patch", value: "pararescue_orientation_course", label: "Pararescue Orientation Course", level: null, image: null },
    { group: "NCSA SUPTFC Patch", value: "specialized_undergraduate_pilot_training_familiarization_course", label: "Specialized Undergraduate Pilot Training Familiarization Course", level: null, image: null },
];

export const shoulderCords = [
    { group: "Shoulder Cord", value: "gold", label: "Gold - National Cadet Advisory Council", level: null, image: null },
    { group: "Shoulder Cord", value: "blue", label: "Blue - Region Cadet Advisory Council", level: null, image: null },
    { group: "Shoulder Cord", value: "red", label: "Red - Wing Cadet Advisory Council", level: null, image: null },
    { group: "Shoulder Cord", value: "green", label: "Green - Group Cadet Advisory Council", level: null, image: null },
    { group: "Shoulder Cord", value: "white", label: "White - Drill or Color Guard Competition/Team", level: null, image: null },
    { group: "Shoulder Cord", value: "silver", label: "Silver - Honor Guard Academy graduate or member", level: null, image: null },
    { group: "Shoulder Cord", value: "gray", label: "Gray - USAF Aide de Camp", level: null, image: null },
    { group: "Shoulder Cord", value: "black", label: "Cadet of the Month/Quarter", level: null, image: null },
    { group: "Shoulder Cord", value: "mix", label: "Region/Wing Supplmented Cord", level: null, image: null },
];