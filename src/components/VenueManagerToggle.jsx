


// src/components/VenueManagerToggle



import React from "react";

const API_BASE = "https://v2.api.noroff.dev";

function VenueManagerToggle({ profileData, setProfileData }) {
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
                    "X-Noroff-API-Key": apiKey,
                },
                body: JSON.stringify({ venueManager: true }),
            });

            if (!response.ok) throw new Error(`Failed to update profile: ${response.statusText}`);

            alert("You are now a Venue Manager! You can create venues for other people to enjoy and stay at!");

           
            const updatedProfileResponse = await fetch(`${API_BASE}/holidaze/profiles/${profileData?.name}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "X-Noroff-API-Key": apiKey,
                    "Content-Type": "application/json",
                },
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
            <button className="venue-manager-button" onClick={handleVenueManagerUpdate}>
                Become a Venue Manager
            </button>
        )
    );
}

export default VenueManagerToggle;

