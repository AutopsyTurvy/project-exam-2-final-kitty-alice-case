




// src/pages/ProfilePage.jsx



import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RegisteredHeader from "../components/RegisteredHeader";

function ProfilePage() {
  const { username } = useParams();
  const [profileData, setProfileData] = useState(null);
  const [error, setError] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    const localProfile = JSON.parse(localStorage.getItem("Profile"));
    if (localProfile && localProfile.name === username) {
      setProfileData(localProfile);
      setAvatarUrl(localProfile.avatar?.url || "");
    } else {
      setError("Profile not found in local storage");
    }
  }, [username]);

  const handleAvatarUpdate = () => {
    if (!avatarUrl.trim()) {
      alert("Avatar URL cannot be empty.");
      return;
    }

    setIsUpdating(true);
    const updatedProfile = {
      ...profileData,
      avatar: { url: avatarUrl, alt: `${profileData.name}'s updated avatar` },
    };

    localStorage.setItem("Profile", JSON.stringify(updatedProfile));
    setProfileData(updatedProfile);
    setIsUpdating(false);
    alert("Avatar updated successfully!");
  };

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  if (!profileData) {
    return <p>Loading...</p>;
  }

  return (
    <div className="profile-page">
      <RegisteredHeader username={profileData.name} />

      <div className="profile-content">
        <h1>Welcome to your profile, {profileData.name}!</h1>
        <p>Email: {profileData.email}</p>
        {profileData.bio && <p>Bio: {profileData.bio}</p>}

        <img
          src={profileData.avatar?.url || "/images/default-avatar.jpg"}
          alt={profileData.avatar?.alt || `${profileData.name}'s avatar`}
          className="profile-avatar"
        />

        <div
          style={{
            backgroundImage: `url(${profileData.banner?.url || "/images/default-banner.jpg"})`,
            height: "200px",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          aria-label={profileData.banner?.alt || `${profileData.name}'s banner`}
        ></div>

        <div className="avatar-update-section">
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
            disabled={isUpdating}
            className="avatar-update-button"
          >
            {isUpdating ? "Updating..." : "Update Avatar"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;


