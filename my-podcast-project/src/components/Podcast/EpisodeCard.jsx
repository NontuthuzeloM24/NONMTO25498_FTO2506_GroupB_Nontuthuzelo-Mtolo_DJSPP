import React from "react";
import { usePodcastContext } from "../../context/PodcastContext";
import styles from "./EpisodeCard.module.css";

/**
 * @component EpisodeCard
 * Card component for displaying individual episode with play and favourite controls.
 * @param {Object} props
 * @param {Object} props.episode - Episode object
 * @param {string} props.showTitle - Title of the parent show
 * @param {string} props.showImage - Image URL of the parent show
 * @param {number} props.seasonNumber - Season number
 * @returns {JSX.Element} Episode card with play and favourite buttons
 */
export default function EpisodeCard({ episode, showTitle, showImage, seasonNumber }) {
  const { playEpisode, toggleFavourite, isFavourite } = usePodcastContext();

  const episodeData = {
    ...episode,
    showTitle,
    seasonNumber,
    image: episode.image || showImage,
  };

  const handlePlay = () => {
    playEpisode(episodeData);
  };

  const handleFavourite = (e) => {
    e.stopPropagation();
    toggleFavourite(episodeData);
  };

  const isEpisodeFavourite = isFavourite(episode.episode, seasonNumber, showTitle);

  return (
    <div className={styles.episodeCard}>
      <img
        src={episodeData.image}
        alt={episode.title}
        className={styles.image}
      />
      <div className={styles.info}>
        <p className={styles.episodeNumber}>Episode {episode.episode}</p>
        <h4 className={styles.title}>{episode.title}</h4>
        <p className={styles.description}>
          {episode.description.length > 120
            ? episode.description.slice(0, 120) + "..."
            : episode.description}
        </p>
      </div>
      <div className={styles.actions}>
        <button
          className={styles.playButton}
          onClick={handlePlay}
          aria-label="Play episode"
        >
          ▶
        </button>
        <button
          className={`${styles.favouriteButton} ${
            isEpisodeFavourite ? styles.favouriteActive : ""
          }`}
          onClick={handleFavourite}
          aria-label={isEpisodeFavourite ? "Remove from favourites" : "Add to favourites"}
        >
          {isEpisodeFavourite ? "❤️" : "🤍"}
        </button>
      </div>
    </div>
  );
}