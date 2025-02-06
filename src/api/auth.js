
export const API_BASE = "https://v2.api.noroff.dev";

export async function registerUser({ name, email, password, bio, avatar, banner, venueManager }) {
    const payload = { name, email, password };

    if (bio) payload.bio = bio;
    if (venueManager) payload.venueManager = venueManager;
    if (avatar) payload.avatar = { url: avatar, alt: "User avatar" };
    if (banner) payload.banner = { url: banner, alt: "User banner" };

    console.log("Payload being sent:", payload);

    const response = await fetch(`${API_BASE}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });

    if (!response.ok) {
        const error = await response.json();
        console.error("Registration failed:", error);
        throw new Error(error.message || "Registration failed");
    }

    const userData = await response.json();
    localStorage.setItem("Token", userData.data.accessToken);
    localStorage.setItem("Profile", JSON.stringify(userData.data));

    console.log("Registered successfully. Now generating API Key...");


    await new Promise((resolve) => setTimeout(resolve, 1000));

    try {
        const apiKeyResponse = await fetch(`${API_BASE}/auth/create-api-key`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${userData.data.accessToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name: "Holidaze API Key" }),
        });

        if (!apiKeyResponse.ok) {
            throw new Error("API Key generation failed");
        }

        const apiKeyData = await apiKeyResponse.json();
        localStorage.setItem("ApiKey", apiKeyData.data.key);
        console.log("API Key generated and stored:", apiKeyData.data.key);
    } catch (error) {
        console.error("Failed to generate API Key during registration:", error);
        throw new Error("API Key generation failed after registration.");
    }

    return userData;
}

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
    localStorage.setItem("Token", userData.data.accessToken);
    localStorage.setItem("Profile", JSON.stringify(userData.data));

    console.log("Logged in successfully. Now generating API Key...");

   
    await new Promise((resolve) => setTimeout(resolve, 1000));

    try {
        const apiKeyResponse = await fetch(`${API_BASE}/auth/create-api-key`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${userData.data.accessToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name: "Holidaze API Key" }),
        });

        if (!apiKeyResponse.ok) {
            throw new Error("API Key generation failed");
        }

        const apiKeyData = await apiKeyResponse.json();
        localStorage.setItem("ApiKey", apiKeyData.data.key);
        console.log("API Key generated and stored:", apiKeyData.data.key);
    } catch (error) {
        console.error("Failed to generate API Key during login:", error);
        throw new Error("API Key generation failed after login.");
    }
}

