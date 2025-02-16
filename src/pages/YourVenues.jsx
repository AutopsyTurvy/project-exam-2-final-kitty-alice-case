






// src/pages/YourVenues.jsx



import React, { useState, useEffect } from "react";
import EditVenueModal from "../components/EditVenueModal";

const API_BASE = "https://v2.api.noroff.dev";

function YourVenues() {
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

  return (
    <div className="your-venues-container">
      <h1>Your Venues</h1>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {venues.length === 0 ? (
        <p>You haven't created any venues yet.</p>
      ) : (
        <ul>
          {venues.map((venue) => (
            <li key={venue.id}>
              <h2>
                {venue.name} 
                <button onClick={() => { setEditingVenue(venue); setEditingField("name"); }}>✏️</button>
              </h2>
              <p>
                {venue.description} 
                <button onClick={() => { setEditingVenue(venue); setEditingField("description"); }}>✏️</button>
              </p>
              <p>
                Price: ${venue.price} 
                <button onClick={() => { setEditingVenue(venue); setEditingField("price"); }}>✏️</button>
              </p>
              <img
                src={venue.media[0]?.url || "https://via.placeholder.com/150"}
                alt={venue.media[0]?.alt || "Venue Image"}
                style={{ width: "150px", height: "150px", objectFit: "cover" }}
              />
              <button onClick={() => { setEditingVenue(venue); setEditingField("media"); }}>✏️</button>
            </li>
          ))}
        </ul>
      )}

      {editingVenue && (
        <EditVenueModal
          venue={editingVenue}
          field={editingField}
          closeModal={() => setEditingVenue(null)}
          updateVenues={(updatedVenue) => {
            setVenues(venues.map(v => v.id === updatedVenue.id ? updatedVenue : v));
          }}
        />
      )}
    </div>
  );
}

export default YourVenues;
