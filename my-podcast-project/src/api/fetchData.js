const BASE_URL = "https://podcast-api.netlify.app";

/**
 * @function fetchShows
 * Fetch the list of podcast previews from the API.
 * @returns {Promise<Array>} Promise resolving to array of show preview objects
 * @throws {Error} If the fetch request fails
 */
export async function fetchShows() {
  const res = await fetch(`${BASE_URL}/`);
  if (!res.ok) throw new Error("Failed to fetch shows");
  return res.json();
}

/**
 * @function fetchGenreById
 * Fetch genre object by genre ID from the API.
 * @param {string|number} genreId - The genre ID to fetch
 * @returns {Promise<Object>} Promise resolving to genre object with title, description, and shows
 * @throws {Error} If the fetch request fails
 */
export async function fetchGenreById(genreId) {
  const res = await fetch(`${BASE_URL}/genre/${genreId}`);
  if (!res.ok) throw new Error("Failed to fetch genre");
  return res.json();
}

/**
 * @function fetchShowById
 * Fetch detailed show object by show ID from the API.
 * @param {string|number} showId - The show ID to fetch
 * @returns {Promise<Object>} Promise resolving to detailed show object with seasons and episodes
 * @throws {Error} If the fetch request fails
 */
export async function fetchShowById(showId) {
  const res = await fetch(`${BASE_URL}/id/${showId}`);
  if (!res.ok) throw new Error("Failed to fetch show details");
  return res.json();
}