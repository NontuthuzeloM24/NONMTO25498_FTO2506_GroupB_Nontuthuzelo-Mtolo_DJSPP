import React from "react";
import styles from "./SearchBar.module.css";

/**
 * @component SearchBar
 * Text input component for searching podcasts by title.
 * @param {Object} props
 * @param {string} props.value - Current search term value
 * @param {Function} props.onChange - Callback function when search input changes, receives new value
 * @returns {JSX.Element} Search input field
 */
export default function SearchBar({ value, onChange }) {
  return (
    <div className={styles.searchBar}>
      <input
        className={styles.input}
        type="text"
        placeholder="Search podcasts..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}