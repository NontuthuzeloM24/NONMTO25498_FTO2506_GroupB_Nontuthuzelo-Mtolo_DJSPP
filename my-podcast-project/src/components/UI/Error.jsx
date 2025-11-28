/**
 * @component Error
 * Error display component for showing error messages to users.
 * @param {Object} props
 * @param {string} props.message - Error message to display
 * @returns {jsx.Element} Error message container
 */
export default function Error({ message }) {
  return (
    <div className="error">
      <p className="message">{message}</p>
    </div>
  );
}