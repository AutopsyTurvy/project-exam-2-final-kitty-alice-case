


// src/pages/LoginPage.jsx




import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/auth";
import Button from "../components/buttons/button";


const API_BASE = "https://v2.api.noroff.dev";

function LoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      await loginUser(formData);
      alert("Login successful!");
      navigate(`/profile/${formData.email.split("@")[0]}`);
      setTimeout(() => window.location.reload(), 500);
    } catch (error) {
      console.error("Login error:", error);

      if (error.response && error.response.status === 401) {
        try {
          const response = await fetch(`${API_BASE}/holidaze/profiles/${formData.email.split("@")[0]}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          });

          if (!response.ok) {
            setError("No account found. Please register first.");
          } else {
            setError("Incorrect password. Please try again.");
          }
        } catch (profileError) {
          setError("An error occurred while checking your account.");
        }
      } else {
        setError(error.message || "An error occurred during login.");
      }
    }
  };

  return (
    <div className="register-page-wrapper">
      <main className="register-page">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <p className="form-info">Fields marked with * are required.</p>
          
          {error && <p className="error-message">{error}</p>}

          <label>
            Email: *
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </label>
          <label>
            Password: *
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />
          </label>
          <Button type="submit" className="login-button">Login</Button>

        </form>

        <p className="register-suggestion">
          Don't have an account? <a href="/register">Register here</a>.
        </p>
      </main>
    </div>
  );
}

export default LoginPage;

