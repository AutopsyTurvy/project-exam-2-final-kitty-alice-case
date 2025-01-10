

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
                 width: '100%',
                  height: 'auto',
                  overflow: 'hidden',
                  borderRadius: '10px'
              }} 
          />
      </div>
  );
}

export default App;
