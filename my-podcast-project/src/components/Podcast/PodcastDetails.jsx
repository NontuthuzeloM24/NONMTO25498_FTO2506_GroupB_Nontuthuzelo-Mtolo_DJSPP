import React, { useState } from "react";
import { formatDate } from "../../utils/formatDate";
import styles from "./PodcastDetail.module.css";

/**
 * @component PodcastDetail
 * Detailed view component for a podcast show, displaying seasons and episodes.
 * @param {Object} props
 * @param {Object} props.show - Detailed show object
 * @param {string} props.show.id - Show identifier
 * @param {string} props.show.title - Show title
 * @param {string} props.show.image - Show cover image URL
 * @param {string} props.show.description - Full show description
 * @param {string} props.show.updated - Last updated date
 * @param {Array<Object>} props.show.genres - Array of genre objects with id and name
 * @param {Array<Object>} props.show.seasons - Array of season objects with episodes
 * @returns {JSX.Element} Detailed podcast view with expandable seasons
 */
export default function PodcastDetail({ show }) {
  const [expandedSeasons, setExpandedSeasons] = useState({});

  if (!show) {
    return <p className={styles.notFound}>Show not found.</p>;
  }

  /**
   * Toggle season expansion state
   * @param {number} seasonNumber - Season number to toggle
   */
  const toggleSeason = (seasonNumber) => {
    setExpandedSeasons((prev) => ({
      ...prev,
      [seasonNumber]: !prev[seasonNumber],
    }));
  };

  return (
    <section className={styles.podcastDetail}>
      <div className={styles.header}>
        <img
          className={styles.image}
          src={show.image}
          alt={`${show.title} podcast`}
        />
        <div className={styles.info}>
          <h2 className={styles.title}>{show.title}</h2>
          <p className={styles.description}>{show.description}</p>

          {show.genres && show.genres.length > 0 && (
            <div className={styles.genres}>
              {show.genres.map((genre) => (
                <span key={genre} className={styles.genreTag}>
                  Genre {genre}
                </span>
              ))}
            </div>
          )}

          <p className={styles.lastUpdated}>
            Last updated: {formatDate(show.updated)}
          </p>
        </div>
      </div>

      <div className={styles.seasons}>
        <h3 className={styles.seasonsTitle}>Seasons</h3>
        {show.seasons.map((season) => (
          <div key={season.season} className={styles.season}>
            <button
              className={styles.seasonToggle}
              onClick={() => toggleSeason(season.season)}
              aria-expanded={!!expandedSeasons[season.season]}
            >
              <span className={styles.seasonTitle}>
                Season {season.season} ({season.episodes.length} episodes)
              </span>
              <span className={styles.seasonIcon}>
                {expandedSeasons[season.season] ? "▼" : "▶"}
              </span>
            </button>

            {expandedSeasons[season.season] && (
              <ul className={styles.episodeList}>
                {season.episodes.map((episode) => (
                  <li key={episode.episode} className={styles.episode}>
                    <img
                      src={episode.image || season.image || show.image}
                      alt={episode.title}
                      className={styles.episodeImage}
                    />
                    <div className={styles.episodeInfo}>
                      <p className={styles.episodeNumber}>
                        Episode {episode.episode}
                      </p>
                      <h4 className={styles.episodeTitle}>{episode.title}</h4>
                      <p className={styles.episodeDescription}>
                        {episode.description.length > 150
                          ? episode.description.slice(0, 150) + "..."
                          : episode.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}