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
      // Setup theme toggle button after nav loads
      const toggleBtn = document.getElementById("darkModeToggle");
      if (!toggleBtn) return;

      // Get stored theme or default to light
      const savedTheme = localStorage.getItem("theme") || "light";

      // Reference to the <link id="themeStylesheet">
      const themeLink = document.getElementById("themeStylesheet");
      if (!themeLink) return;

      // Apply saved theme CSS file
      themeLink.href = savedTheme === "dark" ? "/css/dark.css" : "/css/light.css";

      // Update toggle button icon/text
      toggleBtn.textContent = savedTheme === "dark" ? "☀️" : "🌙";

      // Add click event to toggle theme
      toggleBtn.addEventListener("click", () => {
        const isDark = themeLink.href.includes("dark.css");
        if (isDark) {
          themeLink.href = "/css/light.css";
          toggleBtn.textContent = "🌙";
          localStorage.setItem("theme", "light");
        } else {
          themeLink.href = "/css/dark.css";
          toggleBtn.textContent = "☀️";
          localStorage.setItem("theme", "dark");
        }
      });
    });
  });
});
