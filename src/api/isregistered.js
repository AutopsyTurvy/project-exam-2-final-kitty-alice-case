

// src/api/IsRegistered.js


export const isUserLoggedIn = () => {
    const profile = localStorage.getItem("Profile");
    const token = localStorage.getItem("Token");
  
    return profile && token; 
  };
  
  export const getUserProfile = () => {
    const profile = localStorage.getItem("Profile");
    return profile ? JSON.parse(profile) : null; 
  };
  