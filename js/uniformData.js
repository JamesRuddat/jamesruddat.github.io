export const memberTypes = [
    { value: "cadet", label: "Cadet" },
    { value: "adult", label: "Adult" }
];

export const cadetGrades = [
    { value: "cadet_airman_basic", label: "Cadet Airman Basic (C/AB)" },
    { value: "cadet_airman", label: "Cadet Airman (C/Amn)" },
    { value: "cadet_airman_first_class", label: "Cadet Airman First Class (C/A1C)" },
    { value: "cadet_senior_airman", label: "Cadet Senior Airman (C/SrA)" },
    { value: "cadet_staff_sergeant", label: "Cadet Staff Sergeant (C/SSgt)" },
    { value: "cadet_technical_sergeant", label: "Cadet Technical Sergeant (C/TSgt)" },
    { value: "cadet_master_sergeant", label: "Cadet Master Sergeant (C/MSgt)" },
    { value: "cadet_senior_master_sergeant", label: "Cadet Senior Master Sergeant (C/SMSgt)" },
    { value: "cadet_chief_master_sergeant", label: "Cadet Chief Master Sergeant (C/CMSgt)" },
    { value: "cadet_second_lieutenant", label: "Cadet Second Lieutenant (C/2d Lt)" },
    { value: "cadet_first_lieutenant", label: "Cadet First Lieutenant (C/1st Lt)" },
    { value: "cadet_captain", label: "Cadet Captain (C/Capt)" },
    { value: "cadet_major", label: "Cadet Major (C/Maj)" },
    { value: "cadet_lieutenant_colonel", label: "Cadet Lieutenant Colonel (C/Lt Col)" },
    { value: "cadet_colonel", label: "Cadet Colonel (C/Col)" },
];

export const seniorGrades = [
    { value: "senior_member_no_grade", label: "Senior Member (No Grade)" },
    { value: "staff_sergeant", label: "Staff Sergeant (SSgt)" },
    { value: "technical_sergeant", label: "Technical Sergeant (TSgt)" },
    { value: "master_sergeant", label: "Master Sergeant (MSgt)" },
    { value: "senior_master_sergeant", label: "Senior Master Sergeant (SMSgt)" },
    { value: "chief_master_sergeant", label: "Chief Master Sergeant (CMSgt)" },
    { value: "flight_officer", label: "Flight Officer (FO)" },
    { value: "technical_flight_officer", label: "Technical Flight Officer (TFO)" },
    { value: "senior_flight_officer", label: "Senior Flight Officer (SFO)" },
    { value: "second_lieutenant", label: "Second Lieutenant (2d Lt)" },
    { value: "first_lieutenant", label: "First Lieutenant (1st Lt)" },
    { value: "captain", label: "Captain (Capt)" },
    { value: "major", label: "Major (Maj)" },
    { value: "lieutenant_colonel", label: "Lieutenant Colonel (Lt Col)" },
    { value: "colonel", label: "Colonel (Col)" },
    { value: "brigadier_general", label: "Brigadier General (Brig Gen)" },
    { value: "major_general", label: "Major General (Maj Gen)" },
];

export const intergroupUniforms = [
    { value: "class_a", label: "Service Dress Uniform (Class A)", uniformCategory: "badge" },
    { value: "class_b", label: "Blue Service Uniform (Class B)", uniformCategory: "badge" },
    { value: "abu", label: "Airman Battle Uniform (ABU)", uniformCategory: "patch" },
    { value: "fdu", label: "Flight Duty Uniform (FDU)", uniformCategory: "flight" },
    { value: "cfdu", label: "Corporate Flight Duty Uniform (CFDU)", uniformCategory: "flight" },
    { value: "corporate_field", label: "Corporate Field Uniform", uniformCategory: "patch" },
    { value: "aviator_shirt", label: "Aviator Shirt Uniform", uniformCategory: "badge" },
    { value: "bdu", label: "Battle Dress Uniform (BDU)", uniformCategory: "patch" },
    { value: "ocp", label: "Operational Camouflage Pattern (OCP)", uniformCategory: "patch" }
];

export const seniorUniforms = [
    { value: "mess_dress", label: "Mess Dress Uniform", uniformCategory: "badge" },
    { value: "corporate_semi_formal", label: "Corporate Semi-Formal Uniform", uniformCategory: "badge" },
    { value: "corporate_service_dress", label: "Corporate Service Dress Uniform", uniformCategory: "badge" },
    { value: "corporate_working", label: "Corporate Working Uniform", uniformCategory: "patch" },
];

export const cadetUniforms = [
    { value: "semi_formal_dress", label: "Semi-Formal Dress Uniform", uniformCategory: "badge" },
    { value: "hgu", label: "Honor Guard Uniform", uniformCategory: "badge" },
];

export const uniformNameplates = [
    { value: "blazer_nameplate", label: "Blazer Nameplate" },
    { value: "brush_silver_nameplate", label: "Brush Silver Nameplate" },
    { value: "cap_nameplate_cadet", label: "CAP Nameplate - Cadets" },
    { value: "cap_nameplate_adult", label: "CAP Nameplate - Adults" },
    { value: "flight_suit_embroidered_name_tag", label: "Dark Blue Embroidered Flight Suit Name Tag" },
    { value: "black_leather_jacket_name_tag", label: "Black Leather Jacket Name Tag" },
    { value: "black_leather_flight_suit_name_tag", label: "Black Leather Flight Suit Name Tag" },
    { value: "abu_name_tag", label: "ABU Name Tag" },
    { value: "abu_cap_tag", label: "ABU CAP Tag" }
];

export const uniformCollarInsignia = [
    { value: "cap", label: "CAP (Cadet Officers)" },
    { value: "cap_nco", label: "CAP (Cadet NCOs)" },
    { value: "us", label: "US (Officers)" },
    { value: "us_nco", label: "US (NCOs)" }
];

export const uniformSexTypes = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "unisex", label: "Unisex" }
];

export const serviceBadges = [
    { value: "csag", label: "CAP Senior Advisory Group Badge" },
    { value: "cc", label: "CAP Command Council Badge" },
    { value: "nec", label: "National Executive Committee Badge" },
    { value: "nb", label: "National Board Badge" },
    { value: "ns", label: "National Staff/Volunteer Badge" },
    { value: "vu", label: "Volunteer University Instructor Badge" }
];

export const commandInsigniaPin = [
    { value: "cgc", label: "Current Group Commander" },
    { value: "csg", label: "Current Squadron Commander" },
    { value: "pgc", label: "Past Group Commander" },
    { value: "psg", label: "Past Squadron Commander" }
];

export const aviationBadges = [
    { value: "command_pilot", label: "Command Pilot" },
    { value: "senior_pilot", label: "Senior Pilot" },
    { value: "pilot", label: "Pilot" },
    { value: "master_observer", label: "Master Observer" },
    { value: "senior_observer", label: "Senior Observer" },
    { value: "observer", label: "Observer" },
    { value: "master_air_crew", label: "Master Air Crew" },
    { value: "senior_air_crew", label: "Senior Air Crew" },
    { value: "air_crew", label: "Air Crew" },
    { value: "glider_pilot", label: "Glider Pilot" },
    { value: "balloon_pilot", label: "Balloon Pilot" },
    { value: "solo_badge", label: "Solo Badge" },
    { value: "pre_solo_badge", label: "Pre-Solo Badge (Not an aeronautical rating)" },
    { value: "command_suas_pilot", label: "Command sUAS Pilot" },
    { value: "senior_suas_pilot", label: "Senior sUAS Pilot" },
    { value: "suas_pilot", label: "sUAS Pilot" },
    { value: "master_suas_technician", label: "Master sUAS Technician" },
    { value: "senior_suas_technician", label: "Senior sUAS Technician" },
    { value: "suas_technician", label: "sUAS Technician" },
    { value: "cadet_suas_badge", label: "Cadet sUAS Badge" },
    { value: "cadet_model_rocketry_badge", label: "Cadet Model Rocketry Badge" },
];

export const occupationalBadges = [
    { value: "chaplaininsignia_jewish", label: "Chaplain Insignia - Jewish" },
    { value: "chaplaininsignia_christian", label: "Chaplain Insignia - Christian" },
    { value: "chaplaininsignia_buddhist", label: "Chaplain Insignia - Buddhist" },
    { value: "chaplaininsignia_muslim", label: "Chaplain Insignia - Muslim" },
    { value: "legal_officer_badge", label: "Legal Officer Badge" },
    { value: "medical_officer_badge", label: "Medical Officer Badge" },
    { value: "nurse_officer_badge", label: "Nurse Officer Badge" },
    { value: "ground_team_badge_basic", label: "Ground Team Badge - Basic" },
    { value: "ground_team_badge_senior", label: "Ground Team Badge - Senior" },
    { value: "ground_team_badge_master", label: "Ground Team Badge - Master" },
    { value: "incident_commander_badge_3", label: "Incident Commander 3 Badge" },
    { value: "incident_commander_badge_2", label: "Incident Commander 2 Badge" },
    { value: "incident_commander_badge_1", label: "Incident Commander 1 Badge" },
    { value: "emt_badge_basic", label: "Emergency Medical Technician Badge - EMT-Basic" },
    { value: "emt_badge_intermediate", label: "Emergency Medical Technician Badge - EMT-Intermediate" },
    { value: "emt_badge_paramedic", label: "Emergency Medical Technician Badge - Paramedic" },
];

export const specialtyTrackBadges = [
    { value: "personnel_badge_technician", label: "Personnel Badge - Technician" },
    { value: "personnel_badge_senior", label: "Personnel Badge - Senior" },
    { value: "personnel_badge_master", label: "Personnel Badge - Master" },
    { value: "aerospace_education_badge_technician", label: "Aerospace Education Badge - Technician" },
    { value: "aerospace_education_badge_senior", label: "Aerospace Education Badge - Senior" },
    { value: "aerospace_education_badge_master", label: "Aerospace Education Badge - Master" },
    { value: "public_affairs_badge_technician", label: "Public Affairs Badge - Technician" },
    { value: "public_affairs_badge_senior", label: "Public Affairs Badge - Senior" },
    { value: "public_affairs_badge_master", label: "Public Affairs Badge - Master" },
    { value: "cadet_program_badge_technician", label: "Cadet Program Badge - Technician" },
    { value: "cadet_program_badge_senior", label: "Cadet Program Badge - Senior" },
    { value: "cadet_program_badge_master", label: "Cadet Program Badge - Master" },
    { value: "finance_badge_technician", label: "Finance Badge - Technician" },
    { value: "finance_badge_senior", label: "Finance Badge - Senior" },
    { value: "finance_badge_master", label: "Finance Badge - Master" },
    { value: "safety_badge_technician", label: "Safety Badge - Technician" },
    { value: "safety_badge_senior", label: "Safety Badge - Senior" },
    { value: "safety_badge_master", label: "Safety Badge - Master" },
    { value: "inspector_general_badge_technician", label: "Inspector General Badge - Technician" },
    { value: "inspector_general_badge_senior", label: "Inspector General Badge - Senior" },
    { value: "inspector_general_badge_master", label: "Inspector General Badge - Master" },
    { value: "legal_badge_technician", label: "Legal Badge - Technician" },
    { value: "legal_badge_senior", label: "Legal Badge - Senior" },
    { value: "legal_badge_master", label: "Legal Badge - Master" },
    { value: "professional_development_badge_technician", label: "Professional Development Badge - Technician" },
    { value: "professional_development_badge_senior", label: "Professional Development Badge - Senior" },
    { value: "professional_development_badge_master", label: "Professional Development Badge - Master" },
    { value: "health_services_badge_technician", label: "Health Services Badge - Technician" },
    { value: "health_services_badge_senior", label: "Health Services Badge - Senior" },
    { value: "health_services_badge_master", label: "Health Services Badge - Master" },
    { value: "administration_badge_technician", label: "Administration Badge - Technician" },
    { value: "administration_badge_senior", label: "Administration Badge - Senior" },
    { value: "administration_badge_master", label: "Administration Badge - Master" },
    { value: "chaplain_badge_technician", label: "Chaplain Badge - Technician" },
    { value: "chaplain_badge_senior", label: "Chaplain Badge - Senior" },
    { value: "chaplain_badge_master", label: "Chaplain Badge - Master" },
    { value: "operations_badge_technician", label: "Operations Badge - Technician" },
    { value: "operations_badge_senior", label: "Operations Badge - Senior" },
    { value: "operations_badge_master", label: "Operations Badge - Master" },
    { value: "historian_badge_technician", label: "Historian Badge - Technician" },
    { value: "historian_badge_senior", label: "Historian Badge - Senior" },
    { value: "historian_badge_master", label: "Historian Badge - Master" },
    { value: "logistics_badge_technician", label: "Logistics Badge - Technician" },
    { value: "logistics_badge_senior", label: "Logistics Badge - Senior" },
    { value: "logistics_badge_master", label: "Logistics Badge - Master" },
    { value: "command_badge_technician", label: "Command Badge - Technician" },
    { value: "command_badge_senior", label: "Command Badge - Senior" },
    { value: "command_badge_master", label: "Command Badge - Master" },
    { value: "standardization_evaluation_badge_technician", label: "Standardization & Evaluation Badge - Technician" },
    { value: "standardization_evaluation_badge_senior", label: "Standardization & Evaluation Badge - Senior" },
    { value: "standardization_evaluation_badge_master", label: "Standardization & Evaluation Badge - Master" },
    { value: "character_development_badge_technician", label: "Character Development Badge - Technician" },
    { value: "character_development_badge_senior", label: "Character Development Badge - Senior" },
    { value: "character_development_badge_master", label: "Character Development Badge - Master" },
    { value: "emergency_services_badge_technician", label: "Emergency Services Badge - Technician" },
    { value: "emergency_services_badge_senior", label: "Emergency Services Badge - Senior" },
    { value: "emergency_services_badge_master", label: "Emergency Services Badge - Master" },
    { value: "recruiting_retention_badge_technician", label: "Recruiting and Retention Badge - Technician" },
    { value: "recruiting_retention_badge_senior", label: "Recruiting and Retention Badge - Senior" },
    { value: "recruiting_retention_badge_master", label: "Recruiting and Retention Badge - Master" },
    { value: "communication_badge_technician", label: "Communication Badge - Technician" },
    { value: "communication_badge_senior", label: "Communication Badge - Senior" },
    { value: "communication_badge_master", label: "Communication Badge - Master" },
    { value: "information_technology_badge_technician", label: "Information Technology Badge - Technician" },
    { value: "information_technology_badge_senior", label: "Information Technology Badge - Senior" },
    { value: "information_technology_badge_master", label: "Information Technology Badge - Master" }
];

export const addtionalBadges = [
    // NRA Marksmanship Badges (6 tiers)
    { value: "nra_distinguished_expert", label: "NRA Distinguished Expert Badge" },
    { value: "nra_expert", label: "NRA Expert Badge" },
    { value: "nra_sharpshooter", label: "NRA Sharpshooter Badge" },
    { value: "nra_marksman_first_class", label: "NRA Marksman First-Class Badge" },
    { value: "nra_marksman", label: "NRA Marksman Badge" },
    { value: "nra_pro_marksman", label: "NRA Pro-Marksman Badge" },

    // Cadet STEM Badge (3 tiers)
    { value: "cadet_stem_basic", label: "Cadet STEM Badge - Basic (Blue Star)" },
    { value: "cadet_stem_advanced", label: "Cadet STEM Badge - Advanced (Silver Star)" },
    { value: "cadet_stem_master", label: "Cadet STEM Badge - Master (Gold Star)" },

    // Cadet Cyber Badge (3 tiers)
    { value: "cadet_cyber_basic", label: "Cadet Cyber Badge - Basic (Blue Star)" },
    { value: "cadet_cyber_advanced", label: "Cadet Cyber Badge - Advanced (Silver Star)" },
    { value: "cadet_cyber_master", label: "Cadet Cyber Badge - Master (Gold Star)" }
];

export const patches = [
    { value: "american_flag_patch", label: "American Flag Patch" },
    { value: "cap_command_patch", label: "CAP Command Patch" },
    { value: "national_shoulder_rocker", label: "National Shoulder Rocker" },
    { value: "region_shield_patch", label: "Region Shield Patch" },
    { value: "wing_patch", label: "Wing Patch" },
    { value: "overseas_unit_shoulder_patch", label: "Overseas Unit Shoulder Patch" },
    { value: "national_check_pilot_patch", label: "National Check Pilot Patch" },
    { value: "pilot_proficiency_patch", label: "Pilot Proficiency Patch" },
    { value: "afrcc_basic_inland_search_rescue_patch", label: "AFRCC Basic Inland Search and Rescue Course (BISC) Patch" },
    { value: "inland_sar_planning_course_patch", label: "Inland SAR Planning Course Patch" },
    { value: "cadet_orientation_pilot_patch", label: "Cadet Orientation Pilot Patch" },
    { value: "afjrotc_patch", label: "AFJROTC Patch" },
    { value: "venture_aviation_explorer_patch", label: "Venture/Aviation Explorer Patch" },
    { value: "communications_patch", label: "Communications Patch" },
    { value: "safety_patch", label: "Safety Patch" },
    { value: "model_rocketry_patch", label: "Model Rocketry Patch" },
    { value: "emergency_services_patch", label: "Emergency Services Patch (style 1 & 2)" },
    { value: "cpr_patch", label: "Cardiopulmonary Resuscitation (CPR) Patch" },
    { value: "archer_patch", label: "ARCHER Patch" },
    { value: "cism_patch", label: "Critical Incident Stress Management (CISM) Patch" },
    { value: "nasar_patch", label: "National Association for Search and Rescue (NASAR) Patch" }
];

export const ncsaPatches = [
    { value: "air_force_space_command_familiarization_course", label: "Air Force Space Command Familiarization Course" },
    { value: "air_force_civil_engineering_academy", label: "Air Force Civil Engineering Academy" },
    { value: "cadet_officer_school", label: "Cadet Officer School" },
    { value: "national_emergency_services_academy", label: "National Emergency Services Academy" },
    { value: "hawk_mountain_ranger_school", label: "Hawk Mountain Ranger School" },
    { value: "hawk_mountain_ranger_qualification_tabs", label: "Hawk Mountain Ranger Qualification Tabs" },
    { value: "honor_guard_academy", label: "Honor Guard Academy" },
    { value: "national_blue_beret", label: "National Blue Beret" },
    { value: "engineering_academy", label: "Engineering Academy" },
    { value: "national_flight_academy", label: "National Flight Academy" },
    { value: "pararescue_orientation_course", label: "Pararescue Orientation Course" },
    { value: "specialized_undergraduate_pilot_training_familiarization_course", label: "Specialized Undergraduate Pilot Training Familiarization Course" }
];

export const shoulderCords = [
    { value: "gold", label: "Gold - National Cadet Advisory Council" },
    { value: "blue", label: "Blue - Region Cadet Advisory Council" },
    { value: "red", label: "Red - Wing Cadet Advisory Council" },
    { value: "green", label: "Green - Group Cadet Advisory Council" },
    { value: "white", label: "White - Drill or Color Guard Competition/Team" },
    { value: "silver", label: "Silver - Honor Guard Academy graduate or member" },
    { value: "gray", label: "Gray - USAF Aide de Camp" },
    { value: "black", label: "Cadet of the Month/Quarter" },
    { value: "mix", label: "Region/Wing Supplmented Cord" }
];
