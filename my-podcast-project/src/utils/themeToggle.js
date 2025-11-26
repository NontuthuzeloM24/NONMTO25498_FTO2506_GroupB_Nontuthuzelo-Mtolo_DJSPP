/**
 * @function applyTheme
 * Apply theme to document root element
 * @param {string} theme - Theme name ('light' or 'dark')
 */
export function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
}

/**
 * @function getStoredTheme
 * Retrieve stored theme from localStorage
 * @returns {string|null} Stored theme or null if not set
 */
export function getStoredTheme() {
  return localStorage.getItem("theme");
}

/**
 * @function saveTheme
 * Save theme preference to localStorage
 * @param {string} theme - Theme name to save
 */
export function saveTheme(theme) {
  localStorage.setItem("theme", theme);
}