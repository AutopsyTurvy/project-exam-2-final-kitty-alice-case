


// src/api/auth.js


export const API_BASE = "https://v2.api.noroff.dev";

import { createApiKey } from "./create-api-key";


export async function loginUser(formData) {
    const response = await fetch(`${API_BASE}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
    });

    if (!response.ok) {
        throw new Error("Login failed");
    }

    const userData = await response.json();
    const token = userData.data.accessToken;


    localStorage.setItem("Token", token);

    console.log("Logging in and generating new API Key...");
    await createApiKey();

    try {
        
        const profileResponse = await fetch(`${API_BASE}/holidaze/profiles/${userData.data.name}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "X-Noroff-API-Key": localStorage.getItem("ApiKey"),
                "Content-Type": "application/json",
            },
        });

        if (!profileResponse.ok) {
            throw new Error("Failed to fetch profile data.");
        }

        const profileData = await profileResponse.json();

        
        localStorage.setItem("Profile", JSON.stringify(profileData.data));

        console.log("Profile successfully updated in local storage!", profileData.data);
    } catch (error) {
        console.error("Failed to fetch updated profile:", error);
    }

    setTimeout(() => window.location.reload(), 500);
}


export async function registerUser(formData) {
    const payload = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
    };

    if (formData.bio) payload.bio = formData.bio;
    if (formData.venueManager) payload.venueManager = formData.venueManager; 
    if (formData.avatar) payload.avatar = { url: formData.avatar, alt: "User avatar" };
    if (formData.banner) payload.banner = { url: formData.banner, alt: "User banner" };

    console.log("Sending registration payload:", payload);

    try {
        const response = await fetch(`${API_BASE}/auth/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });

        const data = await response.json();

        if (!response.ok) {
            console.error("Registration failed:", data);
            throw new Error(data.errors?.[0]?.message || "Registration failed");
        }

        return data;
    } catch (error) {
        console.error("Registration request failed:", error);
        throw error;
    }
}
