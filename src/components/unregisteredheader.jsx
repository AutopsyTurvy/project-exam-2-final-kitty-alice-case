


// src/components/UnregisteredHeader.jsx



// making the unregistered header a component that can be called conditionally

import React from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/Header.css";

function UnregisteredHeader() {
  const navigate = useNavigate();

  return (
    <header className="user-header">
      <h1>Welcome to Holidaze</h1>
      <nav>
        <button onClick={() => navigate("/")}>Home</button>
        <button onClick={() => navigate("/venues")}>Venues</button>
        <button onClick={() => navigate("/register")}>Register</button>
        <button onClick={() => navigate("/login")}>Login</button>
      </nav>
    </header>
  );
}

export default UnregisteredHeader;
