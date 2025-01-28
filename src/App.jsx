




// App.jsx -- Note- acting as landing page. 



import React from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import BookingsPage from "./pages/BookingsPage";
import Venues from "./pages/Venues";
import VenueDetails from "./pages/VenueDetails";
import backgroundImage from "./assets/Parallax/background.png"; 
import hillhouseImage from "./assets/Parallax/hillhouse.png"; 
import chimneysmokeImage from "./assets/Parallax/chimneysmoke.png"; 
import foregroundImage from "./assets/Parallax/foreground.png"; 
import formerpurplehillsImage from "./assets/Parallax/formerpurplehills.png"; 
import latterpurplehillsImage from "./assets/Parallax/latterpurplehills.png"; 
import "./styles/landingheader.css";
import "./styles/index.scss";
import "@fortawesome/fontawesome-free/css/all.min.css";

// Imports both of the headers:
import RegisteredHeader from "./components/RegisteredHeader";
import UnregisteredHeader from "./components/UnregisteredHeader";

// Imports the conditional header functions:
import { isUserLoggedIn, getUserProfile } from "./api/IsRegistered";

function LandingPage() {
  const navigate = useNavigate();

  const handleNavigateToRegister = () => {
    navigate("/register");
  };

  const handleNavigateToLogin = () => {
    navigate("/login");
  };

  const handleNavigateToVenues = () => {
    navigate("/venues");
  };

  return (
    <div>
      <div className="landing-container">
        {/* Background layer */}
        <img src={backgroundImage} alt="Background" className="landing-image background-layer" />

        {/* Latter Purple Hills layer */}
        <img src={latterpurplehillsImage} alt="Latter Purple Hills" className="landing-image latterpurplehills-layer" />

        {/* Former Purple Hills layer */}
        <img src={formerpurplehillsImage} alt="Former Purple Hills" className="landing-image purplehills-layer" />

        {/* Hillhouse layer */}
        <img src={hillhouseImage} alt="Hillhouse" className="landing-image hillhouse-layer" />

        {/* Chimney smoke layer */}
        <img src={chimneysmokeImage} alt="Chimney Smoke" className="landing-image chimneysmoke-layer" />

        {/* Foreground layer */}
        <img src={foregroundImage} alt="Foreground" className="landing-image foreground-layer" />

        {/* Central header */}
        <div className="central-header">
          <h1>Where will we travel together?</h1>
        </div>
      </div>
    </div>
  );
}

function App() {
  const isLoggedIn = isUserLoggedIn();
  const userProfile = isLoggedIn ? getUserProfile() : null;

  return (
    <Router>
      {/* Renders the Conditional Header */}
      {isLoggedIn ? (
        <RegisteredHeader username={userProfile.name} />
      ) : (
        <UnregisteredHeader />
      )}

      {/* All of our Main Routes */}
      <Routes>
        <Route path="/" element={<LandingPage />} /> {/* --Landing Page */}
        <Route path="/login" element={<LoginPage />} /> {/* --Login Page */}
        <Route path="/register" element={<RegisterPage />} /> {/* --Registration Page */}
        <Route path="/profile/:username" element={<ProfilePage />} /> {/* --Profile Page */}
        <Route path="/bookings" element={<BookingsPage />} /> {/* --Bookings Page */}
        <Route path="/venues" element={<Venues />} /> {/* --Venues Page */}
        <Route path="/venue/:id" element={<VenueDetails />} /> {/* --To see the venue details */}
      </Routes>
    </Router>
  );
}

export default App;




