document.addEventListener('DOMContentLoaded', () => {
    const selectionsString = sessionStorage.getItem('uniformSelections');

    const displayDiv = document.getElementById('uniformDisplay');

    if (!selectionsString) {
        displayDiv.textContent = 'No uniform data found. Please fill out the form first.';
        return;
    }

    const selections = JSON.parse(selectionsString);

    displayDiv.innerHTML = `
  <h3>Your Uniform Details</h3>
  <ul>
    <li><strong>Member Type:</strong> ${selections.memberType || 'N/A'}</li>
    <li><strong>Grade:</strong> ${selections.grade || 'N/A'} 
    <img src="${selections.gradeImg}" alt="Cadet Insignia" style="max-height:100px;">
    </li>
    <li><strong>Uniform Type:</strong> ${selections.uniformType || 'N/A'}</li>
    <li><strong>Gender:</strong> ${selections.genderType || 'N/A'}</li>
     <li><strong>Service Badges:</strong> ${selections.serviceBadges || 'N/A'}</li>
      <li><strong>Command Insignia Pin:</strong> ${selections.commandInsigniaPin || 'N/A'}</li>
      <li><strong>Aviation Badges:</strong> ${selections.aviationBadges || 'N/A'}</li>
      <li><strong>Shoulder Cords:</strong> ${selections.shoulderCords || 'N/A'}</li>
      <li><strong>Patches:</strong> ${selections.patches || 'N/A'}</li>
      <li><strong>NCSA Patches:</strong> ${selections.ncsaPatches || 'N/A'}</li>
  </ul>
`;
});