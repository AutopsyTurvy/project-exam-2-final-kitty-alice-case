




// src/api/bookings.js



import { createApiKey } from "./create-api-key"; 

export async function fetchAllBookings() {
  const token = localStorage.getItem("Token");

  if (!token) {
    throw new Error("No access token found. Please log in first.");
  }

  let apiKey = localStorage.getItem("ApiKey");

  if (!apiKey) {
    console.log("No API key found. Attempting to create one...");
    apiKey = await createApiKey(); 
  }

  try {
    const response = await fetch("https://v2.api.noroff.dev/holidaze/bookings", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "X-Noroff-API-Key": apiKey,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error fetching bookings:", errorData);
      throw new Error(errorData.message || "Failed to fetch bookings");
    }

    const bookingsData = await response.json();
    console.log("Bookings fetched successfully:", bookingsData);

    return bookingsData;
  } catch (error) {
    console.error("Error in fetchAllBookings:", error.message);
    throw error;
  }
}

  
  