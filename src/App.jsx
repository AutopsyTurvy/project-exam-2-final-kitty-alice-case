





// App.jsx -- Note- acting as landing page. 

import React from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import BookingsPage from "./pages/BookingsPage";
import UnregisteredVenues from "./pages/UnregisteredVenues";
import myImage from "./assets/sunrisebeach.jpg";
import "./styles/landingheader.css";
import "./styles/index.scss";
import VenueDetails from './pages/VenueDetails'; 
import '@fortawesome/fontawesome-free/css/all.min.css';


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
      {/* Header */}
      <header className="landing-header">
        <div className="header-title">Holidaze</div>
        <div className="header-buttons">
          <button className="header-button" onClick={handleNavigateToRegister}>
            Register
          </button>
          <button className="header-button" onClick={handleNavigateToLogin}>
            Login
          </button>
          <button className="header-button" onClick={handleNavigateToVenues}>
            View All Venues
          </button>
        </div>
      </header>

      {/* Landing Page Content */}
      <div className="landing-container">
        <img src={myImage} alt="Landing" className="landing-image" />
        <div className="central-header">
          <h1>Where will we travel together?</h1>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} /> {/* --Landing Page */}
        <Route path="/login" element={<LoginPage />} /> {/* --Login Page */}
        <Route path="/register" element={<RegisterPage />} /> {/* --Registration Page */}
        <Route path="/profile/:username" element={<ProfilePage />} /> {/* --Profile Page */}
        <Route path="/bookings" element={<BookingsPage />} /> {/* --Bookings Page */}
        <Route path="/venues" element={<UnregisteredVenues />} /> {/* --Venues Page */}
        <Route path="/venue/:id" element={<VenueDetails />} /> {/* --To see the venue details */}
      </Routes>
    </Router>
  );
}

export default App;

