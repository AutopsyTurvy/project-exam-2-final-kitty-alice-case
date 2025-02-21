


// src/components/bookingsdropdown.jsx



import React, { useState } from "react";
import Button from "../components/buttons/button";  
import "../styles/manageyourvenues.css"; 

function BookingsDropdown({ bookings }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bookings-dropdown">
      <Button
        variant="button"
        className="toggle-bookings-button"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {isExpanded ? "Hide Bookings" : "Show Bookings"}
      </Button>

      {isExpanded && (
        <div className="bookings-container">
          {bookings.length === 0 ? (
            <p>No bookings yet.</p>
          ) : (
            <div className="bookings-grid">
              {bookings.map((booking) => (
                <div key={booking.id} className="booking-card">
                  <h3>Guest: {booking.customer.name}</h3>
                  <p>Email: {booking.customer.email}</p>
                  <p>Check-in: {new Date(booking.dateFrom).toLocaleDateString()}</p>
                  <p>Check-out: {new Date(booking.dateTo).toLocaleDateString()}</p>
                  <p>Guests: {booking.guests}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default BookingsDropdown;

