// uniformBadgeMap.js
import * as uniformData from '../uniformData.js';

export const uniformBadgeMap = {
    ClassA: uniformData.serviceDressUniform,
    ClassB: uniformData.blueServiceUniform,
    //ABU: uniformData.airmanBattleUniform,
    //fdu: uniformData.flightDutyUniform,
    //cfdu: uniformData.corporateFlightDutyUniform,
    //cfu: uniformData.corporateFieldUniform,
    //corporate_semi_formal: uniformData.corporateSemiFormalUniform,
    //corporate_service_dress: uniformData.corporateServiceDressUniform,
    //aviator_shirt: uniformData.aviatorShirtUniform,
    //semi_formal_dress: uniformData.semiFormalUniform,
    //hgu: uniformData.hgu, // if you have Honor Guard uniform
    //mess_dress: uniformData.messDressUniform,
    //corporate_working: uniformData.corporateWorkingUniform,
};

const uniformArrays = {
    messDressUniform: "Mess Dress Uniform",
    semiFormalUniform: "Semi-Formal Uniform",
    corporateSemiFormalUniform: "Corporate Semi-Formal Uniform",

    serviceDressUniform: "Service Dress Uniform (Class A)",
    blueServiceUniform: "Blue Service Uniform (Class B)",
    corporateServiceDressUniform: "Corporate Semi-Formal",
    aviatorShirtUniform: "Aviator Shirt Uniform",
    corporateWorkingUniform: "Corporate Working Uniform",

    airmanBattleUniform: "Airman Battle Uniform",
    battleDressUniform: "Battle Dress Uniform",
    flightDutyUniform: "Flight Duty Uniform",
    corporateWorkingUniform: "Corporate Working Uniform",
    corporateFlightDutyUniform: "Corporate Flight Duty Uniform",
    corporateFieldUniform: "Corporate Field Uniform",

    OCPs: "OCPs",
};

const badgeArrays = {
    serviceBadges: "Service Badges",
    aviationBadges: "Aviation Badges",
    occupationalBadges: "Occupational Badges",
    commandInsigniaPin: "Command Insignia Pin",

    //abus
    ncsaPatches: "NCSA Patches",
    patches: "Patches",

    //blues
    shoulderCords: "Shoulder Cords",
    specialtyTrackBadges: "Specialty Track Badges",
    cadetBadges: "Cadet Badges",
};