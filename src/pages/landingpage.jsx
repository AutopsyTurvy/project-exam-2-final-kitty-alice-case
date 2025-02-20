


// src/pages/LandingPage.jsx





import React from 'react';
import { useNavigate } from 'react-router-dom';
import { isUserLoggedIn, getUserProfile } from '../api/isregistered';
import RegisteredHeader from '../components/registeredheader';
import UnregisteredHeader from '../components/unregisteredheader'; 

function LandingPage() {
  const navigate = useNavigate();

  const goToRegister = () => {
    navigate('/register');
  };

  const loggedIn = isUserLoggedIn();
  const userProfile = loggedIn ? getUserProfile() : null;

  return (
    <div>
 
      {loggedIn ? (
        <RegisteredHeader username={userProfile.name} />
      ) : (
        <UnregisteredHeader />
      )}

     
      <h1>Welcome to Holidaze</h1>
      {!loggedIn && <button onClick={goToRegister}>Register</button>}
    </div>
  );
}

export default LandingPage;
