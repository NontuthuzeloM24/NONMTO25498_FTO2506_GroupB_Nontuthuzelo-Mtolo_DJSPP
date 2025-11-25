import styles from "./Header.module.css";

/**
 * @component Header
 * Main header component displaying the app title and branding.
 * @returns {jsx.Element} Sticky header with app title
 */
export default function Header() {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>🎙️ Podcast App</h1>
    </header>
  );
}