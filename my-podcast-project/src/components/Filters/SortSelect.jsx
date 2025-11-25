import React from "react";
import styles from "./SortSelect.module.css";

/**
 * @component SortSelect
 * Dropdown component for sorting podcasts by various criteria.
 * @param {Object} props
 * @param {string} props.sortOrder - Current sort order value
 * @param {Function} props.onChange - Callback function when sort selection changes, receives new sort order
 * @returns {JSX.Element} Sort dropdown selector
 */
export default function SortSelect({ sortOrder, onChange }) {
  return (
    <div className={styles.sortSelect}>
      <label className={styles.label} htmlFor="sort">
        Sort:
      </label>
      <select
        className={styles.select}
        id="sort"
        value={sortOrder}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">None</option>
        <option value="title-asc">Title A-Z</option>
        <option value="title-desc">Title Z-A</option>
        <option value="updated-desc">Last Updated (Newest)</option>
        <option value="updated-asc">Last Updated (Oldest)</option>
      </select>
    </div>
  );
}