


// src/components/RegisteredHeader.jsx

 
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { logoutUser } from "./logout";
import { FaBars, FaTimes } from "react-icons/fa";
import "../styles/header.css";



function RegisteredHeader({ username }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMyProfileClick = () => {
    if (location.pathname === `/profile/${username}`) {
      window.location.reload();
    } else {
      navigate(`/profile/${username}`);
    }
    setMenuOpen(false); 
  };

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className="user-header">
      <h1>Holidaze</h1>
      
      <h2>Welcome, {username}!</h2>

     
      <button className="menu-toggle" onClick={toggleMenu}>
        {menuOpen ? <FaTimes /> : <FaBars />}
      </button>

     
      <nav className={`nav-links ${menuOpen ? "active" : ""}`}>
        <button onClick={handleMyProfileClick}>My Profile</button>
        <button onClick={() => { navigate("/venues"); closeMenu(); }}>Venues</button>
        <button onClick={() => { logoutUser(); closeMenu(); }}>Logout</button>
      </nav>
    </header>
  );
}

export default RegisteredHeader;
