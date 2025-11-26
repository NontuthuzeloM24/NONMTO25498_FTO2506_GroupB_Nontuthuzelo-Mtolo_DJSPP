import React from "react";
import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import styles from "./Header.module.css";

/**
 * @component Header
 * Main header component displaying the app title, navigation, and theme toggle.
 * @returns {JSX.Element} Sticky header with navigation and controls
 */
export default function Header() {
  return (
    <header className={styles.header}>
      <Link to="/" className={styles.logo}>
        <h1 className={styles.title}>🎙️ My Podcast App</h1>
      </Link>
      
      <nav className={styles.nav}>
        <Link to="/" className={styles.navLink}>
          Home
        </Link>
        <Link to="/favorites" className={styles.navLink}>
          ❤️ Favorites
        </Link>
        <ThemeToggle />
      </nav>
    </header>
  );
}