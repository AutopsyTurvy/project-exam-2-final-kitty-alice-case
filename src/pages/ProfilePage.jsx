







import React from 'react';
import { useParams } from 'react-router-dom';

function ProfilePage() {
  const { username } = useParams(); 

  return (
    <div className="profile-page">
      <h1>Welcome to your profile, {username}!</h1>
      <p>This is your profile page. More details can be added here at your discretion.</p>
    </div>
  );
}


export default ProfilePage;
