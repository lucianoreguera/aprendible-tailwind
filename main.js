const $html = document.documentElement;
const $themeOptions = document.querySelectorAll("[data-theme-option]");
const $themeMenu = document.getElementById("theme-menu");
const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)");
const $icons = {
  light: document.getElementById("light-icon"),
  dark: document.getElementById("dark-icon"),
  system: document.getElementById("system-icon"),
};
let currentTheme =
  localStorage.getItem("theme") || localStorage.setItem("theme", "system");

const updateThemeUI = (theme) => {
  Object.entries($icons).forEach(([key, icon]) =>
    key === theme
      ? icon.classList.remove("hidden")
      : icon.classList.add("hidden")
  );

  $themeMenu.classList.add("hidden");
  localStorage.setItem("theme", theme);
};
const updateTheme = (theme) => {
  if (theme === "dark" || (theme === "system" && isDarkMode.matches)) {
    $html.classList.add("dark");
  } else if (theme === "light" || (theme === "system" && !isDarkMode.matches)) {
    $html.classList.remove("dark");
  }
  currentTheme = theme;
};

updateTheme(currentTheme);
updateThemeUI(currentTheme);

document
  .getElementById("toggle-theme-menu")
  .addEventListener("click", () => $themeMenu.classList.toggle("hidden"));

$themeOptions.forEach((option) => {
  option.addEventListener("click", () => {
    const theme = option.dataset.themeOption;
    updateThemeUI(theme);
    updateTheme(theme);
  });
});

// Escuchando si el usuario cambia la configuración del tema oscuro del sistema operativo
isDarkMode.addEventListener("change", (matchMedia) => {
  if (currentTheme === "system") {
    matches ? $html.classList.add("dark") : $html.classList.remove("dark");
  }
});
