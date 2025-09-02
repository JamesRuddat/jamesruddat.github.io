// uniformBadgeMap.js
import * as uniformData from '../uniformData.js';

export const uniformBadgeMap = {
    serviceDressUniform: {        
        hats: { displayName: "Hats", items: uniformData.hats },
        collars: { displayName: "Collars", items: uniformData.collars },
        ties: { displayName: "Ties", items: uniformData.ties },
        coats: { displayName: "Coats", items: uniformData.coats },
        shirts: { displayName: "Shirts", items: uniformData.shirts },
        pants: { displayName: "Pants", items: uniformData.pants },
        shoes: { displayName: "Shoes / Boots", items: uniformData.shoes },

        nameplates: { displayName: "Nameplates", items: uniformData.nameplates },

        outerwear: { displayName: "Outerwear", items: uniformData.outerwear },

        serviceBadges: { displayName: "Service Badges", items: uniformData.serviceBadges },
        aviationBadges: { displayName: "Aviation Badges", items: uniformData.aviationBadges },
        occupationalBadges: { displayName: "Occupational Badges", items: uniformData.occupationalBadges },
        commandInsigniaPin: { displayName: "Command Insignia Pin", items: uniformData.commandInsigniaPin },
        shoulderCords: { displayName: "Shoulder Cords", items: uniformData.shoulderCords },
        specialtyTrackBadges: { displayName: "Specialty Track Badges", items: uniformData.specialtyTrackBadges },
        cadetBadges: { displayName: "Cadet Badges", items: uniformData.cadetBadges },
    },
    blueServiceUniform: {
        hats: { displayName: "Hats", items: uniformData.hats },
        collars: { displayName: "Collars", items: uniformData.collars },
        ties: { displayName: "Ties", items: uniformData.ties },
        coats: { displayName: "Coats", items: uniformData.coats },
        shirts: { displayName: "Shirts", items: uniformData.shirts },
        pants: { displayName: "Pants", items: uniformData.pants },
        shoes: { displayName: "Shoes / Boots", items: uniformData.shoes },

        nameplates: { displayName: "Nameplates", items: uniformData.nameplates },

        outerwear: { displayName: "Outerwear", items: uniformData.outerwear },

        serviceBadges: { displayName: "Service Badges", items: uniformData.serviceBadges },
        aviationBadges: { displayName: "Aviation Badges", items: uniformData.aviationBadges },
        occupationalBadges: { displayName: "Occupational Badges", items: uniformData.occupationalBadges },
        commandInsigniaPin: { displayName: "Command Insignia Pin", items: uniformData.commandInsigniaPin },
        shoulderCords: { displayName: "Shoulder Cords", items: uniformData.shoulderCords },
        specialtyTrackBadges: { displayName: "Specialty Track Badges", items: uniformData.specialtyTrackBadges },
        cadetBadges: { displayName: "Cadet Badges", items: uniformData.cadetBadges },
    },
    
    airmanBattleUniform: {
        hats: { displayName: "Hats", items: uniformData.hats },
        collars: { displayName: "Collars", items: uniformData.collars },
        ties: { displayName: "Ties", items: uniformData.ties },
        coats: { displayName: "Coats", items: uniformData.coats },
        shirts: { displayName: "Shirts", items: uniformData.shirts },
        pants: { displayName: "Pants", items: uniformData.pants },
        shoes: { displayName: "Shoes / Boots", items: uniformData.shoes },

        nameplates: { displayName: "Nameplates", items: uniformData.nameplates },

        outerwear: { displayName: "Outerwear", items: uniformData.outerwear },

        serviceBadges: { displayName: "Service Badges", items: uniformData.serviceBadges },
        aviationBadges: { displayName: "Aviation Badges", items: uniformData.aviationBadges },
        occupationalBadges: { displayName: "Occupational Badges", items: uniformData.occupationalBadges },
        commandInsigniaPin: { displayName: "Command Insignia Pin", items: uniformData.commandInsigniaPin },
        ncsaPatches: { displayName: "NCSA Patches", items: uniformData.ncsaPatches },
        patches: { displayName: "Patches", items: uniformData.patches },
        cadetBadges: { displayName: "Cadet Badges", items: uniformData.cadetBadges },
    },
    corporateFieldUniform: {
        hats: { displayName: "Hats", items: uniformData.hats },
        collars: { displayName: "Collars", items: uniformData.collars },
        coats: { displayName: "Coats", items: uniformData.coats },
        shirts: { displayName: "Shirts", items: uniformData.shirts },
        pants: { displayName: "Pants", items: uniformData.pants },
        shoes: { displayName: "Shoes / Boots", items: uniformData.shoes },

        nameplates: { displayName: "Nameplates", items: uniformData.nameplates },

        outerwear: { displayName: "Outerwear", items: uniformData.outerwear },

        serviceBadges: { displayName: "Service Badges", items: uniformData.serviceBadges },
        aviationBadges: { displayName: "Aviation Badges", items: uniformData.aviationBadges },
        occupationalBadges: { displayName: "Occupational Badges", items: uniformData.occupationalBadges },
        commandInsigniaPin: { displayName: "Command Insignia Pin", items: uniformData.commandInsigniaPin },
        ncsaPatches: { displayName: "NCSA Patches", items: uniformData.ncsaPatches },
        patches: { displayName: "Patches", items: uniformData.patches },
        cadetBadges: { displayName: "Cadet Badges", items: uniformData.cadetBadges },
    },
    
    flightDutyUniform: {
        hats: { displayName: "Hats", items: uniformData.hats },
        collars: { displayName: "Collars", items: uniformData.collars },
        coats: { displayName: "Coats", items: uniformData.coats },
        shirts: { displayName: "Shirts", items: uniformData.shirts },
        pants: { displayName: "Pants", items: uniformData.pants },
        shoes: { displayName: "Shoes / Boots", items: uniformData.shoes },

        nameplates: { displayName: "Nameplates", items: uniformData.nameplates },


    },// ... repeat for each uniform
};


/*
const tempArrays = {
        messDressUniform: "Mess Dress Uniform",
        semiFormalUniform: "Semi-Formal Uniform",
        corporateSemiFormalUniform: "Corporate Semi-Formal Uniform",

        serviceDressUniform: "Service Dress Uniform (Class A)",
        blueServiceUniform: "Blue Service Uniform (Class B)",
        corporateServiceDressUniform: "Corporate Semi-Formal",
        aviatorShirtUniform: "Aviator Shirt Uniform",

        airmanBattleUniform: "Airman Battle Uniform",
        battleDressUniform: "Battle Dress Uniform",
        flightDutyUniform: "Flight Duty Uniform",
        corporateWorkingUniform: "Corporate Working Uniform",
        corporateFlightDutyUniform: "Corporate Flight Duty Uniform",
        corporateFieldUniform: "Corporate Field Uniform",

        OCPs: "OCPs",

        serviceBadges: "Service Badges",
        aviationBadges: "Aviation Badges",
        occupationalBadges: "Occupational Badges",
        commandInsigniaPin: "Command Insignia Pin",

        //ABUs
        ncsaPatches: "NCSA Patches",
        patches: "Patches",

        //blues
        shoulderCords: "Shoulder Cords",
        specialtyTrackBadges: "Specialty Track Badges",
        cadetBadges: "Cadet Badges",
    };
*/