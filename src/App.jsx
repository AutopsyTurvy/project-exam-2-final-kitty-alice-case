

// Note-- doubling as landing page.




import React from 'react';
import myImage from './assets/desertcar.jpg'; 

function App() {
  return (
      <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          backgroundColor: '#f0f4f8'
      }}>
          <img 
              src={myImage} 
              alt="Landing" 
              style={{
                  maxWidth: '80%',
                  height: 'auto',
                  borderRadius: '10px',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'
              }} 
          />
      </div>
  );
}

export default App;
