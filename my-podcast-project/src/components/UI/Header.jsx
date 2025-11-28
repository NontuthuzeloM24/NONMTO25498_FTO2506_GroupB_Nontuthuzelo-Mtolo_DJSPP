import React from "react";
import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

/**
 * @component Header
 * Main header component displaying the app title, navigation, and theme toggle.
 * @returns {JSX.Element} Sticky header with navigation and controls
 */
export default function Header() {
  return (
    <header>
      <div className="left">
        <Link to="/">
          <h1>🎙️ Podcast App</h1>
        </Link>
      </div>

      <nav>
        <Link to="/">Home</Link>
        <Link to="/favorites">❤️ Favorites</Link>
        <ThemeToggle />
      </nav>
    </header>
  );
}