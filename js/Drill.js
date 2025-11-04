// formation.js

// Images folder base path
const IMG_BASE_PATH = "../../images/diagrams/drill/";

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
            imageFile: "Guide.svg",
        });

        // Position 2 = Guide
        cadets.push({
            flight: flight.label,
            position: 2,
            imageFile: "Flight_Sergeant.svg",
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
    const spacingX = 60;
    const spacingY = 65;

    flights.forEach((flight, flightIndex) => {
        const flightOffsetX = flightIndex * 400;

        const flightCadets = cadets.filter(c => c.flight === flight.label);

        const flightSgt = flightCadets.find(c => c.position === 1);
        const guide = flightCadets.find(c => c.position === 2);

        // Cadets excluding staff (from position 3 up)
        const nonStaffStartPos = 3;
        const nonStaffCadets = flightCadets.filter(c => c.position >= nonStaffStartPos);

        const rows = numElementLeaders;

        // Calculate number of columns needed (excluding guide col)
        const cadetCols = Math.ceil(nonStaffCadets.length / rows);
        const totalCols = cadetCols + 1; // +1 for guide column

        // Create grid array: grid[col][row]
        const grid = Array.from({ length: totalCols }, () => Array(rows).fill(null));

        // Place guide in col 0, bottom row (row = rows - 1)
        if (guide) {
            grid[0][rows - 1] = guide;
        }

        // Place cadets in cols 1 to totalCols - 1
        nonStaffCadets.forEach((cdt, idx) => {
            const colFromRight = Math.floor(idx / rows) + 1; // starting at 1
            const canvasCol = totalCols - colFromRight; // convert right-left index to canvas col
            const posInCol = idx % rows;

            // For leftmost col (canvasCol === 0), fill bottom-up, else top-down
            let rowIndex;
            if (canvasCol === 0) {
                rowIndex = rows - 1 - posInCol; // bottom up
            } else {
                rowIndex = posInCol; // top down
            }

            grid[canvasCol][rowIndex] = cdt;
        });

        // Push all positions including nulls for "none"
        for (let col = 0; col < totalCols; col++) {
            for (let row = 0; row < rows; row++) {
                const cdt = grid[col][row];
                positions.push({
                    flight: flight.label,
                    position: cdt ? cdt.position : null,
                    imageFile: cdt ? cdt.imageFile : null, // no image for none
                    x: baseX + flightOffsetX + spacingX * col,
                    y: baseY + spacingY * row,
                });
            }
        }

        // Flight Sergeant to the right of guide column, bottom row
        if (flightSgt) {
            positions.push({
                ...flightSgt,
                x: baseX + flightOffsetX + spacingX * (totalCols + 1),
                y: baseY + spacingY * (rows - 1),
            });
        }
    });

    return positions;
}

// Draw all cadet images on canvas
async function drawFormation(positions) {
    const uniqueImages = [...new Set(positions.filter(c => c.imageFile).map(c => c.imageFile))];

    try {
        await Promise.all(uniqueImages.map(img => loadImage(img)));
    } catch (e) {
        alert(e.message);
        return;
    }

    positions.forEach(cdt => {
        const size = 120;
        const half = size / 2;

        if (cdt.imageFile && !cdt.isEmpty) {
            const img = loadedImages[cdt.imageFile];
            if (img) {
                ctx.drawImage(img, cdt.x - half, cdt.y - half, size, size);
            }
        } else {
            // Draw "none" for empty spots
        }
        // Draw image
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
