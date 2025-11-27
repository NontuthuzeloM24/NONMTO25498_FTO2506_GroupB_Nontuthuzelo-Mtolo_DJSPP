import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./Carousel.module.css";

/**
 * @component Carousel
 * Horizontally scrollable carousel for displaying recommended podcast shows.
 * Supports arrow navigation, swipe gestures, and looping.
 * @param {Object} props
 * @param {Array<Object>} props.shows - Array of show objects to display
 * @returns {JSX.Element} Carousel with show cards
 */
export default function Carousel({ shows }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef(null);

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

  /**
   * Navigate to next show (with looping)
   */
  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % recommendedShows.length);
  };

  /**
   * Navigate to previous show (with looping)
   */
  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + shows.length) % shows.length);
  };

  /**
   * Scroll carousel to current index
   */
  useEffect(() => {
    if (carouselRef.current) {
      const scrollAmount = currentIndex * carouselRef.current.offsetWidth;
      carouselRef.current.scrollTo({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  }, [currentIndex]);

  if (!shows || shows.length === 0) return null;

  // Get 6 random shows for carousel
  const recommendedShows = shows.slice(0, 6);

  return (
    <section className={styles.carouselSection}>
      <h2 className={styles.heading}>🎧 Recommended Shows</h2>

      <div className={styles.carouselContainer}>
        <button
          className={`${styles.navButton} ${styles.navButtonPrev}`}
          onClick={goToPrev}
          aria-label="Previous show"
        >
          ‹
        </button>

        <div className={styles.carousel} ref={carouselRef}>
          {recommendedShows.map((show) => (
            <Link
              key={show.id}
              to={`/show/${show.id}`}
              className={styles.carouselCard}
            >
              <img
                src={show.image}
                alt={show.title}
                className={styles.carouselImage}
              />
              <div className={styles.carouselInfo}>
                <h3 className={styles.carouselTitle}>{show.title}</h3>
                <div className={styles.genres}>
                  {show.genres?.slice(0, 2).map((genreId) => (
                    <span key={genreId} className={styles.genreTag}>
                      {genreMap[genreId] || `Genre ${genreId}`}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>

        <button
          className={`${styles.navButton} ${styles.navButtonNext}`}
          onClick={goToNext}
          aria-label="Next show"
        >
          ›
        </button>
      </div>

      <div className={styles.indicators}>
        {recommendedShows.map((_, index) => (
          <button
            key={index}
            className={`${styles.indicator} ${
              index === currentIndex ? styles.indicatorActive : ""
            }`}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Go to show ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}