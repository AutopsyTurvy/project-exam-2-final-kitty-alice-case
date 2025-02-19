



// src/components/calendar.jsx




import React, { useEffect } from "react";
import Calendar from "react-calendar";
import "../styles/calendar.css";
import backgroundImage from "../assets/Images/GeneralBackgroundImages/calendarbackground.png";

const CalendarComponent = ({
  selectedDates,
  setSelectedDates,
  bookedDates,
  userBookings,
  handleBooking, 
  guests,
  setGuests,
  maxGuests,
  isUserLoggedIn
}) => {
  
  const handleDateSelection = (dates) => {
    if (Array.isArray(dates) && dates.length === 2 && dates[0] && dates[1]) {
      setSelectedDates(dates);
      console.log("Selected Dates:", dates[0].toISOString(), "to", dates[1].toISOString());
    } else {
      console.warn("Invalid date selection:", dates);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      const tiles = document.querySelectorAll(".react-calendar__tile");

      tiles.forEach((tile) => {
        if (tile.classList.contains("booked-range")) {
          tile.style.backgroundColor = "red";
          tile.style.color = "white";
          tile.style.textDecoration = "line-through";
        } else if (tile.classList.contains("user-booking")) {
          tile.style.backgroundColor = "blue";
          tile.style.color = "white";
        }
      });
    }, 0);
  }, [userBookings.length, bookedDates.length]);

  const tileClassName = ({ date, view }) => {
    if (view === "month") {
      const dateString = date.toISOString().split("T")[0];

      const isUserBooking = userBookings.some(
        (range) => dateString >= range.dateFrom && dateString <= range.dateTo
      );

      const isOtherBooking = bookedDates.some(
        (range) => dateString >= range.dateFrom && dateString <= range.dateTo
      );

      if (isUserBooking) return "react-calendar__tile user-booking";
      if (isOtherBooking) return "react-calendar__tile booked-range";
    }
    return "";
  };

  const tileDisabled = ({ date, view }) => {
    if (view === "month") {
      const dateString = date.toISOString().split("T")[0];
      const today = new Date().toISOString().split("T")[0];

      return (
        dateString < today ||
        bookedDates.some((range) => dateString >= range.from && dateString <= range.to)
      );
    }
    return false;
  };

  return (
    <div className="venue-calendar" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: "cover" }}>

      <h2>Availability Calendar</h2>
      
      <Calendar
        tileClassName={tileClassName}
        tileDisabled={tileDisabled}
        selectRange={true}
        onChange={handleDateSelection}
        value={selectedDates}
      />

      <p>
        <strong>Note:</strong> All booked dates are shown in{" "}
        <span style={{ color: "red", textDecoration: "line-through", fontWeight: "bold" }}>red, with a line through them</span>- please choose dates that are not in red.
      </p>

      {isUserLoggedIn ? (
        <>
          <label htmlFor="guests">Number of Guests:</label>
          <select
            id="guests"
            value={guests}
            onChange={(e) => setGuests(parseInt(e.target.value))}
          >
            {Array.from({ length: maxGuests }, (_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>

          <button onClick={handleBooking} className="booking-button">
            Book Venue
          </button>
        </>
      ) : (
        <p>
          <strong>Note:</strong> Only registered users can book a venue. Please register to book your holiday.
        </p>
      )}
    </div>
  );
};

export default CalendarComponent;
