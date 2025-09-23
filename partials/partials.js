function loadPartial(id, file) {
    fetch(file)
        .then(response => {
            if (!response.ok) throw new Error(`Could not load ${file}`);
            return response.text();
        })
        .then(data => {
            document.getElementById(id).innerHTML = data;
        })
        .catch(error => console.error(error));
}

// When the DOM is ready, load the partials
document.addEventListener("DOMContentLoaded", () => {
    loadPartial("header-placeholder", "/partials/header.html");
    loadPartial("nav-placeholder", "/partials/nav.html");
    loadPartial("footer-placeholder", "/partials/footer.html");
});