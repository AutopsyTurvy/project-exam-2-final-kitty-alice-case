


// App.jsx -- Note-- doubling as landing page.



import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import RegisterPage from './pages/RegisterPage';
import myImage from './assets/sunrisebeach.jpg';
import './styles/landingheader.css';
import './styles/index.scss';

function LandingPage() {
  const navigate = useNavigate();


  const handleNavigateToRegister = () => {
    navigate('/register');
  };


  const handleNavigateToLogin = () => {
    navigate('/login'); 
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
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </Router>
  );
}

export default App;
