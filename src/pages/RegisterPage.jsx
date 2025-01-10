




// RegisterPage.jsx


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/register.css';



function RegisterPage() {
  const navigate = useNavigate(); 

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    bio: '',
    avatar: '',
    banner: '',
    venueManager: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const postData = {
      ...formData,
      avatar: { url: formData.avatar },
      banner: { url: formData.banner },
    };

    try {
      const response = await fetch('/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postData),
      });

      if (!response.ok) {
        throw new Error('Registration failed');
      }

      const data = await response.json();
      alert('Registration successful!');
      console.log(data);


      navigate(`/profile/${data.data.name}`);
    } catch (error) {
      alert(error.message);
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
        <label>
          Venue Manager:
          <input
            type="checkbox"
            name="venueManager"
            checked={formData.venueManager}
            onChange={(e) =>
              setFormData({ ...formData, venueManager: e.target.checked })
            }
          />
        </label>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default RegisterPage;
