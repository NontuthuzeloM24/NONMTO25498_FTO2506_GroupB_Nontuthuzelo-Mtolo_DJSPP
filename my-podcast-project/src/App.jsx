import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { PodcastContextProvider } from "./context/PodcastContext";
import Header from "./components/UI/Header";
import AudioPlayer from "./components/UI/AudioPlayer";
import Home from "./Pages/Home";
import ShowDetails from "./Pages/ShowDetails";
import Favourites from "./Pages/Favourites";

/**
 * @component App
 * Main application component that sets up routing, context providers, and global components.
 * Includes the fixed audio player that persists across all pages.
 * @returns {JSX.Element} The root application component
 */
export default function App() {
  return (
    <PodcastContextProvider>
      <div className="app">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/show/:id" element={<ShowDetails />} />
          <Route path="/favourites" element={<Favourites />} />
        </Routes>
        <AudioPlayer />
      </div>
    </PodcastContextProvider>
  );
}
