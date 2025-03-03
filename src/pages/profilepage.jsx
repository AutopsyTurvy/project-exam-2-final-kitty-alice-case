





// src/pages/profilepage/profilepage.jsx



import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import ProfileModals from "../components/profilemodals";
import Deleteabooking from "../components/deleteabooking";
import VenueManagerToggle from "../components/venuemanagertoggle";
import Loader from "../components/loader"; 
import "../styles/modal.css";
import "../styles/profile.css";
import "../styles/loader.css";
import "../styles/userbookingsprofilecards.css";
import "../styles/profileresponse.css";
import styles from "../components/buttons/button.module.css";  
import Button from "../components/buttons/button";  

import ProfilePlaceholder from "../assets/images/generalbackgroundimages/profileplaceholder.png";
import BannerPlaceholder from "../assets/images/generalbackgroundimages/bannerplaceholder.png";
import VenuePlaceholder from "../assets/images/generalbackgroundimages/venueplaceholder.png";




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
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();







  useEffect(() => {
    const localProfile = JSON.parse(localStorage.getItem("Profile"));
  
    if (localProfile && localProfile.name === username) {
      setProfileData(localProfile);
      setAvatarUrl(localProfile.avatar?.url || "");
      setBannerUrl(localProfile.banner?.url || "");
      setLoading(false);
    } else {
      setError("Profile not found in local storage");
      setLoading(false); 
    }
  
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
        console.log("User Bookings:", data);
  
        setBookings(data.data || []);
      } catch (error) {
        console.error("Error fetching user bookings:", error);
        setError("Failed to load bookings.");
      }
    };
  
    fetchUserBookings();
  }, [username]);
  



  const handleAvatarUpdate = () => {
    if (!avatarUrl.trim()) return; 
  
    setProfileData((prevProfile) => ({
      ...prevProfile,
      avatar: { url: avatarUrl },
    }));
  
    localStorage.setItem(
      "Profile",
      JSON.stringify({ ...profileData, avatar: { url: avatarUrl } })
    );
  
    setShowAvatarModal(false);
  };
  
  const handleBannerUpdate = () => {
    if (!bannerUrl.trim()) return;
  
    setProfileData((prevProfile) => ({
      ...prevProfile,
      banner: { url: bannerUrl },
    }));
  
    localStorage.setItem(
      "Profile",
      JSON.stringify({ ...profileData, banner: { url: bannerUrl } })
    );
  
    setShowBannerModal(false);
  };





  return (
    <div className="profile-page">
      {loading ? (
        <Loader />
      ) : (
        <div className="profile-content">
  
        
          <header className="profile-header">
            
  
            <div className="profile-info-container">
              <div className="inner-profile-info-container">
                <div className="profile-content-container">
                  <div className="profile-avatar-section">
                    <img
                      src={profileData?.avatar?.url || ProfilePlaceholder}
                      alt={profileData?.avatar?.alt || `${profileData?.name}'s avatar`}
                      className="profile-avatar"
                    />
  
                    {profileData?.venueManager && (
                      <img
                        src="/venuemanagerstamp.png"
                        alt="Venue Manager Stamp"
                        className="venue-manager-stamp"
                      />
                    )}
  
                    <Button
                      variant="secondary"
                      className={styles.editAvatar}
                      onClick={() => setShowAvatarModal(true)}
                      style={{ position: "absolute", top: "10px", right: "10px" }}
                    >
                      <i className="fa-solid fa-pen-to-square"></i>
                    </Button>
                  </div>
  
                  <div className="profile-info">
                    <h1>Welcome to your profile, {profileData?.name}!</h1>
                    <p>--- Your Info ---</p>
                    <p>Email: {profileData?.email}</p>
                    {profileData?.bio && <p>Bio: {profileData.bio}</p>}
  
                    <VenueManagerToggle profileData={profileData} setProfileData={setProfileData} />
  
                    {profileData?.venueManager && (
                      <div className="venue-manager-actions">
                        <Button
                          variant="button"
                          className="create-venue-btn"
                          onClick={() => navigate("/create-venue")}
                        >
                          ➕ Create Venue
                        </Button>
  
                        <Button
                          variant="button"
                          className="your-venues-btn"
                          onClick={() => navigate("/your-venues")}
                        >
                          🏠 Your Venues
                        </Button>
                      </div>
                    )}


                  </div>
                  
                </div>
                <div
              className="profile-banner-section"
              style={{
                backgroundImage: `url(${profileData?.banner?.url || BannerPlaceholder})`,
                height: "200px",
                backgroundSize: "cover",
                backgroundPosition: "center",
                position: "relative",
              }}
              aria-label={profileData?.banner?.alt || `${profileData?.name}'s banner`}
            >
              <Button
                variant="secondary"
                className="edit-banner-button"
                onClick={() => setShowBannerModal(true)}
                style={{ position: "absolute", top: "10px", right: "10px" }}
              >
                <i className="fa-solid fa-pen-to-square"></i>
              </Button>
            </div>
              </div>
            </div>
          </header>
  
          {/* Main Section */}
          <main className="profile-main">
            <div className="user-bookings-container">
              <div className="user-bookings">
                <h2 className="user-bookings-your-bookings-title">
                  {profileData?.name}, here are all of your bookings:
                </h2>
  
                {bookings.length === 0 ? (
                  <p>You have no bookings yet.</p>
                ) : (
                  <ul className="booking-list">
                    {bookings.map((booking) => (
                      <li key={booking.id} id={`booking-${booking.id}`} className="booking-item">
                        <img
                          src={booking.venue.media[0]?.url || VenuePlaceholder}
                          alt={booking.venue.media[0]?.alt || "Venue Image"}
                          className="booking-image"
                        />
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
                          {new Date(new Date(booking.dateTo).setDate(new Date(booking.dateTo).getDate() + 1)).toLocaleDateString()}
                        </p>
  
                        <p>
                          <strong>Guests:</strong> {booking.guests}
                        </p>
  
                        <div className="booking-buttons">
                          <Button
                            variant="button"
                            className="view-venue-button"
                            onClick={() => navigate(`/venue/${booking.venue.id}`)}
                          >
                            🏡 View Venue
                          </Button>
  
                          <Deleteabooking bookingId={booking.id} setBookings={setBookings} />
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
  
            <ProfileModals
              showAvatarModal={showAvatarModal}
              setShowAvatarModal={setShowAvatarModal}
              avatarUrl={avatarUrl}
              setAvatarUrl={setAvatarUrl}
              handleAvatarUpdate={handleAvatarUpdate}
              showBannerModal={showBannerModal}
              setShowBannerModal={setShowBannerModal}
              bannerUrl={bannerUrl}
              setBannerUrl={setBannerUrl}
              handleBannerUpdate={handleBannerUpdate}
            />
          </main>
        </div>
      )}
    </div>
  );
  
  
}

export default ProfilePage;

