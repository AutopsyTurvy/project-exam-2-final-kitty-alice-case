




// src/pages/BookingsPage.jsx






import React, { useEffect, useState } from "react";
import { fetchAllBookings } from "../api/bookings";
import { format } from "date-fns"; 
import "../styles/bookingspage.css"; 

function BookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getBookings() {
      try {
        const bookingsData = await fetchAllBookings();
        setBookings(bookingsData.data); 
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    getBookings();
  }, []);

  if (isLoading) {
    return <p>Loading bookings...</p>;
  }

  if (error) {
    return <p className="error-message">Error: {error}</p>;
  }

  if (!bookings.length) {
    return <p>No bookings available.</p>;
  }

  return (
    <main className="bookings-page">
      <h1>All Bookings</h1>
      <div className="bookings-list">
        {bookings.map((booking) => (
          <div key={booking.id} className="booking-card">
            <div className="booking-details">
              <p><strong>From:</strong> {format(new Date(booking.dateFrom), "MMMM d, yyyy")}</p>
              <p><strong>To:</strong> {format(new Date(booking.dateTo), "MMMM d, yyyy")}</p>
              <p><strong>Guests:</strong> {booking.guests}</p>
            </div>
            {booking.image && (
              <div className="booking-image">
                <img src={booking.image} alt={`Booking for ${booking.guests} guests`} />
              </div>
            )}
          </div>
        ))}
      </div>
    </main>
  );
}

export default BookingsPage;












