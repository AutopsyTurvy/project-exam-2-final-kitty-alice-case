






// src/pages/EditVenueModal.jsx


import React, { useState } from "react";
import Button from "../components/buttons/button"; 

const API_BASE = "https://v2.api.noroff.dev";

function EditVenueModal({ venue, field, closeModal, updateVenues }) {
  const [value, setValue] = useState(field === "media" ? venue.media[0]?.url || "" : venue[field]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const token = localStorage.getItem("Token");
    const apiKey = localStorage.getItem("ApiKey");

    const updatedData = {
      [field]: field === "price" || field === "maxGuests" ? Number(value) : value,
    };

    if (field === "media") {
      updatedData.media = [{ url: value, alt: "Updated venue image" }];
    }

    try {
      const response = await fetch(`${API_BASE}/holidaze/venues/${venue.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "X-Noroff-API-Key": apiKey,
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        throw new Error("Failed to update venue.");
      }

      const data = await response.json();
      updateVenues(data.data);
      closeModal();
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <Button variant="danger" className="close-modal-button" onClick={closeModal}>❌</Button>
        <h3>Edit {field.charAt(0).toUpperCase() + field.slice(1)}</h3>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          {field === "media" ? (
            <>
              <label>Image URL</label>
              <input
                type="url"
                className="venue-input"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                required
              />
            </>
          ) : (
            <>
              <label>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
              <input
                type={field === "price" || field === "maxGuests" ? "number" : "text"}
                className="venue-input"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                required
              />
            </>
          )}
          <Button type="submit" variant="button" className="venue-update-button" disabled={loading}>
            {loading ? "Updating..." : "Save"}
          </Button>
          <Button type="button" variant="danger" className="venue-cancel-button" onClick={closeModal}>
            Cancel
          </Button>
        </form>
      </div>
    </div>
  );
}

export default EditVenueModal;

