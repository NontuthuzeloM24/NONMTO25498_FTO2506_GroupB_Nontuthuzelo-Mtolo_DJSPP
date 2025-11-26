import React, { createContext, useContext, useState, useEffect } from "react";

const PodcastContext = createContext();

/**
 * @component PodcastContextProvider
 * Context provider for sharing podcast-related state across the app.
 * Manages audio player, favourites, and theme state with localStorage persistence.
 * @param {Object} props
 * @param {React.ReactNode} props.children - Child components to wrap with context
 * @returns {JSX.Element} Context provider component
 */
export function PodcastContextProvider({ children }) {
  const [currentEpisode, setCurrentEpisode] = useState(null);
  const [favourites, setFavourites] = useState([]);
  const [theme, setTheme] = useState("light");

  /**
   * Load favourites and theme from localStorage on mount
   */
  useEffect(() => {
    const savedFavourites = localStorage.getItem("favourites");
    if (savedFavourites) {
      setFavourites(JSON.parse(savedFavourites));
    }

    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.setAttribute("data-theme", savedTheme);
    }
  }, []);

  /**
   * Save favourites to localStorage whenever they change
   */
  useEffect(() => {
    localStorage.setItem("favourites", JSON.stringify(favourites));
  }, [favourites]);

  /**
   * Play an episode in the audio player
   * @param {Object} episode - Episode object with file, title, image, etc.
   */
  const playEpisode = (episode) => {
    setCurrentEpisode(episode);
  };

  /**
   * Clear current episode and stop playback
   */
  const clearCurrentEpisode = () => {
    setCurrentEpisode(null);
  };

  /**
   * Toggle favourite status of an episode
   * @param {Object} episode - Episode object to favourite/unfavourite
   */
  const toggleFavourite = (episode) => {
    const episodeKey = `${episode.showTitle}-${episode.seasonNumber}-${episode.episode}`;
    
    const exists = favourites.find(
      (fav) =>
        `${fav.showTitle}-${fav.seasonNumber}-${fav.episode}` === episodeKey
    );

    if (exists) {
      // Remove from favourites
      setFavourites((prev) =>
        prev.filter(
          (fav) =>
            `${fav.showTitle}-${fav.seasonNumber}-${fav.episode}` !== episodeKey
        )
      );
    } else {
      // Add to favourites with timestamp
      setFavourites((prev) => [
        ...prev,
        {
          ...episode,
          addedAt: new Date().toISOString(),
        },
      ]);
    }
  };

  /**
   * Check if an episode is favourited
   * @param {number} episodeNumber - Episode number
   * @param {number} seasonNumber - Season number
   * @param {string} showTitle - Show title
   * @returns {boolean} True if episode is favourited
   */
  const isFavourite = (episodeNumber, seasonNumber, showTitle) => {
    return favourites.some(
      (fav) =>
        fav.episode === episodeNumber &&
        fav.seasonNumber === seasonNumber &&
        fav.showTitle === showTitle
    );
  };

  /**
   * Toggle between light and dark theme
   */
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  const value = {
    currentEpisode,
    playEpisode,
    clearCurrentEpisode,
    favourites,
    toggleFavourite,
    isFavourite,
    theme,
    toggleTheme,
  };

  return (
    <PodcastContext.Provider value={value}>
      {children}
    </PodcastContext.Provider>
  );
}

/**
 * @function usePodcastContext
 * Custom hook to access the PodcastContext.
 * @returns {Object} The podcast context value
 */
export function usePodcastContext() {
  return useContext(PodcastContext);
}