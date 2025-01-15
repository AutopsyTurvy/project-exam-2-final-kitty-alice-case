




// src/pages/ProfilePage.jsx


import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RegisteredHeader from "../components/RegisteredHeader"; 

function ProfilePage() {
  const { username } = useParams();
  const [profileData, setProfileData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    
    const localProfile = JSON.parse(localStorage.getItem("Profile"));
    if (localProfile && localProfile.name === username) {
      setProfileData(localProfile);
    } else {
      setError("Profile not found in local storage");
    }
  }, [username]);

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
      </div>
    </div>
  );
}

export default ProfilePage;

