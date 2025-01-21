




// src/pages/ProfilePage.jsx



import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RegisteredHeader from "../components/RegisteredHeader";
import '@fortawesome/fontawesome-free/css/all.min.css';
import "../styles/modal.css";

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
      const response = await fetch("https://v2.api.noroff.dev/holidaze/auth/refresh", {
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
      localStorage.setItem("accessToken", data.accessToken);
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

    let accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      alert("Authentication is required. Please log in again.");
      return;
    }

    setIsUpdatingAvatar(true);

    try {
      let response = await fetch(`https://v2.api.noroff.dev/holidaze/profiles/${profileData.name}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          avatar: { url: avatarUrl, alt: `${profileData.name}'s updated avatar` },
        }),
      });

      if (response.status === 401) {
        accessToken = await refreshAccessToken();
        response = await fetch(`https://v2.api.noroff.dev/holidaze/profiles/${profileData.name}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            avatar: { url: avatarUrl, alt: `${profileData.name}'s updated avatar` },
          }),
        });
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
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

  const handleBannerUpdate = async () => {
    if (!bannerUrl.trim()) {
      alert("Banner URL cannot be empty.");
      return;
    }

    let accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      alert("Authentication is required. Please log in again.");
      return;
    }

    setIsUpdatingBanner(true);

    try {
      let response = await fetch(`https://v2.api.noroff.dev/holidaze/profiles/${profileData.name}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          banner: { url: bannerUrl, alt: `${profileData.name}'s updated banner` },
        }),
      });

      if (response.status === 401) {
        accessToken = await refreshAccessToken();
        response = await fetch(`https://v2.api.noroff.dev/holidaze/profiles/${profileData.name}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            banner: { url: bannerUrl, alt: `${profileData.name}'s updated banner` },
          }),
        });
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const updatedProfile = await response.json();
      localStorage.setItem("Profile", JSON.stringify(updatedProfile.data));
      setProfileData(updatedProfile.data);
      alert("Banner updated successfully!");
    } catch (error) {
      console.error("Error updating banner:", error);
      alert("Failed to update banner. Please try again.");
    } finally {
      setIsUpdatingBanner(false);
      setShowBannerModal(false);
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
      <RegisteredHeader username={profileData.name} />

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

        {showAvatarModal && (
          <div className="modal">
            <div className="modal-overlay" onClick={() => setShowAvatarModal(false)}></div>
            <div className="modal-content">
              <h3>Update Your Avatar</h3>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <input
                  type="url"
                  value={avatarUrl}
                  onChange={(e) => setAvatarUrl(e.target.value)}
                  placeholder="Enter new avatar URL"
                  className="avatar-input"
                />
                <button
                  type="button"
                  className="clear-input-button"
                  onClick={() => setAvatarUrl("")}
                  title="Clear input"
                >
                  <i className="fa-solid fa-xmark"></i>
                </button>
              </div>
              <button
                onClick={handleAvatarUpdate}
                disabled={isUpdatingAvatar}
                className="avatar-update-button"
              >
                {isUpdatingAvatar ? "Updating..." : "Update Avatar"}
              </button>
              <button
                onClick={() => setShowAvatarModal(false)}
                className="close-modal-button"
              >
                Close
              </button>
            </div>
          </div>
        )}

        {showBannerModal && (
          <div className="modal">
            <div className="modal-overlay" onClick={() => setShowBannerModal(false)}></div>
            <div className="modal-content">
              <h3>Update Your Banner</h3>
              <input
                type="url"
                value={bannerUrl}
                onChange={(e) => setBannerUrl(e.target.value)}
                placeholder="Enter new banner URL"
                className="banner-input"
              />
              <button
                onClick={handleBannerUpdate}
                disabled={isUpdatingBanner}
                className="banner-update-button"
              >
                {isUpdatingBanner ? "Updating..." : "Update Banner"}
              </button>
              <button
                onClick={() => setShowBannerModal(false)}
                className="close-modal-button"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProfilePage;



