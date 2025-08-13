document.addEventListener('DOMContentLoaded', () => {
  const selectionsString = sessionStorage.getItem('uniformSelections');
  const displayDiv = document.getElementById('uniformDisplay');

  if (!selectionsString) {
    displayDiv.textContent = 'No uniform data found. Please fill out the form first.';
    return;
  }

  const selections = JSON.parse(selectionsString); // This is an array of objects

  displayDiv.innerHTML = '<h3>Your Uniform Details</h3>';
  const ul = document.createElement('ul');

  selections.forEach(item => {
    const li = document.createElement('li');
    li.innerHTML = `<strong>${item.group || 'Item'}:</strong> ${item.label || item.value || 'N/A'}`;

    // Optional: if your objects have an `img` property
    if (item.img) {
      const img = document.createElement('img');
      img.src = item.img;
      img.alt = item.label || '';
      img.style.maxHeight = '100px';
      li.appendChild(document.createElement('br'));
      li.appendChild(img);
    }

    ul.appendChild(li);
  });

  displayDiv.appendChild(ul);
});
