import React from "react";
import { usePodcastContext } from "../../context/PodcastContext";

/**
 * @component EpisodeCard
 * Card component for displaying individual episode with play and favorite controls.
 * @param {Object} props
 * @param {Object} props.episode - Episode object
 * @param {string} props.showTitle - Title of the parent show
 * @param {string} props.showImage - Image URL of the parent show
 * @param {number} props.seasonNumber - Season number
 * @returns {JSX.Element} Episode card with play and favorite buttons
 */
export default function EpisodeCard({ episode, showTitle, showImage, seasonNumber }) {
  const { playEpisode, toggleFavorite, isFavorite } = usePodcastContext();

  const episodeData = {
    ...episode,
    showTitle,
    seasonNumber,
    image: episode.image || showImage,
  };

  const handlePlay = () => {
    playEpisode(episodeData);
  };

  const handleFavorite = (e) => {
    e.stopPropagation();
    toggleFavorite(episodeData);
  };

  const isEpisodeFavorite = isFavorite(episode.episode, seasonNumber, showTitle);

  return (
    <div className="episodeCard">
      <img
        src={episodeData.image}
        alt={episode.title}
      />
      <div className="episodeInfo">
        <p className="episodeNumber">Episode {episode.episode}</p>
        <h4 className="episodeTitle">{episode.title}</h4>
        <p className="episodeDescription">
          {episode.description.length > 120
            ? episode.description.slice(0, 120) + "..."
            : episode.description}
        </p>
      </div>
      <div className="actions">
        <button
          className="playButton"
          onClick={handlePlay}
          aria-label="Play episode"
        >
          ▶
        </button>
        <button
          className={`favoriteButton ${isEpisodeFavorite ? "favoriteActive" : ""}`}
          onClick={handleFavorite}
          aria-label={isEpisodeFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          {isEpisodeFavorite ? "❤️" : "🤍"}
        </button>
      </div>
    </div>
  );
}