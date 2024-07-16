import React, { useState, useEffect } from 'react';
import SignUp from './SignUp';
import Login from './Login';
import BalanceTracker from './BalanceTracker';

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('currentUser'));
    if (storedUser) {
      setCurrentUser(storedUser);
    }
  }, []);

  return (
    <div className="App">
      {!currentUser ? (
        <>
          <SignUp />
          <Login setCurrentUser={setCurrentUser} />
        </>
      ) : (
        <BalanceTracker currentUser={currentUser} setCurrentUser={setCurrentUser} />
      )}
    </div>
  );
}

export default App;
