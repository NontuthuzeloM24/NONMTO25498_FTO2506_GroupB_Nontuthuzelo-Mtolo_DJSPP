import React from "react";
import PodcastCard from "./PodcastCard";
import styles from "./PodcastGrid.module.css";

/**
 * @component PodcastGrid
 * Grid layout component that displays multiple podcast cards.
 * @param {Object} props
 * @param {Array<Object>} props.shows - Array of show objects to display
 * @returns {JSX.Element} Responsive grid of podcast cards
 */
export default function PodcastGrid({ shows }) {
  if (!shows.length) {
    return <p className={styles.empty}>No podcasts found.</p>;
  }

  return (
    <div className={styles.podcastGrid}>
      {shows.map((show) => (
        <PodcastCard key={show.id} show={show} />
      ))}
    </div>
  );
}