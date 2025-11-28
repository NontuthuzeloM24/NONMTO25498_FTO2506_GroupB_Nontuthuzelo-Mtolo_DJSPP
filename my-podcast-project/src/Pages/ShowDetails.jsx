import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { fetchShowById } from "../api/fetchData";
import PodcastDetail from "../components/Podcast/PodcastDetails";
import Loading from "../components/UI/Loading";
import Error from "../components/UI/Error";

/**
 * @component ShowDetails
 * Page component that displays detailed information about a specific podcast show.
 * Fetches show data based on URL parameter and allows navigation back to home.
 * @returns {jsx.Element} The show details page
 */
export default function ShowDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [show, setShow] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /**
   * Handle back button click - preserves homepage filters/search when navigating back
   */
  const handleBackClick = () => {
    if (location.key !== "default") {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  /**
   * Fetch show details when component mounts or ID changes
   */
  useEffect(() => {
    setLoading(true);
    fetchShowById(id)
      .then((data) => {
        setShow(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load show details.");
        setLoading(false);
      });
  }, [id]);
  if (loading) return <Loading />;
if (error) return <Error message={error} />;
return (
<main className="showDetails">
<button className="backButton" onClick={handleBackClick}>
← Back
</button>
  <PodcastDetail show={show} />
</main>
);
}