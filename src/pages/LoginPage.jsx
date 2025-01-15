




// src/pages/LoginPage.jsx





import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE } from "../api/auth"; 
import "../styles/login.css"; 

function LoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch(`${API_BASE}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed");
      }

      const responseData = await response.json();

     
      localStorage.setItem("Token", responseData.data.accessToken);
      localStorage.setItem("Profile", JSON.stringify(responseData.data));

      alert("Login successful!");
      navigate(`/profile/${responseData.data.name}`); 
    } catch (error) {
      console.error("Login error:", error);
      setError(error.message || "An error occurred during login");
    }
  };

  return (
    <div className="login-page">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Enter your email"
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
            placeholder="Enter your password"
          />
        </label>
        {error && <p className="error-message">{error}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginPage;
