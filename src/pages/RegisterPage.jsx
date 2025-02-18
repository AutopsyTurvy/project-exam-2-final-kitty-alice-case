


// src/pages/RegisterPage

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser, loginUser } from "../api/auth"; 
import "../styles/register.css";

function RegisterPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    bio: "",
    avatar: "",
    banner: "",
    venueManager: false, 
  });

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value, 
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
       
        const userData = await registerUser(formData);
        console.log("✅ Registration successful:", userData);

        
        const loginData = { email: formData.email, password: formData.password };
        await loginUser(loginData);

        alert("🎉 Registration successful!");
        
      
        navigate(`/profile/${userData.data.name}`);

        
        setTimeout(() => window.location.reload(), 500);
        
    } catch (error) {
        console.error("🚨 Registration error:", error);
        setError(error.message || "An error occurred during registration");
    }
  };

  return (
    <div className="register-page">
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            pattern="^\w+$"
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            pattern=".+@stud\.noroff\.no"
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            minLength="8"
          />
        </label>
        <label>
          Bio (optional):
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            maxLength="160"
          />
        </label>
        <label>
          Avatar URL (optional):
          <input
            type="url"
            name="avatar"
            value={formData.avatar}
            onChange={handleChange}
          />
        </label>
        <label>
          Banner URL (optional):
          <input
            type="url"
            name="banner"
            value={formData.banner}
            onChange={handleChange}
          />
        </label>

        <label className="checkbox-container">
          <input
            type="checkbox"
            name="venueManager"
            checked={formData.venueManager}
            onChange={handleChange}
          />
          Register as a Venue Manager
        </label>

        {error && <p className="error-message">{error}</p>}
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default RegisterPage;

