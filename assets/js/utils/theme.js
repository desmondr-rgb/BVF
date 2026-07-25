/**
 * ============================================================================
 * THEME (DARK MODE / LIGHT MODE)
 * ============================================================================
 * Toggles a `data-bs-theme` attribute on <html>, which Bootstrap 5.3+ and
 * our custom CSS both key off of. The choice is cached in localStorage
 * purely as a fast, synchronous UI preference (not sensitive data), so the
 * correct theme can be applied before first paint and avoid a flash.
 * ============================================================================
 */

const STORAGE_KEY = "vms-theme";

/** Get the currently active theme ("light" or "dark"). */
export function getStoredTheme() {
  return localStorage.getItem(STORAGE_KEY);
}

/** Persist the theme choice locally. */
export function setStoredTheme(theme) {
  localStorage.setItem(STORAGE_KEY, theme);
}

/** Resolve the theme to apply on load: stored preference, else OS preference. */
export function resolveInitialTheme() {
  const stored = getStoredTheme();
  if (stored) return stored;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

/** Apply a theme to the document immediately. */
export function applyTheme(theme) {
  document.documentElement.setAttribute("data-bs-theme", theme);
  setStoredTheme(theme);
  updateThemeToggleIcon(theme);
}

/** Flip between light and dark. */
export function toggleTheme() {
  const current = document.documentElement.getAttribute("data-bs-theme") || "light";
  const next = current === "dark" ? "light" : "dark";
  applyTheme(next);
  return next;
}

/** Update any theme-toggle button icons on the page to reflect current state. */
function updateThemeToggleIcon(theme) {
  document.querySelectorAll("[data-theme-toggle-icon]").forEach((icon) => {
    icon.classList.remove("bi-moon-stars-fill", "bi-sun-fill");
    icon.classList.add(theme === "dark" ? "bi-sun-fill" : "bi-moon-stars-fill");
  });
}

/** Wire up every element with [data-theme-toggle] to call toggleTheme() on click. */
export function initThemeToggle() {
  applyTheme(resolveInitialTheme());
  document.querySelectorAll("[data-theme-toggle]").forEach((btn) => {
    btn.addEventListener("click", () => toggleTheme());
  });
}
