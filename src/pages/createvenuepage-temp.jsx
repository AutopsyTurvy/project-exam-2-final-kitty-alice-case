




// src/pages/CreateVenuePage.jsx






import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader"; 
import "../styles/createvenue.css";

const API_BASE = "https://v2.api.noroff.dev";

function CreateVenuesPage() {
  const navigate = useNavigate();
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
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };








  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage("");
  
    
    if (!formData.name || !formData.description || !formData.price || !formData.maxGuests) {
      setError("Please fill in all required fields.");
      setLoading(false);
      return;
    }
  
    const token = localStorage.getItem("Token");
    const apiKey = localStorage.getItem("ApiKey");
    const storedProfile = JSON.parse(localStorage.getItem("Profile"));
  
    if (!token || !apiKey || !storedProfile) {
      setError("Authentication details missing. Please log in again.");
      setLoading(false);
      return;
    }
  
    const venueData = {
      name: formData.name,
      description: formData.description,
      price: Number(formData.price),
      maxGuests: Number(formData.maxGuests),
      rating: formData.rating ? Number(formData.rating) : 0,
      media: formData.mediaUrl
        ? [{ url: formData.mediaUrl, alt: formData.mediaAlt || "Venue Image" }]
        : [],
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
      owner: { name: storedProfile.name },
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
        console.error("API Error:", data);
        throw new Error(
          data.errors?.[0]?.message || "Failed to create venue. Please try again later."
        );
      }
  
      setSuccessMessage("🎉 Venue created successfully!");
  
      storedProfile._count.venues += 1;
      localStorage.setItem("Profile", JSON.stringify(storedProfile));
  
      setTimeout(() => {
        navigate("/your-venues");
      }, 2000);
    } catch (error) {
      console.error("Error:", error.message);
      setError(error.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  












  return (
    <div className="create-venue-page">
      <div className="create-venue-container">
        <h1>Create a New Venue</h1>
        
        {error && <p className="error-message">{error}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
  
        {loading ? (
          <Loader /> 
        ) : (
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

            <button type="submit" disabled={loading}>
              {loading ? "Creating Venue..." : "Create Venue"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default CreateVenuesPage;

