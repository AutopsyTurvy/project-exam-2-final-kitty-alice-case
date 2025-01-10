


// src/api/auth.js


export const API_BASE = "https://v2.api.noroff.dev"; 

export async function registerUser({ name, email, password, bio, avatar, banner, venueManager }) {
  const payload = {
    name,
    email,
    password,
    bio,
    venueManager,
  };

  if (avatar) {
    payload.avatar = avatar; 
  }

  if (banner) {
    payload.banner = banner; 
  }

  const response = await fetch(`${API_BASE}/auth/register`, { 
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Registration failed");
  }

  return await response.json();
}

