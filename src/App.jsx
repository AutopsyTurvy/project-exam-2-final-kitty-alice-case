import React from 'react';

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
            <h1>Testing landing page</h1>
            <p>Test test test test</p>
            <button 
                style={{ 
                    padding: '10px 20px', 
                    fontSize: '16px', 
                    cursor: 'pointer', 
                    border: 'none', 
                    borderRadius: '5px', 
                    backgroundColor: '#007bff', 
                    color: '#fff' 
                }}
                onClick={() => alert('Button Clicked!')}
            >
                Get Started
            </button>
        </div>
    );
}

export default App;
