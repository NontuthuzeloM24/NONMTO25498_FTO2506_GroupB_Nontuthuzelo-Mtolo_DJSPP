import React, { useState, useRef, useEffect } from "react";
import { usePodcastContext } from "../../context/PodcastContext";

/**
 * @component AudioPlayer
 * Global audio player component fixed at the bottom of the screen.
 * Plays episodes with controls for play/pause, seek, and progress tracking.
 * Persists across page navigation and prompts before page reload during playback.
 * @returns {JSX.Element|null} Fixed audio player or null if no episode is loaded
 */
export default function AudioPlayer() {
  const { currentEpisode, clearCurrentEpisode } = usePodcastContext();
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  /**
   * Handle play/pause toggle
   */
  const togglePlayPause = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  /**
   * Handle seek/scrub through audio
   * @param {Event} e - Input change event
   */
  const handleSeek = (e) => {
    const newTime = parseFloat(e.target.value);
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  /**
   * Update current time as audio plays
   */
  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  /**
   * Set duration when metadata loads
   */
  const handleLoadedMetadata = () => {
    setDuration(audioRef.current.duration);
  };

  /**
   * Format time in MM:SS format
   * @param {number} seconds - Time in seconds
   * @returns {string} Formatted time string
   */
  const formatTime = (seconds) => {
    if (isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  /**
   * Prompt user before page reload if audio is playing
   */
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (isPlaying) {
        e.preventDefault();
        e.returnValue = "";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [isPlaying]);

  /**
   * Auto-play when new episode is loaded
   */
  useEffect(() => {
    if (currentEpisode && audioRef.current) {
      audioRef.current.load();
      audioRef.current.play();
      setIsPlaying(true);
    }
  }, [currentEpisode]);

  if (!currentEpisode) return null;

  return (
    <div className="audioPlayer">
      <audio
        ref={audioRef}
        src={currentEpisode.file}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => setIsPlaying(false)}
      />

      <img
        src={currentEpisode.image}
        alt={currentEpisode.title}
      />

      <div className="text">
        <p className="title">{currentEpisode.title}</p>
        <p className="showTitle">{currentEpisode.showTitle}</p>
      </div>

      <div className="controls">
        <button
          className="playButton"
          onClick={togglePlayPause}
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? "⏸" : "▶"}
        </button>

        <span className="time">{formatTime(currentTime)}</span>

        <input
          type="range"
          min="0"
          max={duration || 0}
          value={currentTime}
          onChange={handleSeek}
          className="seekBar"
          aria-label="Seek audio"
        />

        <span className="time">{formatTime(duration)}</span>

        <button
          className="closeButton"
          onClick={clearCurrentEpisode}
          aria-label="Close player"
        >
          ✕
        </button>
      </div>
    </div>
  );
}