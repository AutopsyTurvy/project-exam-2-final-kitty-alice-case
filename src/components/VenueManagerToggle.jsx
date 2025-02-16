



// src/components/VenueManagerToggle.jsx


import React, { useState } from "react";

const API_BASE = "https://v2.api.noroff.dev";

function VenueManagerToggle({ profileData, setProfileData }) {
    const [isRequestingManager, setIsRequestingManager] = useState(false);

    const handleVenueManagerUpdate = async () => {
        const token = localStorage.getItem("Token");
        const apiKey = localStorage.getItem("ApiKey");

        if (!token || !apiKey) {
            alert("You must be logged in to update your profile.");
            return;
        }

        try {
            
            const response = await fetch(`${API_BASE}/holidaze/profiles/${profileData?.name}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                    "X-Noroff-API-Key": apiKey
                },
                body: JSON.stringify({ venueManager: true }),
            });

            if (!response.ok) throw new Error(`Failed to update profile: ${response.statusText}`);

            alert("You are now a Venue Manager!");

        
            const updatedProfile = { ...profileData, venueManager: true };
            setProfileData(updatedProfile);
            localStorage.setItem("Profile", JSON.stringify(updatedProfile));

         
            const updatedProfileResponse = await fetch(`${API_BASE}/holidaze/profiles/${profileData?.name}`, {
                method: "GET",
                headers: { Authorization: `Bearer ${token}`, "X-Noroff-API-Key": apiKey },
            });

            if (!updatedProfileResponse.ok) throw new Error("Failed to reload profile");

            const updatedProfileData = await updatedProfileResponse.json();
            setProfileData(updatedProfileData.data);
            localStorage.setItem("Profile", JSON.stringify(updatedProfileData.data));

        } catch (error) {
            console.error("Error updating profile:", error);
            alert("An error occurred while updating your profile.");
        }
    };

    return (
        !profileData?.venueManager && (
            <div className="venue-manager-checkbox">
                <label>
                    <input
                        type="checkbox"
                        checked={isRequestingManager}
                        onChange={(e) => setIsRequestingManager(e.target.checked)}
                    />
                    I want to become a Venue Manager
                </label>
                <button onClick={handleVenueManagerUpdate}>Update</button>
            </div>
        )
    );
}

export default VenueManagerToggle;
