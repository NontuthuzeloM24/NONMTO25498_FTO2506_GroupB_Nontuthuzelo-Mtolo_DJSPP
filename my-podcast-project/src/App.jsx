import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { PodcastContextProvider } from "./context/PodcastContext";
import Header from "./components/UI/Header";
import Home from "./Pages/Home";
import ShowDetails from "./Pages/ShowDetails";

/**
 * @component App
 * Main application component that sets up routing and context providers.
 * @returns {jsx.Element} The root application component
 */
export default function App() {
  return (
    <>
      <Header />
      <PodcastContextProvider>
        <div className="app">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/show/:id" element={<ShowDetails />} />
          </Routes>
        </div>
      </PodcastContextProvider>
    </>
  );
}
