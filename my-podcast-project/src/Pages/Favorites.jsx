import React, { useState } from "react";
import { usePodcastContext } from "../context/PodcastContext";
import { Link } from "react-router-dom";
import { formatDate } from "../utils/formatDate";
import styles from "./Favourites.module.css";

/**
 * @component Favourites
 * Page displaying all favourited episodes, grouped by show title.
 * Supports sorting by title (A-Z, Z-A) and date added (newest, oldest).
 * @returns {JSX.Element} Favourites page with grouped episode list
 */
export default function Favourites() {
  const { favourites, toggleFavourite, playEpisode } = usePodcastContext();
  const [sortOrder, setSortOrder] = useState("date-desc");

  /**
   * Group favourites by show title
   * @returns {Object} Object with show titles as keys and episode arrays as values
   */
  const groupByShow = () => {
    return favourites.reduce((acc, fav) => {
      const showTitle = fav.showTitle || "Unknown Show";
      if (!acc[showTitle]) {
        acc[showTitle] = [];
      }
      acc[showTitle].push(fav);
      return acc;
    }, {});
  };

  /**
   * Sort grouped shows based on selected sort order
   * @param {Object} grouped - Grouped favourites object
   * @returns {Array} Sorted array of [showTitle, episodes] pairs
   */
  const sortShows = (grouped) => {
    const entries = Object.entries(grouped);

    if (sortOrder === "title-asc") {
      return entries.sort((a, b) => a[0].localeCompare(b[0]));
    } else if (sortOrder === "title-desc") {
      return entries.sort((a, b) => b[0].localeCompare(a[0]));
    } else if (sortOrder === "date-desc") {
      return entries.sort((a, b) => {
        const dateA = Math.max(...a[1].map((ep) => new Date(ep.addedAt)));
        const dateB = Math.max(...b[1].map((ep) => new Date(ep.addedAt)));
        return dateB - dateA;
      });
    } else if (sortOrder === "date-asc") {
      return entries.sort((a, b) => {
        const dateA = Math.max(...a[1].map((ep) => new Date(ep.addedAt)));
        const dateB = Math.max(...b[1].map((ep) => new Date(ep.addedAt)));
        return dateA - dateB;
      });
    }

    return entries;
  };

  const grouped = groupByShow();
  const sortedShows = sortShows(grouped);

  if (favourites.length === 0) {
    return (
      <main className={styles.favourites}>
        <h1 className={styles.heading}>❤️ Your Favourites</h1>
        <div className={styles.empty}>
          <p>You haven't added any favourites yet.</p>
          <Link to="/" className={styles.link}>
            Explore Shows
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.favourites}>
      <div className={styles.header}>
        <h1 className={styles.heading}>❤️ Your Favourites</h1>
        <div className={styles.sortControl}>
          <label htmlFor="fav-sort">Sort by:</label>
          <select
            id="fav-sort"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className={styles.sortSelect}
          >
            <option value="date-desc">Date Added (Newest)</option>
            <option value="date-asc">Date Added (Oldest)</option>
            <option value="title-asc">Show Title (A-Z)</option>
            <option value="title-desc">Show Title (Z-A)</option>
          </select>
        </div>
      </div>

      <div className={styles.showGroups}>
        {sortedShows.map(([showTitle, episodes]) => (
          <section key={showTitle} className={styles.showGroup}>
            <h2 className={styles.showTitle}>{showTitle}</h2>
            <div className={styles.episodeList}>
              {episodes.map((episode) => (
                <div
                  key={`${episode.showTitle}-${episode.seasonNumber}-${episode.episode}`}
                  className={styles.episodeCard}
                >
                  <img
                    src={episode.image}
                    alt={episode.title}
                    className={styles.episodeImage}
                  />
                  <div className={styles.episodeInfo}>
                    <p className={styles.episodeNumber}>
                      Season {episode.seasonNumber} • Episode {episode.episode}
                    </p>
                    <h3 className={styles.episodeTitle}>{episode.title}</h3>
                    <p className={styles.addedAt}>
                      Added: {formatDate(episode.addedAt)}
                    </p>
                  </div>
                  <div className={styles.actions}>
                    <button
                      className={styles.playButton}
                      onClick={() => playEpisode(episode)}
                      aria-label="Play episode"
                    >
                      ▶
                    </button>
                    <button
                      className={styles.removeButton}
                      onClick={() => toggleFavourite(episode)}
                      aria-label="Remove from favourites"
                    >
                      ❤️
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}