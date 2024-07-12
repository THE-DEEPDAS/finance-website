import React, { useState } from 'react';
import './styles.css';
import BudgetTracker from './components/BudgetTracker';

const App: React.FC = () => {
  return (
    <div className="App">
      <header>
        <h1>Budget App</h1>
      </header>
      <main>
        <BudgetTracker />
      </main>
    </div>
  );
};

export default App;
