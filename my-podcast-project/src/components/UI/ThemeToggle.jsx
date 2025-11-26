import React from "react";
import { usePodcastContext } from "../../context/PodcastContext";
import styles from "./ThemeToggle.module.css";

/**
 * @component ThemeToggle
 * Toggle button for switching between light and dark themes.
 * Persists theme preference in localStorage and updates app-wide styling.
 * @returns {JSX.Element} Theme toggle button with sun/moon icon
 */
export default function ThemeToggle() {
  const { theme, toggleTheme } = usePodcastContext();

  return (
    <button
      className={styles.themeToggle}
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      {theme === "light" ? "🌙" : "☀️"}
    </button>
  );
}