import React, { useState, useEffect } from 'react';
import SignUp from './SignUp';
import Login from './Login';
import BalanceTracker from './BalanceTracker';
import './main.css';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('currentUser'));
    if (storedUser) {
      setCurrentUser(storedUser);
    }
  }, []);

  return (
    <div className="App">
      {!currentUser ? (
        <div className="auth-container">
          {showLogin ? (
            <>
              <Login setCurrentUser={setCurrentUser} />
              <p>
                New user? <span className="toggle-link" onClick={() => setShowLogin(false)}>Sign up here</span>
              </p>
            </>
          ) : (
            <>
              <SignUp />
              <p>
                Already have an account? <span className="toggle-link" onClick={() => setShowLogin(true)}>Login here</span>
              </p>
            </>
          )}
        </div>
      ) : (
        <BalanceTracker currentUser={currentUser} setCurrentUser={setCurrentUser} />
      )}
    </div>
  );
}

export default App;
