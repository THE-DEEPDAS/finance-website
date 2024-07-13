import React, { useState } from 'react';
import './styles.css';
import BudgetTrackerNew from './components/BudgetTrackerNew';

const App: React.FC = () => {
  return (
    <div className="App">
      <header>
        <h1>Budget App</h1>
      </header>
      <main>
        <BudgetTrackerNew />
      </main>
    </div>
  );
};

export default App;
