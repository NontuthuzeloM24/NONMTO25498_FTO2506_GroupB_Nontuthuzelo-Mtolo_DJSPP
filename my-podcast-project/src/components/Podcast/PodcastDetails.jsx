import React, { useState } from "react";
import { formatDate } from "../../utils/formatDate";
import EpisodeCard from "./EpisodeCard";

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

  const genreMap = {
    1: "Personal Growth",
    2: "Investigative Journalism",
    3: "History",
    4: "Comedy",
    5: "Entertainment",
    6: "Business",
    7: "Fiction",
    8: "News",
    9: "Kids and Family",
  };

  if (!show) {
    return <p className="notFound">Show not found.</p>;
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
    <section className="podcastDetail">
      <div className="header">
        <img
          className="image"
          src={show.image}
          alt={`${show.title} podcast`}
        />
        <div className="info">
          <h2 className="title">{show.title}</h2>
          <p className="description">{show.description}</p>

          {show.genres && show.genres.length > 0 && (
            <div className="genres">
              {show.genres.map((genre) => (
                <span key={genre} className="genreTag">
                  {genreMap[genre] || `Genre ${genre}`}
                </span>
              ))}
            </div>
          )}

          <p className="lastUpdated">
            Last updated: {formatDate(show.updated)}
          </p>
        </div>
      </div>

      <div className="seasons">
        <h3 className="seasonsTitle">Seasons</h3>
        {show.seasons.map((season) => (
          <div key={season.season} className="season">
            <button
              className="seasonToggle"
              onClick={() => toggleSeason(season.season)}
              aria-expanded={!!expandedSeasons[season.season]}
            >
              <span className="seasonTitle">
                Season {season.season} ({season.episodes.length} episodes)
              </span>
              <span className="seasonIcon">
                {expandedSeasons[season.season] ? "▼" : "▶"}
              </span>
            </button>

            {expandedSeasons[season.season] && (
              <div className="episodeList">
                {season.episodes.map((episode) => (
                  <EpisodeCard
                    key={episode.episode}
                    episode={episode}
                    showTitle={show.title}
                    showImage={season.image || show.image}
                    seasonNumber={season.season}
                  />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}