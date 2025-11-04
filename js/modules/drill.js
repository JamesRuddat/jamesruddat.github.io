// formation.js

// Images folder base path
const IMG_BASE_PATH = "../../assets/images/diagrams/drill/";

const canvas = document.getElementById("formationCanvas");
const ctx = canvas.getContext("2d");

// Inputs
const formationTypeEl = document.getElementById("formationType");
const numFlightsEl = document.getElementById("numFlights");
const cadetsPerFlightEl = document.getElementById("cadetsPerFlight");
const flightPrefixEl = document.getElementById("flightPrefix");
const numElementLeadersEl = document.getElementById("numElementLeaders"); // New input for element leaders count

const generateBtn = document.getElementById("generateBtn");
const exportJSONBtn = document.getElementById("exportJSONBtn");

let loadedImages = {}; // cache for images

// Load image by filename
function loadImage(filename) {
    if (loadedImages[filename]) return Promise.resolve(loadedImages[filename]);

    return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = IMG_BASE_PATH + filename;
        img.onload = () => {
            loadedImages[filename] = img;
            resolve(img);
        };
        img.onerror = () => reject(new Error("Failed to load image " + filename));
    });
}

// Build flights array [{label, count}]
function buildFlights(numFlights, cadetsPerFlight, flightPrefix) {
    const flights = [];
    for (let i = 0; i < numFlights; i++) {
        const label = String.fromCharCode(flightPrefix.charCodeAt(0) + i);
        flights.push({ label, count: cadetsPerFlight });
    }
    return flights;
}

// Build cadet list with flight, position, id, and assigned image file
function buildCadets(flights, numElementLeaders, cadetsPerFlight) {
    const cadets = [];
    flights.forEach((flight) => {
        // Position 1 = Flight Sergeant
        cadets.push({
            flight: flight.label,
            position: 1,
            imageFile: "Flight_Sergeant.svg",
        });

        // Position 2 = Guide
        cadets.push({
            flight: flight.label,
            position: 2,
            imageFile: "Guide.svg",
        });

        // Element Leaders: positions 3 to (3 + numElementLeaders - 1)
        for (let i = 0; i < numElementLeaders; i++) {
            cadets.push({
                flight: flight.label,
                position: 3 + i,
                imageFile: "Element_Leader.svg",
            });
        }

        // Remaining cadets are Airmen to fill up to cadetsPerFlight total
        const airmenCount = cadetsPerFlight - (1 + numElementLeaders);

        for (let i = 0; i < airmenCount; i++) {
            const pos = 3 + numElementLeaders + i;
            cadets.push({
                flight: flight.label,
                position: pos,
                imageFile: "Airman.svg",
            });
        }
    });
    return cadets;
}

// Calculate positions for formation with explicit none slots
function calculatePositions(formationType, flights, cadets, numElementLeaders) {
    const positions = [];

    const baseX = 100;
    const baseY = 100;
    const spacingX = 65;
    const spacingY = 70;

    flights.forEach((flight, flightIndex) => {
        const flightOffsetX = flightIndex * 500;
        const flightCadets = cadets.filter(c => c.flight === flight.label);

        const flightSgt = flightCadets.find(c => c.position === 1);
        const guide = flightCadets.find(c => c.position === 2);
        const elementLeaders = flightCadets.filter(c => c.imageFile === "Element_Leader.svg");
        const airmen = flightCadets.filter(c => c.imageFile === "Airman.svg");

        const rows = numElementLeaders;
        const colsPerRow = Math.ceil(airmen.length / rows);
        const gridCols = colsPerRow + 2; // + ElemLeader + Guide columns

        // Create an empty grid [rows][cols]
        const grid = Array.from({ length: rows }, () => Array(gridCols).fill(null));

        // Fill each row (bottom row fills first)
        let airmanIndex = 0;
        for (let r = rows - 1; r >= 0; r--) {
            for (let c = gridCols - 3; c >= 0; c--) { // leave 2 cols for elem + guide
                if (airmanIndex < airmen.length) {
                    grid[r][c] = airmen[airmanIndex++];
                }
            }
            // Place Element Leader in second-to-last col
            grid[r][gridCols - 2] = elementLeaders[rows - 1 - r] || null;
        }

        // Place Guide in top row last col
        if (guide) grid[0][gridCols - 1] = guide;

        // Place Flight Sergeant bottom row, far left
        if (flightSgt) grid[rows - 1][0] = flightSgt;

        // Convert grid to coordinates
        grid.forEach((row, rowIdx) => {
            row.forEach((cell, colIdx) => {
                positions.push({
                    flight: flight.label,
                    position: cell ? cell.position : null,
                    imageFile: cell ? cell.imageFile : null,
                    x: baseX + flightOffsetX + spacingX * colIdx,
                    y: baseY + spacingY * rowIdx,
                });
            });
        });
    });

    return positions;
}


// Draw all cadet images on canvas
async function drawFormation(positions) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const uniqueImages = [...new Set(positions.filter(c => c.imageFile).map(c => c.imageFile))];

    try {
        await Promise.all(uniqueImages.map(img => loadImage(img)));
    } catch (e) {
        alert(e.message);
        return;
    }

    positions.forEach(cdt => {
        const width = 80;
        const height = 90; // you can adjust this or vary by image if needed
        const halfWidth = width / 2;

        if (cdt.imageFile) {
            const img = loadedImages[cdt.imageFile];
            if (img) {
                // Align bottom of image at cdt.y (standing line)
                ctx.drawImage(img, cdt.x - halfWidth, cdt.y - height, width, height);
            }
        } else {
            // Optional placeholder for empty spots
            ctx.strokeStyle = "#aaa";
            //ctx.strokeRect(cdt.x - halfWidth, cdt.y - height, width, height);
        }

        // Optional: label below the "feet"
    });
}

// Generate formation and render
async function generateAndDraw() {
    const formationType = formationTypeEl.value;
    const numFlights = parseInt(numFlightsEl.value);
    const cadetsPerFlight = parseInt(cadetsPerFlightEl.value);
    const flightPrefix = (flightPrefixEl.value || "A").toUpperCase();
    let numElementLeaders = parseInt(numElementLeadersEl.value);

    if (isNaN(numElementLeaders) || numElementLeaders < 2) numElementLeaders = 2;
    else if (numElementLeaders > 4) numElementLeaders = 4;

    const flights = buildFlights(numFlights, cadetsPerFlight, flightPrefix);
    const cadets = buildCadets(flights, numElementLeaders, cadetsPerFlight);
    const positions = calculatePositions(formationType, flights, cadets, numElementLeaders);

    await drawFormation(positions);

    window.currentFormationPositions = positions;
}

// Export JSON helper
function exportJSON() {
    if (!window.currentFormationPositions) return alert("Generate formation first");

    const jsonContent = JSON.stringify(window.currentFormationPositions, null, 2);
    const blob = new Blob([jsonContent], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "formation.json";
    a.click();

    URL.revokeObjectURL(url);
}

// Event listeners
generateBtn.addEventListener("click", generateAndDraw);
exportJSONBtn.addEventListener("click", exportJSON);

// Live update on input changes
[formationTypeEl, numFlightsEl, cadetsPerFlightEl, flightPrefixEl, numElementLeadersEl].forEach(el => {
    el.addEventListener("input", generateAndDraw);
});

// Initial draw
generateAndDraw();
