import React, { createContext, useContext } from "react";

const PodcastContext = createContext();

/**
 * @component PodcastContextProvider
 * Context provider for sharing podcast-related state across the app.
 * Currently provides an empty context object - can be extended with shared state.
 * @param {Object} props
 * @param {React.ReactNode} props.children - Child components to wrap with context
 * @returns {jsx.Element} Context provider component
 */
export function PodcastContextProvider({ children }) {
  return (
    <PodcastContext.Provider value={{}}>
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