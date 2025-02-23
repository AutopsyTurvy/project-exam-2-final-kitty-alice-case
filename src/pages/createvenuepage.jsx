




// src/pages/createvenuepage.jsx





import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../components/loader"; 
import Button from "../components/buttons/button";  
import "../styles/createvenue.css";

const API_BASE = "https://v2.api.noroff.dev";

function CreateVenuesPage() {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    mediaUrl: "",
    mediaAlt: "",
    price: "",
    maxGuests: "",
    rating: "",
    address: "",
    city: "",
    zip: "",
    country: "",
    continent: "",
    wifi: false,
    parking: false,
    breakfast: false,
    pets: false,
  });

  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  
  useEffect(() => {
    const storedProfile = JSON.parse(localStorage.getItem("Profile"));
    if (storedProfile && storedProfile.name) {
      setProfileData(storedProfile);
    } else {
      setProfileData(null);
    }
  }, []);
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage("");

    if (!formData.name.trim() || !formData.description.trim() || !formData.price || !formData.maxGuests) {
      setError("Please fill in all required fields.");
      return;
    }

    const token = localStorage.getItem("Token");
    const apiKey = localStorage.getItem("ApiKey");

    if (!token || !apiKey || !profileData) {
      setError("Authentication details missing. Please log in again.");
      return;
    }

    const venueData = {
      name: formData.name.trim(),
      description: formData.description.trim(),
      price: Number(formData.price),
      maxGuests: Number(formData.maxGuests),
      rating: formData.rating ? Number(formData.rating) : 0,
      media: formData.mediaUrl ? [{ url: formData.mediaUrl, alt: formData.mediaAlt || "Venue Image" }] : [],
      meta: {
        wifi: formData.wifi,
        parking: formData.parking,
        breakfast: formData.breakfast,
        pets: formData.pets,
      },
      location: {
        address: formData.address || null,
        city: formData.city || null,
        zip: formData.zip || null,
        country: formData.country || null,
        continent: formData.continent || null,
        lat: 0,
        lng: 0,
      },
      owner: { name: profileData.name },
    };

    try {
      const response = await fetch(`${API_BASE}/holidaze/venues`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "X-Noroff-API-Key": apiKey,
        },
        body: JSON.stringify(venueData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.errors?.[0]?.message || "Failed to create venue. Please try again later.");
      }

      setSuccessMessage("🎉 Venue created successfully!");
      setError(null);

      if (profileData._count && typeof profileData._count.venues === "number") {
        profileData._count.venues += 1;
      } else {
        profileData._count = { venues: 1 };
      }
      localStorage.setItem("Profile", JSON.stringify(profileData));

      setTimeout(() => {
        if (profileData && profileData.venueManager) {
          navigate("/your-venues");  
        } else if (profileData && profileData.name) {
          navigate(`/profile/${profileData.name}`);  
        } else {
          navigate("/");  
        }
      }, 3000);
      
      
      
    } catch (error) {
      console.error("Error:", error.message);
      setError(error.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <div className="create-venue-page">
      <div className="create-venue-container">
        <h1>Create a New Venue</h1>

        {error && <p className="error-message">{error}</p>}
        {successMessage && <div className="success-modal"><p>{successMessage}</p></div>}

        {profileData === null ? (
          <p>Loading profile data...</p>
        ) : profileData.venueManager ? (
          <form onSubmit={handleSubmit} className="create-venue-form">
            <label>Venue Name*</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />

            <label>Description*</label>
            <textarea name="description" value={formData.description} onChange={handleChange} required />

            <label>Image URL</label>
            <input type="url" name="mediaUrl" value={formData.mediaUrl} onChange={handleChange} />

            <label>Image Alt Text</label>
            <input type="text" name="mediaAlt" value={formData.mediaAlt} onChange={handleChange} />

            <label>Price per Night (USD)*</label>
            <input type="number" name="price" value={formData.price} onChange={handleChange} required min="1" />

            <label>Maximum Guests*</label>
            <input type="number" name="maxGuests" value={formData.maxGuests} onChange={handleChange} required min="1" />

            <label>Rating (0-5)</label>
            <input type="number" name="rating" value={formData.rating} onChange={handleChange} min="0" max="5" />

            <div className="amenities-section">
              <label><input type="checkbox" name="wifi" checked={formData.wifi} onChange={handleChange} /> WiFi</label>
              <label><input type="checkbox" name="parking" checked={formData.parking} onChange={handleChange} /> Parking</label>
              <label><input type="checkbox" name="breakfast" checked={formData.breakfast} onChange={handleChange} /> Breakfast</label>
              <label><input type="checkbox" name="pets" checked={formData.pets} onChange={handleChange} /> Pets Allowed</label>
            </div>

            <label>Address</label>
            <input type="text" name="address" value={formData.address} onChange={handleChange} />
            <label>City</label>
            <input type="text" name="city" value={formData.city} onChange={handleChange} />
            <label>Zip Code</label>
            <input type="text" name="zip" value={formData.zip} onChange={handleChange} />
            <label>Country</label>
            <input type="text" name="country" value={formData.country} onChange={handleChange} />
            <label>Continent</label>
            <input type="text" name="continent" value={formData.continent} onChange={handleChange} />

            <Button type="submit" variant="button" className="create-venue-btn">
              Create Venue
            </Button>
          </form>
        ) : (
          <p className="venue-manager-warning">
            Oh no! You need to be a venue manager to create a venue.  
            Register as one in your <a href={`/profile/${profileData?.name || ""}`}>profile</a>.
          </p>

        )}
      </div>
    </div>
  );
}

export default CreateVenuesPage;
