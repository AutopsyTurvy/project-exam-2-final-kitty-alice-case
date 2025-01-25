


// src/components/logout.js


export function logoutUser() {
  console.log("Executing logout...");
  localStorage.removeItem("Profile");
  localStorage.removeItem("Token");
  localStorage.removeItem("ApiKey");
  console.log("Local storage after removal:", JSON.stringify(localStorage));
  window.location.href = "/";
}

