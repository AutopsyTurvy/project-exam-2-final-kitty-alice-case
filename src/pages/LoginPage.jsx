


// src/pages/LoginPage.jsx




import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/auth";
import "../styles/login.css";

function LoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      await loginUser(formData);
      alert("🎉 Login successful!");
      
    
      navigate(`/profile/${formData.email.split("@")[0]}`);

     
      setTimeout(() => window.location.reload(), 500);
      
    } catch (error) {
      console.error("🚨 Login error:", error);
      setError(error.message || "An error occurred during login");
    }
  };

  return (
    <div className="login-page">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label>Email:
          <input type="email" name="email" value={formData.email} 
          onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
        </label>
        <label>Password:
          <input type="password" name="password" value={formData.password} 
          onChange={(e) => setFormData({ ...formData, password: e.target.value })} required />
        </label>
        {error && <p className="error-message">{error}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginPage;
