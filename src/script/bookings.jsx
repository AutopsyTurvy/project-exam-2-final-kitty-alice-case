





// bookings.js

/*

import React, { useEffect, useState } from 'react';
import { getAllBookings } from './api';






const Bookings = () => {
    const [bookings, setBookings] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchBookings() {
            try {
                const data = await getAllBookings();
                setBookings(data.data); 
            } catch (err) {
                setError(err.message);
            }
        }
        fetchBookings();
    }, []);

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!bookings.length) {
        return <div>Loading bookings...</div>;
    }

    return (
        <div>
            <h1>All Bookings</h1>
            <ul>
                {bookings.map((booking) => (
                    <li key={booking.id}>
                        <p>ID: {booking.id}</p>
                        <p>Date From: {booking.dateFrom}</p>
                        <p>Date To: {booking.dateTo}</p>
                        <p>Guests: {booking.guests}</p>
                        <p>Created: {booking.created}</p>
                        <p>Updated: {booking.updated}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Bookings;


*/