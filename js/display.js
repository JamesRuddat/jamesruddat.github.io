import * as uniformData from '/js/data/uniformData.js';

document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById("form-container");

    Object.entries(uniformData).forEach(([arrayKey, arrayItems]) => {
        if (!arrayItems.length) return;

        // Section title (uses key name directly)
        const header = document.createElement("h4");
        header.textContent = arrayKey;
        container.appendChild(header);

        arrayItems.forEach(item => {
            const itemDiv = document.createElement("div");
            itemDiv.style.border = "1px solid #ccc";
            itemDiv.style.padding = "8px";
            itemDiv.style.margin = "4px 0";
            itemDiv.style.display = "flex";
            itemDiv.style.alignItems = "center";
            itemDiv.style.gap = "10px";

            if (item.image) {
                const img = document.createElement("img");
                img.src = "../" + item.image;
                img.alt = item.label || "Image";
                img.style.maxWidth = "100px";
                img.style.maxHeight = "90px";
                itemDiv.appendChild(img);
            }

            const textDiv = document.createElement("div");
            textDiv.innerHTML = `<strong>${item.label || 'No label'}</strong><br>Value: ${item.value || 'N/A'}`;
            itemDiv.appendChild(textDiv);

            container.appendChild(itemDiv);
        });
    });
});
