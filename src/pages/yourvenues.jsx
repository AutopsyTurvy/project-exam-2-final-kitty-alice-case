


// src/pages/YourVenues.jsx







import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import EditVenueModal from "../components/EditVenueModal";
import Loader from "../components/loader"; 
import "../styles/yourvenues.css"; 
import "../styles/nocreatedvenues.css"; 
import "../styles/modal.css"; 
import "@fortawesome/fontawesome-free/css/all.min.css";
import VenuePlaceholder from "../assets/Images/GeneralBackgroundImages/venueplaceholder.png";

const API_BASE = "https://v2.api.noroff.dev";

function YourVenues() {
  const navigate = useNavigate();
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingVenue, setEditingVenue] = useState(null); 
  const [editingField, setEditingField] = useState(""); 

  useEffect(() => {
    const fetchVenues = async () => {
      const token = localStorage.getItem("Token");
      const apiKey = localStorage.getItem("ApiKey");
      const storedProfile = JSON.parse(localStorage.getItem("Profile"));

      if (!token || !apiKey || !storedProfile) {
        setError("You must be logged in to view your venues.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `${API_BASE}/holidaze/profiles/${storedProfile.name}/venues?_owner=true`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "X-Noroff-API-Key": apiKey,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setVenues(data.data);
      } catch (error) {
        setError("Error fetching venues.");
      } finally {
        setLoading(false);
      }
    };

    fetchVenues();
  }, []);

  const deleteVenue = async (venueId) => {
    const token = localStorage.getItem("Token");
    const apiKey = localStorage.getItem("ApiKey");
    const storedProfile = JSON.parse(localStorage.getItem("Profile"));

    if (!token || !apiKey) {
      setError("Authentication details missing.");
      return;
    }

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this venue? This action is permanent!"
    );
    if (!confirmDelete) return;

    try {
      const response = await fetch(`${API_BASE}/holidaze/venues/${venueId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "X-Noroff-API-Key": apiKey,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to delete venue: ${response.statusText}`);
      }

      setVenues(venues.filter((venue) => venue.id !== venueId));

      storedProfile._count.venues -= 1;
      localStorage.setItem("Profile", JSON.stringify(storedProfile));

      alert("Venue deleted successfully!");
    } catch (error) {
      console.error("Error deleting venue:", error.message);
      setError("Failed to delete venue.");
    }
  };






  
  return (
    <div className="your-venues-container">
      

      {loading && <Loader />}
      {error && <p className="error-message">{error}</p>}





      {!loading && venues.length === 0 && !error && (
        <div className="no-venues-container">
          <p>You haven't created any venues yet.</p>
          <button className="create-venue-btn" onClick={() => navigate("/create-venue")}>
            ➕ Create a Venue
          </button>
        </div>
      )}


      {!loading && venues.length > 0 && (
        <>
          

          <h1 className="venues-manage-title">Venues you manage:</h1>
          <div className="venues-grid">
            {venues.map((venue) => (
              <div key={venue.id} className="venue-card">

                
                <div className="venue-image-container">
                  <img
                    src={venue.media[0]?.url || VenuePlaceholder}
                    alt={venue.media[0]?.alt || "Venue Image"}
                  />

                  <button
                    className="edit-image-btn"
                    onClick={() => {
                      setEditingVenue(venue);
                      setEditingField("media");
                    }}
                  >
                    <i className="fa-solid fa-pen-to-square"></i>
                  </button>
                </div>

                <div className="venue-info-container">
                  <h2>{venue.name}</h2>
                  <button
                    className="edit-btn"
                    onClick={() => {
                      setEditingVenue(venue);
                      setEditingField("name");
                    }}
                  >
                    <i className="fa-solid fa-pen-to-square"></i>
                  </button>
                </div>

                <div className="venue-info-container">
                  <p>{venue.description}</p>
                  <button
                    className="edit-btn"
                    onClick={() => {
                      setEditingVenue(venue);
                      setEditingField("description");
                    }}
                  >
                    <i className="fa-solid fa-pen-to-square"></i>
                  </button>
                </div>

                <div className="venue-info-container">
                  <p>Price: ${venue.price}</p>
                  <button
                    className="edit-btn"
                    onClick={() => {
                      setEditingVenue(venue);
                      setEditingField("price");
                    }}
                  >
                    <i className="fa-solid fa-pen-to-square"></i>
                  </button>
                </div>

                <button
                  className="delete-venue-btn"
                  onClick={() => deleteVenue(venue.id)}
                >
                  ❌ Delete Venue
                </button>
              </div>
            ))}
          </div>
        </>
      )}

      {editingVenue && (
        <EditVenueModal
          venue={editingVenue}
          field={editingField}
          closeModal={() => setEditingVenue(null)}
          updateVenues={(updatedVenue) => {
            setVenues(
              venues.map((v) => (v.id === updatedVenue.id ? updatedVenue : v))
            );
          }}
        />
      )}
    </div>
  );
}

export default YourVenues;
