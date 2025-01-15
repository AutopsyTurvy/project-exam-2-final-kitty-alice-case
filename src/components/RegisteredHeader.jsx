


// src/components/RegisteredHeader.jsx



import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

function RegisteredHeader({ username }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const handleMyProfileClick = () => {
    if (location.pathname === `/profile/${username}`) {
      window.location.reload();
    } else {
      navigate(`/profile/${username}`);
    }
  };

  return (
    <header className="user-header">
      <h1>Welcome, {username}!</h1>
      <nav>
        <button onClick={() => navigate("/")}>Home</button>
        <button onClick={handleMyProfileClick}>My Profile</button>
        <button onClick={() => navigate("/bookings")}>Bookings</button> 
        <button onClick={handleLogout}>Logout</button>
      </nav>
    </header>
  );
}

export default RegisteredHeader;



