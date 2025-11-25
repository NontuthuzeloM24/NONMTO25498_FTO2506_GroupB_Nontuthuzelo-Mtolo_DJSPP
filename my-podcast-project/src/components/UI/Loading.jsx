import styles from "./Loading.module.css";

/**
 * @component Loading
 * Loading indicator component with spinner animation.
 * @returns {jsx.Element} Loading spinner with text
 */
export default function Loading() {
  return (
    <div className={styles.loading}>
      <div className={styles.spinner}></div>
      <p className={styles.text}>Loading...</p>
    </div>
  );
}