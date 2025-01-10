import React from 'react';
import { useNavigate } from 'react-router-dom';

function LandingPage() {
  const navigate = useNavigate();

  const goToRegister = () => {
    navigate('/register'); 
  };

  return (
    <div>
      <h1>Welcome to Holidaze</h1>
      <button onClick={goToRegister}>Register</button>
    </div>
  );
}

export default LandingPage;
