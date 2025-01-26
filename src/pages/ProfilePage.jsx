




// src/pages/ProfilePage.jsx


import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "../styles/modal.css";

const API_BASE = "https://v2.api.noroff.dev"; 

function ProfilePage() {
  const { username } = useParams();
  const [profileData, setProfileData] = useState(null);
  const [error, setError] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState("");
  const [bannerUrl, setBannerUrl] = useState("");
  const [isUpdatingAvatar, setIsUpdatingAvatar] = useState(false);
  const [isUpdatingBanner, setIsUpdatingBanner] = useState(false);
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const [showBannerModal, setShowBannerModal] = useState(false);

  useEffect(() => {
    const localProfile = JSON.parse(localStorage.getItem("Profile"));
    if (localProfile && localProfile.name === username) {
      setProfileData(localProfile);
      setAvatarUrl(localProfile.avatar?.url || "");
      setBannerUrl(localProfile.banner?.url || "");
    } else {
      setError("Profile not found in local storage");
    }
  }, [username]);

  const refreshAccessToken = async () => {
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) {
      throw new Error("No refresh token available. Please log in again.");
    }

    try {
      const response = await fetch(`${API_BASE}/auth/refresh`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refreshToken }),
      });

      if (!response.ok) {
        throw new Error("Failed to refresh access token. Please log in again.");
      }

      const data = await response.json();
      localStorage.setItem("Token", data.accessToken);
      console.log("Access token refreshed:", data.accessToken);
      return data.accessToken;
    } catch (error) {
      console.error("Error refreshing access token:", error);
      throw error;
    }
  };

  const handleAvatarUpdate = async () => {
    if (!avatarUrl.trim()) {
      alert("Avatar URL cannot be empty.");
      return;
    }
  
    const profile = JSON.parse(localStorage.getItem("Profile"));
    const accessToken = profile?.accessToken;
    const apiKey = localStorage.getItem("ApiKey");
  
    if (!accessToken || !apiKey) {
      alert("Authentication or API Key is missing. Please log in again.");
      return;
    }
  
    try {
      new URL(avatarUrl);
    } catch (error) {
      alert("The avatar URL must be a valid, publicly accessible link.");
      return;
    }
  
    setIsUpdatingAvatar(true);
  
    try {
      const response = await fetch(`${API_BASE}/holidaze/profiles/${profileData.name}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "X-Noroff-API-Key": apiKey,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          avatar: {
            url: avatarUrl,
            alt: `${profileData.name}'s updated avatar`,
          },
        }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error response from API:", errorData);
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorData.message}`);
      }
  
      const updatedProfile = await response.json();
      localStorage.setItem("Profile", JSON.stringify(updatedProfile.data));
      setProfileData(updatedProfile.data);
      alert("Avatar updated successfully!");
    } catch (error) {
      console.error("Error updating avatar:", error);
      alert("Failed to update avatar. Please try again.");
    } finally {
      setIsUpdatingAvatar(false);
      setShowAvatarModal(false);
    }
  };

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  if (!profileData) {
    return <p>Loading your profile data...</p>;
  }

  return (
    <div className="profile-page">
      <div className="profile-content">
        <h1>Welcome to your profile, {profileData.name}!</h1>
        <p>Email: {profileData.email}</p>
        {profileData.bio && <p>Bio: {profileData.bio}</p>}

        <div className="profile-avatar-section" style={{ position: "relative" }}>
          <img
            src={profileData.avatar?.url || "/images/default-avatar.jpg"}
            alt={profileData.avatar?.alt || `${profileData.name}'s avatar`}
            className="profile-avatar"
          />
          <button
            className="edit-avatar-button"
            onClick={() => setShowAvatarModal(true)}
            style={{ position: "absolute", top: "10px", right: "10px" }}
          >
            <i className="fa-solid fa-pen-to-square"></i>
          </button>
        </div>

        <div
          className="profile-banner-section"
          style={{
            backgroundImage: `url(${profileData.banner?.url || "/images/default-banner.jpg"})`,
            height: "200px",
            backgroundSize: "cover",
            backgroundPosition: "center",
            position: "relative",
          }}
          aria-label={profileData.banner?.alt || `${profileData.name}'s banner`}
        >
          <button
            className="edit-banner-button"
            onClick={() => setShowBannerModal(true)}
            style={{ position: "absolute", top: "10px", right: "10px" }}
          >
            <i className="fa-solid fa-pen-to-square"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;



