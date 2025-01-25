



// src/pages/UnregisteredVenues.jsx


import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/UnregisteredVenues.css';
import '../styles/searchbar.css';
import { isUserLoggedIn, getUserProfile } from '../api/IsRegistered';
import RegisteredHeader from '../components/RegisteredHeader';
import UnregisteredHeader from '../components/UnregisteredHeader';

const API_URL = 'https://v2.api.noroff.dev/holidaze/venues';

function UnregisteredVenues() {
  const [venues, setVenues] = useState([]);
  const [filteredVenues, setFilteredVenues] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userProfile = getUserProfile();

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const response = await fetch(API_URL, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setVenues(data.data);
        setFilteredVenues(data.data);
      } catch (error) {
        console.error('Error fetching venues:', error);
        setError('Error fetching venues');
      } finally {
        setLoading(false);
      }
    };

    fetchVenues();
  }, []);

  useEffect(() => {
    const filtered = venues.filter((venue) =>
      venue.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      venue.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredVenues(filtered);
  }, [searchQuery, venues]);

  if (loading) {
    return <div>Loading venues...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>





      {/* Conditional Header, based on whether the user is logged in or not */}

      {isUserLoggedIn() ? (
        <RegisteredHeader username={userProfile?.name} />
      ) : (
        <UnregisteredHeader />
      )}
      <div className="venues-container">
        <h1>All Venues</h1>
        <div className="search-bar-container">
          <input
            type="text"
            placeholder="Search for venues by title or keywords..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-bar"
          />
        </div>
        <div className="venues-grid">
          {filteredVenues.length > 0 ? (
            filteredVenues.map((venue) => (
              <Link key={venue.id} to={`/venue/${venue.id}`} className="venue-card-link">
                <div className="venue-card">
                  <img
                    src={venue.media[0]?.url || 'https://via.placeholder.com/150'}
                    alt={venue.media[0]?.alt || 'Venue Image'}
                  />
                  <div className="venue-card-content">
                    <h2>{venue.name}</h2>
                    <p>{venue.description}</p>
                    <p className="price">Price: ${venue.price}</p>
                    <p>Max Guests: {venue.maxGuests}</p>
                    <p>Rating: {venue.rating}</p>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p>No venues match your search.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default UnregisteredVenues;
