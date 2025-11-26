import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchShows } from "../api/fetchData";
import GenreFilter from "../components/Filters/GenreFilter";
import SearchBar from "../components/Filters/SearchBar";
import SortSelect from "../components/Filters/SortSelect";
import PodcastGrid from "../components/Podcast/PodcastGrid";
import Loading from "../components/UI/Loading";
import Error from "../components/UI/Error";
import styles from "./Home.module.css";

const PAGE_SIZE = 10;

/**
 * @component Home
 * Home page component that displays podcast list with filtering, search, sort, and pagination.
 * Uses URL search parameters to maintain state across navigation.
 * @returns {jsx.Element} The home page with podcast grid and controls
 */
export default function Home() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [shows, setShows] = useState([]);
  const [filteredShows, setFilteredShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  const searchTerm = searchParams.get("search") || "";
  const selectedGenre = searchParams.get("genre") || "";
  const sortOrder = searchParams.get("sort") || "";
  const pageParam = parseInt(searchParams.get("page") || "1", 10);

  /**
   * Load shows once on component mount
   */
  useEffect(() => {
    setLoading(true);
    fetchShows()
      .then((data) => {
        setShows(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load shows");
        setLoading(false);
      });
  }, []);

  /**
   * Apply filters, search, sort, and pagination whenever shows or params change
   */
  useEffect(() => {
    if (!shows.length) return;

    let filtered = [...shows];

    if (selectedGenre) {
      filtered = filtered.filter((show) =>
        show.genres ? show.genres.includes(Number(selectedGenre)) : false
      );
    }

    if (searchTerm) {
      filtered = filtered.filter((show) =>
        show.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (sortOrder === "title-asc") {
      filtered.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortOrder === "title-desc") {
      filtered.sort((a, b) => b.title.localeCompare(a.title));
    } else if (sortOrder === "updated-desc") {
      filtered.sort(
        (a, b) => new Date(b.updated) - new Date(a.updated)
      );
    } else if (sortOrder === "updated-asc") {
      filtered.sort(
        (a, b) => new Date(a.updated) - new Date(b.updated)
      );
    }

    setFilteredShows(filtered);
    setPage(pageParam > 0 ? pageParam : 1);
  }, [shows, searchTerm, selectedGenre, sortOrder, pageParam]);

  /**
   * Handler to update URL params on filter/search/sort change
   * @param {Object} params - Object with key-value pairs to update in URL
   */
  const updateSearchParams = (params) => {
    const newParams = new URLSearchParams(searchParams);
    Object.entries(params).forEach(([key, value]) => {
      if (value) newParams.set(key, value);
      else newParams.delete(key);
    });
    if (!params.page) newParams.delete("page");
    setSearchParams(newParams);
  };

  /**
   * Handle pagination clicks
   * @param {number} newPage - Page number to navigate to
   */
  const goToPage = (newPage) => {
    updateSearchParams({ page: newPage.toString() });
  };

  const totalPages = Math.ceil(filteredShows.length / PAGE_SIZE);
  const pageShows = filteredShows.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  if (loading) return <Loading />;
  if (error) return <Error message={error} />;

  return (
    <main className={styles.home}>
      <section className={styles.filters}>
        <GenreFilter
          selectedGenreId={selectedGenre}
          onChange={(genreId) =>
            updateSearchParams({ genre: genreId, page: "1" })
          }
        />
        <SearchBar
          value={searchTerm}
          onChange={(term) => updateSearchParams({ search: term, page: "1" })}
        />
        <SortSelect
          sortOrder={sortOrder}
          onChange={(order) => updateSearchParams({ sort: order, page: "1" })}
        />
      </section>

      <div className={styles.gridWrapper}>
        <PodcastGrid shows={pageShows} />
      </div>

      {totalPages > 1 && (
        <section className={styles.pagination}>
          {[...Array(totalPages).keys()].map((i) => (
            <button
              key={i + 1}
              className={`${styles.paginationButton} ${
                page === i + 1 ? styles.paginationButtonActive : ""
              }`}
              onClick={() => goToPage(i + 1)}
              aria-current={page === i + 1 ? "page" : undefined}
            >
              {i + 1}
            </button>
          ))}
        </section>
      )}
    </main>
  );
}