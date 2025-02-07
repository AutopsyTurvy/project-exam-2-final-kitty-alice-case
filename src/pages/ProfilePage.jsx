

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "../styles/modal.css";
import "../styles/profile.css";



const API_BASE = "https://v2.api.noroff.dev";

function ProfilePage() {
  const { username } = useParams();
  const [profileData, setProfileData] = useState(null);
  const [error, setError] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState("");
  const [bannerUrl, setBannerUrl] = useState("");
  const [bookings, setBookings] = useState([]);
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




    // Fetch User Bookings
    const fetchUserBookings = async () => {
      try {
        const token = localStorage.getItem("Token");
        const apiKey = localStorage.getItem("ApiKey");

        if (!token || !apiKey) {
          console.error("Missing authentication details");
          return;
        }

        const response = await fetch(
          `${API_BASE}/holidaze/profiles/${username}/bookings?_venue=true`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "X-Noroff-API-Key": apiKey,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("📌 User Bookings:", data);

        const filteredBookings = (data.data || []).filter(
          (booking) => booking.venue
        );

        if (filteredBookings.length === 0) {
          console.warn("No valid bookings found with venue data.");
        }

        setBookings(filteredBookings);
      } catch (error) {
        console.error("Error fetching user bookings:", error);
        setError("Failed to load bookings.");
      }
    };

    fetchUserBookings();
  }, [username]);

  // Update Avatar
  const handleAvatarUpdate = () => {
    if (!avatarUrl.trim()) {
      alert("Avatar URL cannot be empty.");
      return;
    }

    const updatedProfile = {
      ...profileData,
      avatar: { url: avatarUrl, alt: `${profileData.name}'s updated avatar` },
    };

    localStorage.setItem("Profile", JSON.stringify(updatedProfile));
    setProfileData(updatedProfile);
    setShowAvatarModal(false);
    alert("Avatar updated successfully!");
  };

  // Update Banner
  const handleBannerUpdate = () => {
    if (!bannerUrl.trim()) {
      alert("Banner URL cannot be empty.");
      return;
    }

    const updatedProfile = {
      ...profileData,
      banner: { url: bannerUrl, alt: `${profileData.name}'s updated banner` },
    };

    localStorage.setItem("Profile", JSON.stringify(updatedProfile));
    setProfileData(updatedProfile);
    setShowBannerModal(false);
    alert("Banner updated successfully!");
  };

  if (error) {
    return <p className="error-message">{error}</p>;
  }




  return (
    <div className="profile-page">
      <div className="profile-content">













{/* Background Image for Profile */}
<div className="profile-info-container">

  {/* Banner Section */}
  <div
    className="profile-banner-section"
    style={{
      backgroundImage: `url(${profileData?.banner?.url || "/images/default-banner.jpg"})`,
      height: "200px",
      backgroundSize: "cover",
      backgroundPosition: "center",
      position: "relative",
    }}
    aria-label={profileData?.banner?.alt || `${profileData?.name}'s banner`}
  >
    <button
      className="edit-banner-button"
      onClick={() => setShowBannerModal(true)}
      style={{ position: "absolute", top: "10px", right: "10px" }}
    >
      <i className="fa-solid fa-pen-to-square"></i>
    </button>
  </div>

  {/* Profile Content: */}
  <div className="profile-content-container">
    
    {/* Avatar Section */}
    <div className="profile-avatar-section">
      <img
        src={profileData?.avatar?.url || "/images/default-avatar.jpg"}
        alt={profileData?.avatar?.alt || `${profileData?.name}'s avatar`}
        className="profile-avatar"
      />
      <button className="edit-avatar-button" onClick={() => setShowAvatarModal(true)}>
        <i className="fa-solid fa-pen-to-square"></i>
      </button>
    </div>

    {/* Profile Info */}
    <div className="profile-info">
      <h1>Welcome to your profile, {profileData?.name}!</h1>
      <p>Email: {profileData?.email}</p>
      {profileData?.bio && <p>Bio: {profileData.bio}</p>}
    </div>

  </div>

</div>






        {/* User Bookings Section */}
        <div className="user-bookings">
          <h2>Your Bookings</h2>
          {bookings.length === 0 ? (
            <p>You have no bookings yet.</p>
          ) : (
            <ul className="booking-list">
              {bookings.map((booking) => (
                <li key={booking.id} className="booking-item">
                  <h3>{booking.venue.name}</h3>
                  <p>
                    <strong>Location:</strong> {booking.venue.location.city},{" "}
                    {booking.venue.location.country}
                  </p>
                  <p>
                    <strong>Check-in:</strong>{" "}
                    {new Date(booking.dateFrom).toLocaleDateString()}
                  </p>
                  <p>
                    <strong>Check-out:</strong>{" "}
                    {new Date(booking.dateTo).toLocaleDateString()}
                  </p>
                  <p>
                    <strong>Guests:</strong> {booking.guests}
                  </p>
                  <img
                    src={booking.venue.media[0]?.url || "https://via.placeholder.com/150"}
                    alt={booking.venue.media[0]?.alt || "Venue Image"}
                    className="booking-image"
                  />
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Avatar Update Modal */}
        {showAvatarModal && (
          <div className="modal">
            <div className="modal-content">
              <button className="close-modal-button" onClick={() => setShowAvatarModal(false)}>
                ❌
              </button>
              <h3>Update Avatar</h3>
              <div style={{ display: "flex", alignItems: "center" }}>
                <input
                  type="text"
                  placeholder="Enter new avatar URL"
                  value={avatarUrl}
                  onChange={(e) => setAvatarUrl(e.target.value)}
                  className="avatar-input"
                />
                <button className="input-clear-button" onClick={() => setAvatarUrl("")}>
                  Clear
                </button>
              </div>
              <button onClick={handleAvatarUpdate} className="avatar-update-button">
                Update Avatar
              </button>
            </div>
          </div>
        )}

        {/* Banner Update Modal */}
        {showBannerModal && (
          <div className="modal">
            <div className="modal-content">
              <button className="close-modal-button" onClick={() => setShowBannerModal(false)}>
                ❌
              </button>
              <h3>Update Banner</h3>
              <div style={{ display: "flex", alignItems: "center" }}>
                <input
                  type="text"
                  placeholder="Enter new banner URL"
                  value={bannerUrl}
                  onChange={(e) => setBannerUrl(e.target.value)}
                  className="banner-input"
                />
                <button className="input-clear-button" onClick={() => setBannerUrl("")}>
                  Clear
                </button>
              </div>
              <button onClick={handleBannerUpdate} className="banner-update-button">
                Update Banner
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProfilePage;
