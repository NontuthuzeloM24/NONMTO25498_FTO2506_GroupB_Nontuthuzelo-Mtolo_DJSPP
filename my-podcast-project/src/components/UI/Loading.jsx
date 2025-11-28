/**
 * @component Loading
 * Loading indicator component with spinner animation.
 * @returns {jsx.Element} Loading spinner with text
 */
export default function Loading() {
  return (
    <div className="loading">
      <div className="spinner"></div>
      <p className="text">Loading...</p>
    </div>
  );
}