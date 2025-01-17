




// src/pages/ProfilePage.jsx



import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RegisteredHeader from "../components/RegisteredHeader";
import '@fortawesome/fontawesome-free/css/all.min.css';


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

  const handleAvatarUpdate = () => {
    if (!avatarUrl.trim()) {
      alert("Avatar URL cannot be empty.");
      return;
    }

    setIsUpdatingAvatar(true);
    const updatedProfile = {
      ...profileData,
      avatar: { url: avatarUrl, alt: `${profileData.name}'s updated avatar` },
    };

    localStorage.setItem("Profile", JSON.stringify(updatedProfile));
    setProfileData(updatedProfile);
    setIsUpdatingAvatar(false);
    setShowAvatarModal(false);
    alert("Avatar updated successfully!");
  };

  const handleBannerUpdate = () => {
    if (!bannerUrl.trim()) {
      alert("Banner URL cannot be empty.");
      return;
    }

    setIsUpdatingBanner(true);
    const updatedProfile = {
      ...profileData,
      banner: { url: bannerUrl, alt: `${profileData.name}'s updated banner` },
    };

    localStorage.setItem("Profile", JSON.stringify(updatedProfile));
    setProfileData(updatedProfile);
    setIsUpdatingBanner(false);
    setShowBannerModal(false);
    alert("Banner updated successfully!");
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

        <div className="profile-avatar-section">
          <img
            src={profileData.avatar?.url || "/images/default-avatar.jpg"}
            alt={profileData.avatar?.alt || `${profileData.name}'s avatar`}
            className="profile-avatar"
          />
          <button
            className="edit-avatar-button"
            onClick={() => setShowAvatarModal(true)}
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
            <div className="modal-content">
              <h3>Update Your Avatar</h3>
              <input
                type="url"
                value={avatarUrl}
                onChange={(e) => setAvatarUrl(e.target.value)}
                placeholder="Enter new avatar URL"
                className="avatar-input"
              />
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



