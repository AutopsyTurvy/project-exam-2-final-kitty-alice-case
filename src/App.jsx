




// App.jsx -- Note- acting as landing page. 





import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Loader from "./components/Loader"; 
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import BookingsPage from "./pages/BookingsPage";
import Venues from "./pages/Venues";
import VenueDetails from "./pages/VenueDetails";
import YourVenues from "./pages/YourVenues";
import CreateVenuesPage from "./pages/CreateVenuePage";

// Parallax images:
import backgroundImage from "./assets/Parallax/background2.png";
import hillhouseImage from "./assets/Parallax/hillhouse.png";
import chimneysmokeImage from "./assets/Parallax/chimneysmoke.png";
import foregroundImage from "./assets/Parallax/foregroundblue.png";
import formerpurplehillsImage from "./assets/Parallax/yellowforehills.png";
import latterpurplehillsImage from "./assets/Parallax/bluehills.png";
import deserthillsImage from "./assets/Parallax/deserthillsred.png";

// Imported styles:
import "./styles/landingheader.css";
import "./styles/index.scss";
import "@fortawesome/fontawesome-free/css/all.min.css";

// Headers:
import RegisteredHeader from "./components/RegisteredHeader";
import UnregisteredHeader from "./components/UnregisteredHeader";

// Conditional check:
import { isUserLoggedIn, getUserProfile } from "./api/IsRegistered";

function LandingPage() {
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;

      document.documentElement.style.setProperty("--purple-hills-offset", `${scrollPosition * 0.2}px`); 
      document.documentElement.style.setProperty("--house-offset", `${scrollPosition * 0.3}px`); 
      document.documentElement.style.setProperty("--smoke-offset", `${scrollPosition * 0.4}px`); 
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="landing-container">
      <img src={backgroundImage} alt="Background" className="landing-image background-layer" />
      <img src={deserthillsImage} alt="Desert Hills" className="landing-image deserthills-layer" />
      <img src={latterpurplehillsImage} alt="Latter Purple Hills" className="landing-image latterpurplehills-layer" />
      <img src={formerpurplehillsImage} alt="Former Purple Hills" className="landing-image purplehills-layer" />
      <img src={hillhouseImage} alt="Hillhouse" className="landing-image hillhouse-layer" />
      <img src={chimneysmokeImage} alt="Chimney Smoke" className="landing-image chimneysmoke-layer" />
      <img src={foregroundImage} alt="Foreground" className="landing-image foreground-layer" />
      <div className="central-header">
        <h1>Where will we travel together?</h1>
      </div>
    </div>
  );
}

function App() {
  const [initialLoading, setInitialLoading] = useState(true); 
  const isLoggedIn = isUserLoggedIn();
  const userProfile = isLoggedIn ? getUserProfile() : null;

  useEffect(() => {
    setTimeout(() => setInitialLoading(false), 2000); 
  }, []);

  if (initialLoading) return <Loader />; 

  return (
    <Router>
      {isLoggedIn ? <RegisteredHeader username={userProfile.name} /> : <UnregisteredHeader />}

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/profile/:username" element={<ProfilePage />} />
        <Route path="/bookings" element={<BookingsPage />} />
        <Route path="/venues" element={<Venues />} />
        <Route path="/venue/:id" element={<VenueDetails />} />
        <Route path="/create-venue" element={<CreateVenuesPage />} />
        <Route path="/your-venues" element={<YourVenues />} />
      </Routes>
    </Router>
  );
}


export default App;





