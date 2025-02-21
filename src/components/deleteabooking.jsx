


// src/components/DeleteABooking.jsx



import React from "react";
import Button from "../components/buttons/button";

const API_BASE = "https://v2.api.noroff.dev";

function DeleteABooking({ bookingId, setBookings }) {
    const handleDeleteBooking = async () => {
        const confirmDelete = window.confirm("Are you sure you want to delete this booking?");
        if (!confirmDelete) return;

        const authToken = localStorage.getItem("Token")?.replace(/^"+|"+$/g, "").trim();
        const API_KEY = localStorage.getItem("ApiKey")?.replace(/^"+|"+$/g, "").trim();

        try {
            console.log("Attempting to delete booking:", bookingId);
            const response = await fetch(`${API_BASE}/holidaze/bookings/${bookingId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${authToken}`,
                    "X-Noroff-API-Key": API_KEY
                }
            });

            console.log("API Response Status:", response.status);

            if (response.status === 204) {
                alert("Booking deleted successfully!");
                setBookings((prevBookings) => prevBookings.filter(booking => booking.id !== bookingId));
            } else {
                alert(`Failed to delete booking. Server responded with status: ${response.status}`);
            }
        } catch (error) {
            console.error("Error deleting booking:", error);
            alert("An error occurred while deleting the booking.");
        }
    };

    return (
        <Button variant="danger" className="delete-booking-button" onClick={handleDeleteBooking}>
            ❌ Cancel Booking
        </Button>
    );
}

export default DeleteABooking;
