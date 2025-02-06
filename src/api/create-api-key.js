



// src/api/create-api-key.js



export async function createApiKey() {
  const existingApiKey = localStorage.getItem("ApiKey");
  if (existingApiKey) {
    console.log("Using existing API key:", existingApiKey);
    return existingApiKey; 
  }

  const token = localStorage.getItem("Token");

  if (!token) {
    throw new Error("No access token found. Please log in first.");
  }

  try {
    console.log("Creating a new API key...");
    const response = await fetch("https://v2.api.noroff.dev/auth/create-api-key", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: "Holidaze API Key" }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error response from API:", errorData);
      throw new Error(errorData.message || "Failed to create API key");
    }

    const apiKeyData = await response.json();
    console.log("API Key Response Data:", apiKeyData); 

    if (!apiKeyData.data || !apiKeyData.data.key) {
      console.error("API Key generation failed. No key found in response.");
      throw new Error("API key not found in response.");
    }

    const apiKey = apiKeyData.data.key;
    console.log("API Key Generated:", apiKey);

    localStorage.setItem("ApiKey", apiKey);
    return apiKey;
  } catch (error) {
    console.error("Error creating API key:", error.message);
    throw error;
  }
}
