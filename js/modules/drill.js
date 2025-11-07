const IMG_BASE_PATH = "../../assets/images/diagrams/drill/";

const canvas = document.getElementById("formationCanvas");
const ctx = canvas.getContext("2d");

const formationTypeEl = document.getElementById("formationType");
const numFlightsEl = document.getElementById("numFlights");
const cadetsPerFlightEl = document.getElementById("cadetsPerFlight");
const flightPrefixEl = document.getElementById("flightPrefix");
const numElementLeadersEl = document.getElementById("numElementLeaders");

const exportPNGBtn = document.getElementById("exportPNGBtn");

let loadedImages = {};

// Load image with caching
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

function buildFlights(numFlights, cadetsPerFlight, flightPrefix) {
    const flights = [];
    for (let i = 0; i < numFlights; i++) {
        const label = String.fromCharCode(flightPrefix.charCodeAt(0) + i);
        flights.push({ label, count: cadetsPerFlight });
    }
    return flights;
}

function buildCadets(flights, numElementLeaders, cadetsPerFlight) {
    const cadets = [];
    flights.forEach(flight => {
        cadets.push({ flight: flight.label, position: 1, imageFile: "Flight_Sergeant.svg" });
        cadets.push({ flight: flight.label, position: 2, imageFile: "Guide.svg" });
        for (let i = 0; i < numElementLeaders; i++) {
            cadets.push({ flight: flight.label, position: 3 + i, imageFile: "Element_Leader.svg" });
        }
        const airmenCount = cadetsPerFlight - (1 + numElementLeaders);
        for (let i = 0; i < airmenCount; i++) {
            cadets.push({ flight: flight.label, position: 3 + numElementLeaders + i, imageFile: "Airman.svg" });
        }
    });
    return cadets;
}

// Helper: calculate how many columns for one flight based on airmen count and element leaders count
function getColsCountPerFlight(numElementLeaders, airmenCount) {
    const rows = numElementLeaders;
    const fullColsCount = Math.floor(airmenCount / rows);
    const partialCount = airmenCount % rows;
    const hasPartialCol = partialCount > 0;
    const airmenCols = fullColsCount + (hasPartialCol ? 1 : 0);
    // Total columns = 1 Flight Sgt + airmenCols + 1 ElemLeader + 1 Guide
    return 1 + airmenCols + 1 + 1;
}

// Helper to get center index on a front line with total columns
function getCenterIndex(totalCols) {
    if (totalCols % 2 === 1) {
        // Odd number: center is middle element
        return Math.floor(totalCols / 2);
    } else {
        // Even number: center is right-center element
        return totalCols / 2;
    }
}

// Updated buildCadets to include Flight Commander (position 0)
function buildCadets(flights, numElementLeaders, cadetsPerFlight) {
    const cadets = [];
    flights.forEach(flight => {
        // Flight Commander (pos 0)
        cadets.push({ flight: flight.label, position: 0, imageFile: "Flight_Commander.svg" });
        // Flight Sergeant (pos 1)
        cadets.push({ flight: flight.label, position: 1, imageFile: "Flight_Sergeant.svg" });
        // Guide (pos 2)
        cadets.push({ flight: flight.label, position: 2, imageFile: "Guide.svg" });
        // Element Leaders (pos 3+)
        for (let i = 0; i < numElementLeaders; i++) {
        cadets.push({ flight: flight.label, position: 3 + i, imageFile: "Element_Leader.svg" });
        }
        // Airmen fill remainder
        const airmenCount = cadetsPerFlight - (1 + numElementLeaders);
        for (let i = 0; i < airmenCount; i++) {
        cadets.push({ flight: flight.label, position: 3 + numElementLeaders + i, imageFile: "Airman.svg" });
        }
    });
    return cadets;
}

async function generateAndDraw() {
    const container = document.querySelector(".main");
    if (container) {
        canvas.width = container.clientWidth;
        const maxHeight = window.innerHeight * 0.7;
        canvas.height = Math.min(maxHeight, 800);
    }

    const formationType = formationTypeEl.value;
    const numFlights = parseInt(numFlightsEl.value);
    const cadetsPerFlight = parseInt(cadetsPerFlightEl.value);
    const flightPrefix = (flightPrefixEl.value || "A").toUpperCase();
    let numElementLeaders = parseInt(numElementLeadersEl.value);

    if (isNaN(numElementLeaders) || numElementLeaders < 2) numElementLeaders = 2;
    else if (numElementLeaders > 4) numElementLeaders = 4;

    const flights = buildFlights(numFlights, cadetsPerFlight, flightPrefix);
    const cadets = buildCadets(flights, numElementLeaders, cadetsPerFlight);

    let maxCols = 0;
    flights.forEach(flight => {
        const flightCadets = cadets.filter(c => c.flight === flight.label);
        const airmen = flightCadets.filter(c => c.imageFile === "Airman.svg");
        const colsCount = getColsCountPerFlight(numElementLeaders, airmen.length);
        if (colsCount > maxCols) maxCols = colsCount;
    });

    const baseSpacingX = 155;
    const baseSpacingY = 120;

    // Calculate total width needed for all flights side by side
    const totalFormationWidth = maxCols * baseSpacingX * numFlights;
    const totalFormationHeight = numElementLeaders * baseSpacingY;

    // Calculate scale factor to fit formation inside canvas with some padding (say 40px)
    const scaleX = (canvas.width - 100) / totalFormationWidth;
    const scaleY = (canvas.height - 450) / totalFormationHeight;
    const scaleFactor = Math.min(scaleX, scaleY, 1); // Don't scale up beyond 1

    // Calculate spacing with scale
    const spacingX = baseSpacingX * scaleFactor;
    const spacingY = baseSpacingY * scaleFactor;

    // Calculate baseX and baseY to center formation
    const formationWidthScaled = maxCols * spacingX * numFlights;
    const formationHeightScaled = (numElementLeaders - 1) * spacingY;

    const baseX = (canvas.width - formationWidthScaled) / 2;
    const baseY = (canvas.height - formationHeightScaled) / 2 + spacingY;

    let positions;

if (formationType === "column") {
    positions = [];

    flights.forEach((flight, flightIndex) => {
        const flightCadets = cadets.filter(c => c.flight === flight.label);

        const flightOffsetX = flightIndex * (spacingX * 3 + 80); // horizontal spacing between flights

        const columnPositions = calculateColumnFormation(
            flightCadets,
            numElementLeaders,
            cadetsPerFlight,
            baseX + flightOffsetX,
            baseY,
            spacingX,
            spacingY
        );

        positions.push(...columnPositions);
    });
} else {
    positions = calculatePositions(
        formationType,
        flights,
        cadets,
        numElementLeaders,
        baseX,
        baseY,
        spacingX,
        spacingY
    );
}

    await drawFormation(positions, scaleFactor);

    // Detect dark mode by data attribute
    const isDarkMode = document.documentElement.getAttribute('data-theme') === 'dark';

    if (isDarkMode) {
        invertCanvasColors();
    }

    window.currentFormationPositions = positions;
}

// Modify calculatePositions to accept scaleFactor parameter but mostly same
function calculatePositions(formationType, flights, cadets, numElementLeaders, baseX = 100, baseY = 100, spacingX = 155, spacingY = 110, scaleFactor = 1) {
    const positions = [];

    flights.forEach((flight, flightIndex) => {
        const gapBetweenFlights = 40; // pixels, adjust as needed

        const colsCount = getColsCountPerFlight(numElementLeaders, cadets.filter(c => c.flight === flight.label && c.imageFile === "Airman.svg").length);
        const flightOffsetX = flightIndex * ((spacingX * colsCount) + gapBetweenFlights);
        const flightCadets = cadets.filter(c => c.flight === flight.label);

        const flightCommander = flightCadets.find(c => c.position === 0);
        const flightSgt = flightCadets.find(c => c.position === 1);
        const guide = flightCadets.find(c => c.position === 2);
        const elementLeaders = flightCadets.filter(c => c.imageFile === "Element_Leader.svg");
        const airmen = flightCadets.filter(c => c.imageFile === "Airman.svg");

        const rows = numElementLeaders;
        const airmenCount = airmen.length;

        const fullColsCount = Math.floor(airmenCount / rows);
        const partialCount = airmenCount % rows;
        const hasPartialCol = partialCount > 0;
        const airmenCols = fullColsCount + (hasPartialCol ? 1 : 0);

        const airmenStartCol = hasPartialCol ? 2 : 1;
        const gridCols = 1 + airmenCols + 1 + 1; // Sgt + airmen cols + Elem Leaders + Guide

        const grid = Array.from({ length: rows }, () => Array(gridCols).fill(null));

        if (flightSgt) {
            grid[rows - 1][0] = flightSgt;
        }

        let airmanIndex = 0;

        if (hasPartialCol) {
            const partialCol = 1;
            for (let i = 0; i < partialCount; i++) {
                const rowIdx = rows - 1 - i;
                grid[rowIdx][partialCol] = airmen[airmanIndex++] || null;
            }
        }

        for (let c = 0; c < fullColsCount; c++) {
            const colIdx = airmenStartCol + c;
            for (let r = rows - 1; r >= 0; r--) {
                if (airmanIndex < airmenCount) {
                grid[r][colIdx] = airmen[airmanIndex++];
                }
            }
        }

        const elemLeaderCol = gridCols - 2;
        for (let r = 0; r < rows; r++) {
            grid[r][elemLeaderCol] = elementLeaders[rows - 1 - r] || null;
        }

        const guideCol = gridCols - 1;
        if (guide) {
            grid[0][guideCol] = guide;
        }

        for (let r = 0; r < rows; r++) {
            let firstAirmanCol = -1;
            for (let c = 1; c < elemLeaderCol; c++) {
                if (grid[r][c] && grid[r][c].imageFile === "Airman.svg") {
                firstAirmanCol = c;
                break;
                }
            }
            if (firstAirmanCol !== -1) {
                grid[r][firstAirmanCol].imageFile = "Assistant_Element_Leader.svg";
            }
        }

        // Flight Commander positioning
        const centerCol = getCenterIndex(gridCols);

        if (flightCommander) {
            positions.push({
                flight: flight.label,
                position: flightCommander.position,
                imageFile: flightCommander.imageFile,
                x: baseX + flightOffsetX + spacingX * centerCol,
                y: baseY + spacingY * -2,
            });
        }

        // Add all grid cadets to positions
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

function calculateColumnFormation(flightCadets, numElementLeaders, cadetsPerFlight, baseX, baseY, spacingX, spacingY) {

    const fc = flightCadets.find(c => c.position === 0);
    const sergeant = flightCadets.find(c => c.position === 1);
    const guide = flightCadets.find(c => c.position === 2);
    const elementLeaders = flightCadets.filter(c => c.imageFile === "Element_Leader.svg");
    const airmen = flightCadets.filter(c => c.imageFile === "Airman.svg");

    const cols = numElementLeaders; // number of columns
    const airmenRows = 3; // fixed 3 rows for airmen, per your layout

    // Total rows: 6 (0 to 5)
    // Row 0: FC, empty, empty, Guide
    // Row 1: Element Leaders across all columns
    // Rows 2-4: Airmen fill columns
    // Row 5: empty except Flight Sergeant bottom-right

    const totalRows = 6; // fixed

    // Create empty grid
    const grid = Array.from({ length: totalRows }, () => Array(cols).fill(null));

    // Row 0 placements:
    if (fc) grid[0][0] = fc;                     // FC top-left
    if (guide) grid[0][cols - 1] = guide;       // Guide top-right

    // Row 1: Element Leaders fill all columns left to right
    elementLeaders.forEach((el, i) => {
        if (i < cols) grid[1][i] = el;
    });

    // Rows 2-4: Airmen fill columns top-down, left to right
    let aIndex = 0;
    for (let c = 0; c < cols; c++) {
        for (let r = 2; r <= 4; r++) {
            if (aIndex < airmen.length) {
                grid[r][c] = airmen[aIndex++];
            }
        }
    }

    // Row 5: Flight Sergeant bottom-right (last col)
    if (sergeant) grid[5][cols - 1] = sergeant;

    // Now convert grid to positions
    return grid.flatMap((row, r) =>
        row.map((cell, c) => ({
            flight: cell?.flight || null,
            position: cell?.position || null,
            imageFile: cell?.imageFile || null,
            x: baseX + c * spacingX,
            y: baseY + r * spacingY
        }))
    );
}

// Updated drawFormation to scale images
async function drawFormation(positions, scaleFactor = 1) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const uniqueImages = [...new Set(positions.filter(c => c.imageFile).map(c => c.imageFile))];

    try {
        await Promise.all(uniqueImages.map(img => loadImage(img)));
    } catch (e) {
        alert(e.message);
        return;
    }

    positions.forEach(cdt => {
        if (cdt.imageFile) {
        const img = loadedImages[cdt.imageFile];
        if (img) {
            const drawWidth = img.naturalWidth * scaleFactor;
            const drawHeight = img.naturalHeight * scaleFactor;

            ctx.drawImage(img, cdt.x - drawWidth / 2, cdt.y - drawHeight, drawWidth, drawHeight);
        }
        } else {
        /*// Optional placeholder scaled
        const boxWidth = 40 * scaleFactor;
        const boxHeight = 50 * scaleFactor;
        ctx.fillStyle = "#aaa";
        ctx.fillRect(cdt.x - boxWidth / 2, cdt.y - boxHeight, boxWidth, boxHeight);
        */
        }
    });
}

window.addEventListener("resize", () => {
    generateAndDraw();
});

window.addEventListener('themechange', () => {
    generateAndDraw();
});

function invertCanvasColors() {
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
        // Invert RGB channels
        data[i] = 255 - data[i];         // Red
        data[i + 1] = 255 - data[i + 1]; // Green
        data[i + 2] = 255 - data[i + 2]; // Blue
    }

    ctx.putImageData(imageData, 0, 0);
}

function exportPNG() {
    if (!window.currentFormationPositions) {
        alert("Generate formation first");
        return;
    }

    // Detect dark mode by data attribute
    const isDarkMode = document.documentElement.getAttribute('data-theme') === 'dark';

    if (isDarkMode) {
        const userOk = confirm("You are in dark mode, so your downloaded images will be white. Are you okay with this?");
        if (!userOk) return;  // User cancelled export
    }

    // Convert canvas content to data URL (PNG format)
    const dataURL = canvas.toDataURL("image/png");

    // Create a temporary link element to trigger download
    const a = document.createElement("a");
    a.href = dataURL;
    a.download = "formation.png";
    a.click();
}

// Event listeners
exportPNGBtn.addEventListener("click", exportPNG);

[
    formationTypeEl,
    numFlightsEl,
    cadetsPerFlightEl,
    flightPrefixEl,
    numElementLeadersEl,
].forEach(el => el.addEventListener("input", generateAndDraw));

// Initial draw
generateAndDraw();
