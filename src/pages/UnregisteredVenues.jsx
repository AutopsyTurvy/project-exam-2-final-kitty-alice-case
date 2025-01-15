



// src/pages/UnregisteredVenues.jsx


import React, { useEffect, useState } from 'react';
const API_URL = 'https://v2.api.noroff.dev/holidaze/venues';



function UnregisteredVenues() {
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('Access Token:', localStorage.getItem('accessToken'));
    console.log('API Key:', localStorage.getItem('ApiKey'));

    const fetchVenues = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');
        const headers = {
          'Content-Type': 'application/json',
          'x-api-key': localStorage.getItem('ApiKey'),
        };

        if (accessToken) {
          headers.Authorization = `Bearer ${accessToken}`;
        }

        const response = await fetch(API_URL, {
          method: 'GET',
          headers,
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Fetched data:', data);
        setVenues(data.data); 
      } catch (error) {
        console.error('Error fetching venues:', error);
        setError('Error fetching venues');
      } finally {
        setLoading(false);
      }
    };

    fetchVenues();
  }, []);

  if (loading) {
    return <div>Loading venues...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="venues-container">
      <h1>All Venues</h1>
      <div className="venues-grid">
        {Array.isArray(venues) && venues.length > 0 ? (
          venues.map((venue) => (
            <div key={venue.id} className="venue-card">
              <img
                src={venue.media[0]?.url || 'https://via.placeholder.com/150'}
                alt={venue.media[0]?.alt || 'Venue Image'}
              />
              <h2>{venue.name}</h2>
              <p>{venue.description}</p>
              <p>
                <strong>Price:</strong> ${venue.price}
              </p>
              <p>
                <strong>Max Guests:</strong> {venue.maxGuests}
              </p>
              <p>
                <strong>Rating:</strong> {venue.rating}
              </p>
            </div>
          ))
        ) : (
          <p>No venues available</p>
        )}
      </div>
    </div>
  );
}

export default UnregisteredVenues;

