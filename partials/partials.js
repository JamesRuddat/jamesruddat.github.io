function loadPartial(id, file) {
  return fetch(file)
    .then(response => {
      if (!response.ok) throw new Error(`Could not load ${file}`);
      return response.text();
    })
    .then(data => {
      document.getElementById(id).innerHTML = data;
    });
}

document.addEventListener("DOMContentLoaded", () => {
  loadPartial("head-placeholder", "/partials/head.html").then(() => {
    Promise.all([
      loadPartial("header-placeholder", "/partials/header.html"),
      loadPartial("nav-placeholder", "/partials/nav.html"),
      loadPartial("footer-placeholder", "/partials/footer.html")
    ]).then(() => {
      /* ===== DARK / LIGHT TOGGLE ===== */
      const toggleBtn = document.getElementById("darkModeToggle");
      if (toggleBtn) {
        const savedTheme = localStorage.getItem("theme") || "light";
        document.documentElement.setAttribute("data-theme", savedTheme);
        toggleBtn.textContent = savedTheme === "dark" ? "☀️" : "🌙";

        toggleBtn.addEventListener("click", () => {
          const current = document.documentElement.getAttribute("data-theme");
          const newTheme = current === "dark" ? "light" : "dark";
          document.documentElement.setAttribute("data-theme", newTheme);
          localStorage.setItem("theme", newTheme);
          toggleBtn.textContent = newTheme === "dark" ? "☀️" : "🌙";

          // Notify other parts of the app about theme change
          window.dispatchEvent(new Event('themechange'));
        });
      }

      /* ===== HAMBURGER MENU TOGGLE ===== */
      const navToggle = document.getElementById("navToggle");
      const navMenu   = document.getElementById("navMenu");

      if (navToggle && navMenu) {
        navToggle.addEventListener("click", () => {
          navMenu.classList.toggle("show");
        });
      }
    });
  });
});
