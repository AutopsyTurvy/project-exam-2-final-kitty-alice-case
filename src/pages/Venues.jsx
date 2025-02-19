




// src/pages/Venues.jsx



import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Loader from "../components/Loader";
import "../styles/Venues.css";
import "../styles/searchbar.css";
import "../styles/loader.css"; 
import VenuePlaceholder from "../assets/Images/GeneralBackgroundImages/venueplaceholder.png";

const API_BASE = "https://v2.api.noroff.dev";

function Venues() {
  const [venues, setVenues] = useState([]);
  const [filteredVenues, setFilteredVenues] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleVenues, setVisibleVenues] = useState(8); 

  const location = useLocation();
  const isYourVenuesPage = location.pathname === "/your-venues";

  useEffect(() => {
    const fetchVenues = async () => {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem("Token");
      const apiKey = localStorage.getItem("ApiKey");
      const storedProfile = JSON.parse(localStorage.getItem("Profile"));

      let endpoint = `${API_BASE}/holidaze/venues`; 

      if (isYourVenuesPage) {
        if (!token || !apiKey || !storedProfile) {
          setError("You must be logged in to view your venues.");
          setLoading(false);
          return;
        }
        endpoint = `${API_BASE}/holidaze/profiles/${storedProfile.name}/venues`;
      }

      try {
        const response = await fetch(endpoint, {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
            "X-Noroff-API-Key": apiKey || "",
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch venues: ${await response.text()}`);
        }

        const data = await response.json();
        setVenues(data.data);
        setFilteredVenues(data.data);
      } catch (error) {
        setError("Error fetching venues.");
      } finally {
        setLoading(false);
      }
    };

    fetchVenues();
  }, [isYourVenuesPage]);

  useEffect(() => {
    const filtered = venues.filter(
      (venue) =>
        venue.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        venue.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredVenues(filtered);
  }, [searchQuery, venues]);

  
  const loadMoreVenues = () => {
    setVisibleVenues((prev) => Math.min(prev + 8, filteredVenues.length));
  };

 
  const showLessVenues = () => {
    setVisibleVenues(8);
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="venues-container-image">
      <div className="venues-container">


      <h1 className="all-venues-header">All Venues</h1>


        <div className="search-bar-container">
          <input
            type="text"
            placeholder="Search for venues by title or keywords..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-bar"
          />
        </div>

        <div className="venues-grid">
  {filteredVenues.length > 0 ? (
    filteredVenues.slice(0, visibleVenues).map((venue) => (
      <Link key={venue.id} to={`/venue/${venue.id}`} className="venue-card-link">
        <div className="venue-card">
          <img 
            src={venue.media[0]?.url || VenuePlaceholder} 
            alt={venue.media[0]?.alt || "Venue Image"} 
          />
          <div className="venue-card-content">
            <h2>{venue.name}</h2>
            <p>{venue.description}</p>
            <p className="price">Price: ${venue.price}</p>
            <p>Max Guests: {venue.maxGuests}</p>
            <p>Rating: {venue.rating}</p>
          </div>
        </div>
      </Link>
    ))
  ) : (
    <p className="no-venues-message">No venues match your search.</p>
  )}
</div>


       
        {filteredVenues.length > visibleVenues && (
          <button className="see-more-button" onClick={loadMoreVenues}>
            See More
          </button>
        )}
        
        {visibleVenues > 8 && (
          <button className="see-less-button" onClick={showLessVenues}>
            See Less
          </button>
        )}
      </div>
    </div>
  );
}

export default Venues;

