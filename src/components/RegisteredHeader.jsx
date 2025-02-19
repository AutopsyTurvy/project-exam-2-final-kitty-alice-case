


// src/components/RegisteredHeader.jsx

 

import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { logoutUser } from "./logout";
import "../styles/Header.css";

function RegisteredHeader({ username }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleMyProfileClick = () => {
    if (location.pathname === `/profile/${username}`) {
      window.location.reload();
    } else {
      navigate(`/profile/${username}`);
    }
  };

  return (
    <header className="user-header">
      <h1>Welcome to Holidaze</h1>
      <h2>Welcome, {username}!</h2>
      <nav>
        <button onClick={() => navigate("/")}>Home</button>
        <button onClick={handleMyProfileClick}>My Profile</button>
        <button onClick={() => navigate("/bookings")}>Bookings</button>
        <button onClick={() => navigate("/venues")}>Venues</button> 
        <button onClick={() => logoutUser()}>Logout</button>
      </nav>
    </header>
  );
}

export default RegisteredHeader;

