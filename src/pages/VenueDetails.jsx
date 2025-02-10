




// src/pages/VenueDetails.jsx



import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Calendar from 'react-calendar'; 
import '../styles/venuedetails.css'; 
import '../styles/calendar.css';



const API_URL = 'https://v2.api.noroff.dev/holidaze/venues';

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
      const user = JSON.parse(localStorage.getItem('Profile'));
      if (user) {
        setIsUserLoggedIn(true);
        setUserId(user.id);
      }
  
      const fetchVenue = async () => {
        try {
          const response = await fetch(`${API_URL}/${id}?_bookings=true`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
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
              dateFrom: new Date(booking.dateFrom).toISOString().split('T')[0],
              dateTo: new Date(booking.dateTo).toISOString().split('T')[0],
            }));
  
          const otherBookingRanges = bookings
            .filter((booking) => booking.customerId !== user?.id)
            .map((booking) => ({
              dateFrom: new Date(booking.dateFrom).toISOString().split('T')[0],
              dateTo: new Date(booking.dateTo).toISOString().split('T')[0],
            }));
  
          setUserBookings(userBookingRanges);
          setBookedDates(otherBookingRanges);
  
        } catch (error) {
          console.error('Error fetching venue details:', error);
          setError('Error fetching venue details');
        } finally {
          setLoading(false);
        }
      };
  
      fetchVenue();
    }, [id]);
  
    
    useEffect(() => {
      if (userBookings.length > 0 || bookedDates.length > 0) {
        setTimeout(() => {  
          const tiles = document.querySelectorAll('.react-calendar__tile');
    
          tiles.forEach((tile) => {
            if (tile.classList.contains('booked-range')) {
              tile.style.backgroundColor = 'red';
              tile.style.color = 'white';
              tile.style.textDecoration = 'line-through';
            } else if (tile.classList.contains('user-booking')) {
              tile.style.backgroundColor = 'blue';
              tile.style.color = 'white';
            }
          });
        }, 0);
      }
    }, [userBookings, bookedDates]);
    
  
    const handleDateSelection = (dates) => {
      if (Array.isArray(dates) && dates.length === 2 && dates[0] && dates[1]) {
        setSelectedDates(dates);
        console.log("Selected Dates:", dates[0].toISOString(), "to", dates[1].toISOString());
      } else {
        console.warn("Invalid date selection:", dates);
      }
    };
  






// To handle booking via calendar

  const handleBooking = async () => {
    const userProfile = JSON.parse(localStorage.getItem("Profile"));
    console.log("Retrieved User Profile:", userProfile);

    if (!userProfile) {
        console.error("No user profile found.");
        alert("You must be logged in to book a venue.");
        return;
    }

    let rawToken = localStorage.getItem("Token");
    let authToken = rawToken ? rawToken.replace(/^"+|"+$/g, '').trim() : null;
    console.log("Cleaned Auth Token:", authToken);

    if (!authToken) {
        console.error("Missing Token.");
        alert("Authentication error: Missing token.");
        return;
    }
   
    let rawApiKey = localStorage.getItem("ApiKey");
    let API_KEY = rawApiKey ? rawApiKey.replace(/^"+|"+$/g, '').trim() : null;
    console.log("Cleaned API Key:", API_KEY);

    if (!API_KEY) {
        console.warn("API Key is missing. Attempting to regenerate...");
        try {
            API_KEY = await createApiKey();
            API_KEY = API_KEY.replace(/^"+|"+$/g, '').trim();
            localStorage.setItem("ApiKey", API_KEY);
            console.log("New API Key Stored:", API_KEY);
        } catch (error) {
            console.error("Failed to generate API Key:", error);
            alert("Failed to get API Key. Please log out and log in again.");
            return;
        }
    }


 
    if (!selectedDates || selectedDates.length !== 2 || !selectedDates[0] || !selectedDates[1]) {
        console.warn("Invalid date selection:", selectedDates);
        alert("Please select valid dates before booking.");
        return;
    }
   
    if (guests < 1 || guests > venue.maxGuests) {
        console.warn(`Invalid number of guests: ${guests}`);
        alert(`Please select a number of guests between 1 and ${venue.maxGuests}.`);
        return;
    }

    console.log("Selected Dates:", selectedDates[0].toISOString(), "to", selectedDates[1].toISOString());
    console.log("Number of Guests:", guests);
    console.log("Venue ID:", id);
  
    const adjustedEndDate = new Date(selectedDates[1]);
adjustedEndDate.setDate(adjustedEndDate.getDate() - 1); 

const bookingData = {
    dateFrom: selectedDates[0].toISOString(),
    dateTo: adjustedEndDate.toISOString(), 
    guests: guests,
    venueId: id
};

    console.log("Booking Data to Send:", bookingData);

    try {
        console.log("Sending booking request...");

        

        // Headers 
        const headers = {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${authToken}`,
          "X-Noroff-API-Key": API_KEY,
      };
      
      

        console.log("Final Request Headers:", headers);

       
        const response = await fetch("https://v2.api.noroff.dev/holidaze/bookings", {
          method: "POST",
          headers: headers,
          body: JSON.stringify(bookingData),
          mode: "cors" 
      });

        console.log("Raw Response:", response);

        if (!response.ok) {
            const errorText = await response.text();
            console.error(`HTTP Error! Status: ${response.status}. Response Text: ${errorText}`);
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const responseData = await response.json();
        console.log("Booking confirmed:", responseData);
        alert("🎉 Booking successful!");

        setBookedDates([...bookedDates, { from: bookingData.dateFrom, to: bookingData.dateTo }]);

    } catch (error) {
        console.error("Error making booking:", error);
        alert("Failed to make a booking. Please try again.");
    }
};










  if (loading) return <div>Loading venue details...</div>;
  if (error) return <div>{error}</div>;

 







  const tileClassName = ({ date, view }) => {
    if (view === 'month') {
      const dateString = date.toISOString().split('T')[0];
  
    
      const isUserBooking = userBookings.some(
        (range) => dateString >= range.dateFrom && dateString <= range.dateTo
      );
  
      
      const isOtherBooking = bookedDates.some(
        (range) => dateString >= range.dateFrom && dateString <= range.dateTo
      );
  
      if (isUserBooking) return 'react-calendar__tile user-booking';
      if (isOtherBooking) return 'react-calendar__tile booked-range';
    }
    return '';
  };


  const tileDisabled = ({ date, view }) => {
    if (view === 'month') {
      const dateString = date.toISOString().split('T')[0];
      const today = new Date().toISOString().split('T')[0];

      return (
        dateString < today || 
        bookedDates.some((range) => dateString >= range.from && dateString <= range.to) 
      );
    }
    return false;
  };

  return (
    <div className="venue-details-container">
      <img
        className="venue-hero"
        src={venue.media[0]?.url || 'https://via.placeholder.com/150'}
        alt={venue.media[0]?.alt || 'Venue Image'}
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
          <li>WiFi: {venue.meta?.wifi ? 'Yes' : 'No'}</li>
          <li>Parking: {venue.meta?.parking ? 'Yes' : 'No'}</li>
          <li>Breakfast: {venue.meta?.breakfast ? 'Yes' : 'No'}</li>
          <li>Pets Allowed: {venue.meta?.pets ? 'Yes' : 'No'}</li>
        </ul>
      </div>

      <div className="venue-location">
        <strong>Location:</strong> {venue.location?.address}, {venue.location?.city}, {venue.location?.country}
      </div>

      <div className="venue-calendar">
        <h2>Availability Calendar</h2>
        <Calendar 
          tileClassName={tileClassName}
          tileDisabled={tileDisabled}
          selectRange={true}
          onChange={handleDateSelection}
          value={selectedDates}
        />

<p>
    <strong>Note:</strong> 
    All bookings are shown in <span style={{ color: 'blue', fontWeight: 'bold' }}>blue, </span>please choose dates in white only.
</p>
        
        <button onClick={handleBooking} className="booking-button">Book Venue</button>

       
        <div>
          <label htmlFor="guests">Number of Guests:</label>
          <select id="guests" value={guests} onChange={(e) => setGuests(parseInt(e.target.value))}>
            {Array.from({ length: venue.maxGuests }, (_, i) => (
              <option key={i + 1} value={i + 1}>{i + 1}</option>
            ))}
          </select>
        </div>

        <p>All booked dates are shown in red and cannot be selected. Dates before today are also disabled.</p>
        {isUserLoggedIn ? (
          <>
            <p>Select a start and end date to book this venue.</p>
          </>
        ) : (
          <p><strong>Note:</strong> Only registered users can book a venue. Please register to book your holiday.</p>
        )}
      </div>
    </div>
  );
}

export default VenueDetails;

