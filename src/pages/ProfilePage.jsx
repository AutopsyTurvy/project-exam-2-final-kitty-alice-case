




// src/pages/ProfilePage.jsx


import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ProfilePage() {
  const { username } = useParams();
  const [profileData, setProfileData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const response = await fetch(
          `https://v2.api.noroff.dev/users/${username}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch profile data");
        }

        const data = await response.json();
        setProfileData(data);
      } catch (err) {
        setError(err.message);
      }
    }

    fetchProfile();
  }, [username]);

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  if (!profileData) {
    return <p>Loading...</p>;
  }

  return (
    <div className="profile-page">
      <h1>Welcome to your profile, {profileData.name}!</h1>
      <p>Email: {profileData.email}</p>
      {profileData.bio && <p>Bio: {profileData.bio}</p>}
      {profileData.avatar && (
        <img src={profileData.avatar} alt={`${profileData.name}'s avatar`} />
      )}
      {profileData.banner && (
        <div
          style={{
            backgroundImage: `url(${profileData.banner})`,
            height: "200px",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>
      )}
    </div>
  );
}

export default ProfilePage;
