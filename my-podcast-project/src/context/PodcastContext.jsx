import React, { createContext, useContext, useState, useEffect } from "react";

const PodcastContext = createContext();

/**
 * @component PodcastContextProvider
 * Context provider for sharing podcast-related state across the app.
 * Manages audio player, favorites, and theme state with localStorage persistence.
 * @param {Object} props
 * @param {React.ReactNode} props.children - Child components to wrap with context
 * @returns {JSX.Element} Context provider component
 */
export function PodcastContextProvider({ children }) {
  const [currentEpisode, setCurrentEpisode] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [theme, setTheme] = useState("light");

  /**
   * Load favorites and theme from localStorage on mount
   */
  useEffect(() => {
    const savedFavorites = localStorage.getItem("favorites");
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }

    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.setAttribute("data-theme", savedTheme);
    }
  }, []);

  /**
   * Save favorites to localStorage whenever they change
   */
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

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
   * Toggle favorite status of an episode
   * @param {Object} episode - Episode object to favorite/unfavorite
   */
  const toggleFavorite = (episode) => {
    const episodeKey = `${episode.showTitle}-${episode.seasonNumber}-${episode.episode}`;
    
    const exists = favorites.find(
      (fav) =>
        `${fav.showTitle}-${fav.seasonNumber}-${fav.episode}` === episodeKey
    );

    if (exists) {
      // Remove from favorites
      setFavorites((prev) =>
        prev.filter(
          (fav) =>
            `${fav.showTitle}-${fav.seasonNumber}-${fav.episode}` !== episodeKey
        )
      );
    } else {
      // Add to favorites with timestamp
      setFavorites((prev) => [
        ...prev,
        {
          ...episode,
          addedAt: new Date().toISOString(),
        },
      ]);
    }
  };

  /**
   * Check if an episode is favorited
   * @param {number} episodeNumber - Episode number
   * @param {number} seasonNumber - Season number
   * @param {string} showTitle - Show title
   * @returns {boolean} True if episode is favorited
   */
  const isFavorite = (episodeNumber, seasonNumber, showTitle) => {
    return favorites.some(
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
    favorites,
    toggleFavorite,
    isFavorite,
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