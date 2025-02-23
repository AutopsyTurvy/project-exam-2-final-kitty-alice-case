






// src/pages/registerpage.jsx


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser, loginUser } from "../api/auth";
import "../styles/register.css";
import Button from "../components/buttons/button";




function RegisterPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    bio: "",
    avatar: "",
    banner: "",
  });

  const [errors, setErrors] = useState({});
  const [showInfo, setShowInfo] = useState({});

  const validateField = (name, value) => {
    let message = "";
    
    switch (name) {
      case "name":
        if (!/^\w+$/.test(value)) {
          message = "Name can only contain letters, numbers, and underscores ( _ ).";
        }
        break;
  
      case "email":
        if (!/.+@stud\.noroff\.no$/.test(value)) {
          message = "Email must be in the format: example@stud.noroff.no.";
        }
        break;
  
      case "password":
        if (value.length < 8) {
          message = "Password must be at least 8 characters long.";
        }
        break;
  
      case "bio":
        if (value.length > 160) {
          message = "Bio must be less than 160 characters.";
        }
        break;
  
      case "avatar":
      case "banner":
        if (value && !/^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|svg|webp))$/i.test(value)) {
          message = "Must be a valid image URL ending in .png, .jpg, .jpeg, .gif, .svg, or .webp.";
        }
        break;
  
      case "avatarAlt":
      case "bannerAlt":
        if (value.length > 120) {
          message = "Alt text must be less than 120 characters.";
        }
        break;
  
      default:
        break;
    }
  
    setErrors((prevErrors) => ({ ...prevErrors, [name]: message }));
  };
  





  const handleFocus = (name) => {
    setShowInfo((prev) => ({ ...prev, [name]: true }));
  };

  const handleBlur = (name) => {
    setShowInfo((prev) => ({ ...prev, [name]: false }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    validateField(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    try {
        const userData = await registerUser(formData);
        console.log("Registration successful:", userData);
        await loginUser({ email: formData.email, password: formData.password });
        alert("Registration successful!");
        navigate(`/profile/${userData.data.name}`);
        setTimeout(() => window.location.reload(), 500);
    } catch (error) {
        console.error("Registration error:", error);
        setErrors((prevErrors) => ({ ...prevErrors, form: error.message || "An error occurred." }));
    }
  };

  return (
    <div className="register-page-wrapper">
      <main className="register-page">
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <p className="form-info">Fields marked with * are required.</p>
          {Object.values(errors).map((msg, idx) => msg && <p key={idx} className="error-message">{msg}</p>)}
          <label>
            Name: *
            <input type="text" name="name" value={formData.name} onChange={handleChange} onFocus={() => handleFocus("name")} onBlur={() => handleBlur("name")} required />
            {errors.name && <p className="error-message">{errors.name}</p>}
          </label>
          <label>
            Email: *
            <input type="email" name="email" value={formData.email} onChange={handleChange} onFocus={() => handleFocus("email")} onBlur={() => handleBlur("email")} required />
            {errors.email && <p className="error-message">{errors.email}</p>}
          </label>
          <label>
            Password: *
            <input type="password" name="password" value={formData.password} onChange={handleChange} onFocus={() => handleFocus("password")} onBlur={() => handleBlur("password")} required />
            {errors.password && <p className="error-message">{errors.password}</p>}
          </label>
          <label>
            Bio (optional):
            <textarea name="bio" value={formData.bio} onChange={handleChange} onFocus={() => handleFocus("bio")} onBlur={() => handleBlur("bio")} maxLength="160" />
            {errors.bio && <p className="error-message">{errors.bio}</p>}
          </label>
          <label>
            Avatar URL (optional):
            <input type="url" name="avatar" value={formData.avatar} onChange={handleChange} onFocus={() => handleFocus("avatar")} onBlur={() => handleBlur("avatar")} />
            {errors.avatar && <p className="error-message">{errors.avatar}</p>}
          </label>
          <label>
            Banner URL (optional):
            <input type="url" name="banner" value={formData.banner} onChange={handleChange} onFocus={() => handleFocus("banner")} onBlur={() => handleBlur("banner")} />
            {errors.banner && <p className="error-message">{errors.banner}</p>}
          </label>
          
          <Button type="submit" className="register-button" >Register</Button>

        </form>
      </main>
    </div>
  );
}

export default RegisterPage;