



// src/pages/manageyourvenues.jsx




import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Loader from "../components/loader";
import BookingsDropdown from "../components/bookingsdropdown";

import "../styles/manageyourvenues.css";
import VenuePlaceholder from "../assets/images/generalbackgroundimages/venueplaceholder.png";

const API_URL = "https://v2.api.noroff.dev/holidaze";

function ManageYourVenues() {
  const { venueId } = useParams();
  const navigate = useNavigate();
  const [venue, setVenue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expanded, setExpanded] = useState(false); 
  const [bookings, setBookings] = useState([]); 

  useEffect(() => {
    if (!venueId) {
      setError("Invalid venue ID.");
      setLoading(false);
      return;
    }
  
    const fetchVenue = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${API_URL}/venues/${venueId}?_bookings=true&_customer=true`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );
  
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
  
        const data = await response.json();
        if (!data || !data.data) {
          throw new Error("Invalid venue data received.");
        }
  
        setVenue(data.data);
        setBookings(data.data.bookings || []);  
      } catch (error) {
        setError("Error fetching venue details. Please try again.");
      } finally {
        setLoading(false);
      }
    };
  
    fetchVenue();
  }, [venueId]);
  

  if (loading) return <Loader />;
  if (error) return <div>{error}</div>;

  return (
    <main className="your-manage-venue-page">
      <div className="your-venue-details-page">
        <button className="your-back-btn" onClick={() => navigate(-1)}>🔙</button>
        <div className="your-venue-details-container">
          <img
            className="your-venue-hero"
            src={venue.media?.[0]?.url || VenuePlaceholder}
            alt={venue.media?.[0]?.alt || "Venue Image"}
          />
          <h1 className="your-venue-title">{venue.name}</h1>
          <p className="your-venue-description">{venue.description}</p>

          <div className="your-venue-details-grid">
            <p className="your-venue-detail">Price: ${venue.price}</p>
            <p className="your-venue-detail">Max Guests: {venue.maxGuests}</p>
            <p className="your-venue-detail">Rating: {venue.rating}</p>
          </div>

          <div className="your-venue-features">
            <h3>Features</h3>
            <ul>
              <li>WiFi: {venue.meta?.wifi ? "Yes" : "No"}</li>
              <li>Parking: {venue.meta?.parking ? "Yes" : "No"}</li>
              <li>Breakfast: {venue.meta?.breakfast ? "Yes" : "No"}</li>
              <li>Pets Allowed: {venue.meta?.pets ? "Yes" : "No"}</li>
            </ul>
          </div>

          <div className="your-venue-location">
            <strong>Location:</strong> {venue.location?.address}, {venue.location?.city},{" "}
            {venue.location?.country}
          </div>
        </div>

       
        <div className="bookings-section">
          <h2>Bookings for this Venue</h2>

        

          <BookingsDropdown bookings={bookings} />



        </div>
      </div>
    </main>
  );
}

export default ManageYourVenues;
