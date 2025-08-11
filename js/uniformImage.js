document.addEventListener('DOMContentLoaded', () => {
    const selectionsString = sessionStorage.getItem('uniformSelections');

    if (!selectionsString) {
        // No data found, maybe show a message or redirect back
        document.getElementById('uniformDisplay').textContent = 'No uniform data found. Please fill out the form first.';
        return;
    }

    const selections = JSON.parse(selectionsString);

    // Example: display the selections as text for now
    const displayDiv = document.getElementById('uniformDisplay');
    displayDiv.innerHTML = `
        <h2>Your Uniform Details</h2>
        <ul>
            <li><strong>Member Type:</strong> ${selections.memberType}</li>
            <li><strong>Grade:</strong> ${selections.grade}</li>
            <li><strong>Uniform Type:</strong> ${selections.uniformType}</li>
            <li><strong>Gender Type:</strong> ${selections.genderType}</li>
            <li><strong>Service Badges:</strong> ${selections.serviceBadges}</li>
            <li><strong>Command Insignia Pin:</strong> ${selections.commandInsigniaPin}</li>
            <li><strong>Aviation Badges:</strong> ${selections.aviationBadges}</li>
            <li><strong>Shoulder Cords:</strong> ${selections.shoulderCords}</li>
            <li><strong>Patches:</strong> ${selections.patches}</li>
            <li><strong>NCSA Patches:</strong> ${selections.ncsaPatches}</li>
        </ul>
    `;

    // TODO: use these selections to generate your uniform image/display here
});