


// src/components/logout.js


// Need to see why local storage isn't being cleared.... again


export function logoutUser() {
  console.log("Executing logout...");
  localStorage.removeItem("Profile");
  localStorage.removeItem("accessToken");
  console.log("Local storage after removal:", JSON.stringify(localStorage));
  window.location.href = "/";
}

