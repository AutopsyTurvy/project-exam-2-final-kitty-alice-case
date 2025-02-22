




// src/pages/Venues.jsx




import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Loader from "../components/loader";
import Button from "../components/buttons/button"; 
import "../styles/venues.css";
import "../styles/searchbar.css";
import "../styles/loader.css"; 
import VenuePlaceholder from "../assets/images/generalbackgroundimages/venueplaceholder.png";

const API_BASE = "https://v2.api.noroff.dev";

function Venues() {
  const [venues, setVenues] = useState([]);
  const [filteredVenues, setFilteredVenues] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleVenues, setVisibleVenues] = useState(8); 
  const [sortOption, setSortOption] = useState("newest");

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
    let sortedVenues = [...venues];

    sortedVenues = sortedVenues.filter(
      (venue) =>
        venue.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        venue.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

  
    switch (sortOption) {
      case "cheapest":
        sortedVenues.sort((a, b) => a.price - b.price);
        break;
      case "highestRated":
        sortedVenues.sort((a, b) => b.rating - a.rating);
        break;
      case "mostGuests":
        sortedVenues.sort((a, b) => b.maxGuests - a.maxGuests);
        break;
      case "newest":
        sortedVenues.sort((a, b) => new Date(b.created) - new Date(a.created)); 
        break;
      case "oldest":
        sortedVenues.sort((a, b) => new Date(a.created) - new Date(b.created));
        break;
      case "az":
        sortedVenues.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "za":
        sortedVenues.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        sortedVenues.sort((a, b) => new Date(b.created) - new Date(a.created));
    }




    
    setFilteredVenues(sortedVenues);
}, [searchQuery, venues, sortOption]); 


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
    <div className="all-venues-container-image">
      <div className="all-venues-container">
        <h1 className="all-venues-header">All Venues</h1>
        <p className="all-venues-intro">Let's go on holiday!</p>

        <div className="search-and-sort">
  <input
    type="text"
    placeholder="Search for venues by title or keywords..."
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
    className="search-bar"
  />

  <select
    className="sort-dropdown"
    value={sortOption}
    onChange={(e) => setSortOption(e.target.value)}
  >
    <option value="default">Sort By</option>
    <option value="cheapest">Cheapest First</option>
    <option value="highestRated">Highest Rated</option>
    <option value="mostGuests">Most Guests</option>
    <option value="newest">Newest First</option>
    <option value="oldest">Oldest First</option>
    <option value="az">A-Z</option>
    <option value="za">Z-A</option>
  </select>
</div>

        <div className="all-venues-grid">
          {filteredVenues.length > 0 ? (
            filteredVenues.slice(0, visibleVenues).map((venue) => (
              <div key={venue.id} className="all-venue-card">
                <img 
                  src={venue.media[0]?.url || VenuePlaceholder} 
                  alt={venue.media[0]?.alt || "Venue Image"} 
                />
                <div className="all-venue-card-content">
                  <h2>{venue.name}</h2>
                  <p>{venue.description}</p>
                  <p className="price">Price: ${venue.price}</p>
                  <p>Max Guests: {venue.maxGuests}</p>
                  <p>Rating: {venue.rating}</p>
                  
                 
                  <Link to={`/venue/${venue.id}`}>
                    <Button variant="button" className="see-more-button">
                      View Details
                    </Button>
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p className="no-venues-message">No venues match your search.</p>
          )}
        </div>










        {filteredVenues.length > visibleVenues && (
          <Button variant="button" className="see-more-button" onClick={loadMoreVenues}>
            See More Venues
          </Button>
        )}
        
        {visibleVenues > 8 && (
          <Button variant="button" className="see-less-button" onClick={showLessVenues}>
            See Less Venues
          </Button>
        )}
      </div>
    </div>
  );
}

export default Venues;

