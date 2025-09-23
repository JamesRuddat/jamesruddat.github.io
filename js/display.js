import * as uniformData from '/js/data/uniformData.js';

function createItemCard(item) {
    const itemDiv = document.createElement("div");
    itemDiv.style.border = "1px solid #ccc";
    itemDiv.style.padding = "8px";
    itemDiv.style.margin = "4px 0";
    itemDiv.style.display = "flex";
    itemDiv.style.alignItems = "center";
    itemDiv.style.gap = "10px";

    if (item.image) {
        const img = document.createElement("img");
        img.src = "" + item.image;
        img.alt = item.label || "Image";
        img.style.maxWidth = "100px";
        img.style.maxHeight = "90px";
        itemDiv.appendChild(img);
    }

    const textDiv = document.createElement("div");
    textDiv.innerHTML = `
        <strong>${item.label || 'No label'}</strong><br>
        Value: ${item.value || 'N/A'}
    `;
    itemDiv.appendChild(textDiv);

    const linkDiv = document.createElement("div");
    if (item.link) {
        linkDiv.innerHTML = `<a href="${item.link}" target="_blank" rel="noopener noreferrer">View on Vanguard</a>`;
    } else {
        linkDiv.innerHTML = `<em>Item not sold or found on Vanguard</em>`;
    }
    linkDiv.style.marginLeft = "auto";
    linkDiv.style.textAlign = "right";
    itemDiv.appendChild(linkDiv);

    return itemDiv;
}

function renderSection(container, sectionName, items) {
    if (!items.length) return;

    const header = document.createElement("h4");
    header.textContent = sectionName;
    container.appendChild(header);

    items.forEach(item => {
        container.appendChild(createItemCard(item));
    });
}

function initUniformUI() {
    const container = document.getElementById("form-container");

    Object.entries(uniformData).forEach(([key, items]) => {
        renderSection(container, key, items);
    });
}

document.addEventListener("DOMContentLoaded", initUniformUI);