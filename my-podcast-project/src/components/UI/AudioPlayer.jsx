import React, { useState, useRef, useEffect } from "react";
import { usePodcastContext } from "../../context/PodcastContext";
import styles from "./AudioPlayer.module.css";

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
    <div className={styles.audioPlayer}>
      <audio
        ref={audioRef}
        src={currentEpisode.file}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => setIsPlaying(false)}
      />

      <div className={styles.info}>
        <img
          src={currentEpisode.image}
          alt={currentEpisode.title}
          className={styles.thumbnail}
        />
        <div className={styles.text}>
          <p className={styles.title}>{currentEpisode.title}</p>
          <p className={styles.showTitle}>{currentEpisode.showTitle}</p>
        </div>
      </div>

      <div className={styles.controls}>
        <button
          className={styles.playButton}
          onClick={togglePlayPause}
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? "⏸" : "▶"}
        </button>

        <span className={styles.time}>{formatTime(currentTime)}</span>

        <input
          type="range"
          min="0"
          max={duration || 0}
          value={currentTime}
          onChange={handleSeek}
          className={styles.seekBar}
          aria-label="Seek audio"
        />

        <span className={styles.time}>{formatTime(duration)}</span>

        <button
          className={styles.closeButton}
          onClick={clearCurrentEpisode}
          aria-label="Close player"
        >
          ✕
        </button>
      </div>
    </div>
  );
}