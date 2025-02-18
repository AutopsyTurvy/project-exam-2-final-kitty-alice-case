


// src/pages/VenueDetails.jsx

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";
import CalendarComponent from "../components/calendar"; 
import "../styles/venuedetails.css";
import "../styles/calendar.css";

const API_URL = "https://v2.api.noroff.dev/holidaze/venues";

function VenueDetails() {
  const { id } = useParams();
  const [venue, setVenue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDates, setSelectedDates] = useState([null, null]);
  const [bookedDates, setBookedDates] = useState([]);
  const [userId, setUserId] = useState(null);
  const [guests, setGuests] = useState(1);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [userBookings, setUserBookings] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("Profile"));
    if (user) {
      setIsUserLoggedIn(true);
      setUserId(user.id);
    }

    const fetchVenue = async () => {
      try {
        const response = await fetch(`${API_URL}/${id}?_bookings=true`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setVenue(data.data);

        const bookings = data.data.bookings || [];

        const userBookingRanges = bookings
          .filter((booking) => booking.customerId === user?.id)
          .map((booking) => ({
            dateFrom: new Date(booking.dateFrom).toISOString().split("T")[0],
            dateTo: new Date(booking.dateTo).toISOString().split("T")[0],
          }));

        const otherBookingRanges = bookings
          .filter((booking) => booking.customerId !== user?.id)
          .map((booking) => ({
            dateFrom: new Date(booking.dateFrom).toISOString().split("T")[0],
            dateTo: new Date(booking.dateTo).toISOString().split("T")[0],
          }));

        setUserBookings(userBookingRanges);
        setBookedDates(otherBookingRanges);
      } catch (error) {
        console.error("Error fetching venue details:", error);
        setError("Error fetching venue details");
      } finally {
        setLoading(false);
      }
    };

    fetchVenue();
  }, [id]);

  
  const handleBooking = async () => {
    if (!isUserLoggedIn) {
      alert("You must be logged in to book a venue.");
      return;
    }

    if (!selectedDates || selectedDates.length !== 2 || !selectedDates[0] || !selectedDates[1]) {
      alert("Please select valid dates before booking.");
      return;
    }

    if (guests < 1 || guests > venue.maxGuests) {
      alert(`Please select a number of guests between 1 and ${venue.maxGuests}.`);
      return;
    }

    const userProfile = JSON.parse(localStorage.getItem("Profile"));
    const token = localStorage.getItem("Token")?.replace(/^"+|"+$/g, '').trim();
    let apiKey = localStorage.getItem("ApiKey")?.replace(/^"+|"+$/g, '').trim();

    if (!userProfile || !token) {
      alert("Authentication error: Missing user data or token.");
      return;
    }

    if (!apiKey) {
      try {
        apiKey = await createApiKey();
        localStorage.setItem("ApiKey", apiKey);
      } catch (error) {
        alert("Failed to generate API Key. Please log out and log in again.");
        return;
      }
    }

    const adjustedEndDate = new Date(selectedDates[1]);
    adjustedEndDate.setDate(adjustedEndDate.getDate() - 1);

    const bookingData = {
      dateFrom: selectedDates[0].toISOString(),
      dateTo: adjustedEndDate.toISOString(),
      guests,
      venueId: id,
    };

    try {
      const response = await fetch("https://v2.api.noroff.dev/holidaze/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
          "X-Noroff-API-Key": apiKey,
        },
        body: JSON.stringify(bookingData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      alert("🎉 Booking successful!");

      setBookedDates([...bookedDates, { from: bookingData.dateFrom, to: bookingData.dateTo }]);
    } catch (error) {
      alert("Failed to make a booking. Please try again.");
    }
  };

  if (loading) return <Loader />;
  if (error) return <div>{error}</div>;

  return (
    <div className="venue-details-container">
      <img
        className="venue-hero"
        src={venue.media[0]?.url || "https://via.placeholder.com/150"}
        alt={venue.media[0]?.alt || "Venue Image"}
      />
      <h1 className="venue-title">{venue.name}</h1>
      <p className="venue-description">{venue.description}</p>

      <div className="venue-details-grid">
        <p className="venue-detail">Price: ${venue.price}</p>
        <p className="venue-detail">Max Guests: {venue.maxGuests}</p>
        <p className="venue-detail">Rating: {venue.rating}</p>
      </div>

      <div className="venue-features">
        <h3>Features</h3>
        <ul>
          <li>WiFi: {venue.meta?.wifi ? "Yes" : "No"}</li>
          <li>Parking: {venue.meta?.parking ? "Yes" : "No"}</li>
          <li>Breakfast: {venue.meta?.breakfast ? "Yes" : "No"}</li>
          <li>Pets Allowed: {venue.meta?.pets ? "Yes" : "No"}</li>
        </ul>
      </div>

      <div className="venue-location">
        <strong>Location:</strong> {venue.location?.address}, {venue.location?.city},{" "}
        {venue.location?.country}
      </div>

      <CalendarComponent
        selectedDates={selectedDates}
        setSelectedDates={setSelectedDates}
        bookedDates={bookedDates}
        userBookings={userBookings}
        handleBooking={handleBooking} 
        guests={guests} 
        setGuests={setGuests} 
        maxGuests={venue.maxGuests} 
        isUserLoggedIn={isUserLoggedIn}
      />
    </div>
  );
}

export default VenueDetails;
