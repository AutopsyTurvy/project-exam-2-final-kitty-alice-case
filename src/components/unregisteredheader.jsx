




// src/components/unregisteredheader




import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import "../styles/header.css";


function UnregisteredHeader() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className="user-header">
      <h1>Welcome to Holidaze</h1>

     
      <button className="menu-toggle" onClick={toggleMenu}>
        {menuOpen ? <FaTimes /> : <FaBars />}
      </button>

     
      <nav className={`nav-links ${menuOpen ? "active" : ""}`}>
        <button onClick={() => { navigate("/"); closeMenu(); }}>Home</button>
        <button onClick={() => { navigate("/venues"); closeMenu(); }}>Venues</button>
        <button onClick={() => { navigate("/register"); closeMenu(); }}>Register</button>
        <button onClick={() => { navigate("/login"); closeMenu(); }}>Login</button>
      </nav>
    </header>
  );
}

export default UnregisteredHeader;
