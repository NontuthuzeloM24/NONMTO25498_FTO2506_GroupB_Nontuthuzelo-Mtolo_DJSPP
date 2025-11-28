import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

/**
 * @component Carousel
 * Horizontally scrollable carousel for displaying recommended podcast shows.
 * Supports arrow navigation with infinite looping and auto-scroll indicators.
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

  if (!shows || shows.length === 0) return null;

  // Get recommended shows (first 8 shows)
  const recommendedShows = shows.slice(0, 8);

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
    setCurrentIndex((prev) =>
      prev === 0 ? recommendedShows.length - 1 : prev - 1
    );
  };

  /**
   * Scroll carousel to show current index card
   */
  useEffect(() => {
    if (carouselRef.current) {
      const cardWidth = 280;
      const scrollPosition = currentIndex * cardWidth;

      carouselRef.current.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
    }
  }, [currentIndex]);

  return (
    <section className="carouselSection">
      <h2>🎧 Recommended Shows</h2>

      <div className="carouselContainer">
        <button
          className="navButton navButtonPrev"
          onClick={goToPrev}
          aria-label="Previous show"
        >
          ‹
        </button>

        <div className="carousel" ref={carouselRef}>
          {recommendedShows.map((show, index) => (
            <Link
              key={show.id}
              to={`/show/${show.id}`}
              className={`carouselCard ${
                index === currentIndex ? "carouselCardActive" : ""
              }`}
            >
              <img
                src={show.image}
                alt={show.title}
                className="carouselImage"
              />
              <div className="carouselInfo">
                <h3 className="carouselTitle">{show.title}</h3>
                <div className="genres">
                  {show.genres?.slice(0, 2).map((genreId) => (
                    <span key={genreId} className="genreTag">
                      {genreMap[genreId] || `Genre ${genreId}`}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>

        <button
          className="navButton navButtonNext"
          onClick={goToNext}
          aria-label="Next show"
        >
          ›
        </button>
      </div>

      <div className="indicators">
        {recommendedShows.map((_, index) => (
          <button
            key={index}
            className={`indicator ${
              index === currentIndex ? "indicatorActive" : ""
            }`}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Go to show ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}