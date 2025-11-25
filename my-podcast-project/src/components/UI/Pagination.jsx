import styles from "./Pagination.module.css";

/**
 * @component Pagination
 * Pagination component for navigating through pages of content.
 * @param {Object} props
 * @param {number} props.currentPage - Current active page number
 * @param {number} props.totalPages - Total number of pages
 * @param {Function} props.onPageChange - Callback function when page is changed, receives page number
 * @returns {jsx.Element|null} Pagination buttons or null if only one page
 */
export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  return (
    <nav className={styles.pagination}>
      <ul className={styles.list}>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <li key={page} className={styles.item}>
            <button
              className={`${styles.button} ${
                currentPage === page ? styles.buttonActive : ""
              }`}
              onClick={() => onPageChange(page)}
              aria-current={currentPage === page ? "page" : undefined}
            >
              {page}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}