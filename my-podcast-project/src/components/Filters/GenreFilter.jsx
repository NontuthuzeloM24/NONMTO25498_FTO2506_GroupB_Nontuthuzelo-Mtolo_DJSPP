import React, { useEffect, useState } from "react";

/**
 * @component GenreFilter
 * Dropdown component for filtering podcasts by genre.
 * @param {Object} props
 * @param {string} props.selectedGenreId - Currently selected genre ID from URL params
 * @param {Function} props.onChange - Callback function when genre selection changes, receives genreId
 * @returns {jsx.Element} Genre filter dropdown
 */
export default function GenreFilter({ selectedGenreId, onChange }) {
  const [genres, setGenres] = useState([]);

  const myGenres = [
    { id: "1", name: "Personal Growth" },
    { id: "2", name: "Investigative Journalism" },
    { id: "3", name: "History" },
    { id: "4", name: "Comedy" },
    { id: "5", name: "Entertainment" },
    { id: "6", name: "Business" },
    { id: "7", name: "Fiction" },
    { id: "8", name: "News" },
    { id: "9", name: "Kids and Family" },
  ];

  useEffect(() => {
    setGenres(myGenres);
  }, []);

  return (
    <div className="genreFilter">
      <label htmlFor="genre-select">Genre:</label>
      <select
        id="genre-select"
        value={selectedGenreId || ""}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">All Genres</option>
        {genres.map((genre) => (
          <option key={genre.id} value={genre.id}>
            {genre.name}
          </option>
        ))}
      </select>
    </div>
  );
}