import React from "react";
import { Link } from "react-router-dom";
import { formatDate } from "../../utils/formatDate";
import styles from "./PodcastCard.module.css";

/**
 * @component PodcastCard
 * Card component displaying podcast preview information with link to details page.
 * @param {Object} props
 * @param {Object} props.show - Show object containing podcast data
 * @param {string} props.show.id - Unique show identifier
 * @param {string} props.show.title - Show title
 * @param {string} props.show.image - Show cover image URL
 * @param {string} props.show.description - Show description
 * @param {string} props.show.updated - Last updated date (ISO format)
 * @param {Array<number>} props.show.genres - Array of genre IDs
 * @returns {JSX.Element} Podcast card with image, title, and update date
 */
export default function PodcastCard({ show }) {
  return (
    <Link to={`/show/${show.id}`} className={styles.podcastCard}>
      <img
        src={show.image || "/placeholder.png"}
        alt={show.title}
        className={styles.image}
      />
      <div className={styles.content}>
        <h3 className={styles.title}>{show.title}</h3>
        <p className={styles.updated}>
          Updated: {formatDate(show.updated)}
        </p>
      </div>
    </Link>
  );
}