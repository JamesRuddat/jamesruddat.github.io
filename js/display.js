import * as uniformData from '/js/uniformData.js';

// Map of arrays to their display names
const allDataArrays = {
    memberTypes: "Member Types",
    allGrades: "Grades",
    allUniforms: "Uniforms",
    classB: "Class B Options",
    classA: "Class A Options",
    nameplates: "Nameplates",
    collarInsignia: "Collar Insignia",
    genderTypes: "Gender Types",
    serviceBadges: "Service Badges",
    aviationBadges: "Aviation Badges",
    occupationalBadges: "Occupational Badges",
    ncsaPatches: "NCSA Patches",
    patches: "Patches",
    commandInsigniaPin: "Command Insignia Pin",
    shoulderCords: "Shoulder Cords",
    specialtyTrackBadges: "Specialty Track Badges"
};

document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById("form-container");

    Object.entries(allDataArrays).forEach(([arrayKey, displayName]) => {
        const arrayItems = uniformData[arrayKey] || [];
        if (!arrayItems.length) return; // skip empty arrays

        // Section title
        const header = document.createElement("h4");
        header.textContent = displayName;
        container.appendChild(header);

        // Display each item
        arrayItems.forEach(item => {
            const itemDiv = document.createElement("div");
            itemDiv.style.border = "1px solid #ccc";
            itemDiv.style.padding = "8px";
            itemDiv.style.margin = "4px 0";
            itemDiv.style.display = "flex";
            itemDiv.style.alignItems = "center";
            itemDiv.style.gap = "10px";

            // Image if exists
            if (item.image) {
                const img = document.createElement("img");
                img.src = "../" + item.image;

                img.alt = item.label || "Image";
                img.style.maxWidth = "100px";
                img.style.maxHeight = "90px";
                itemDiv.appendChild(img);
            }
            else {
                const img = document.createElement("img");
                img.src = "../uniformImages/A1C.png";

                img.alt = item.label || "Image";
                img.style.maxWidth = "70px";
                img.style.maxHeight = "70px";
                itemDiv.appendChild(img);
            }

            // Info
            const textDiv = document.createElement("div");
            textDiv.innerHTML = `<strong>${item.label || 'No label'}</strong><br>Value: ${item.value || 'N/A'}`;
            itemDiv.appendChild(textDiv);

            container.appendChild(itemDiv);
        });
    });
});
