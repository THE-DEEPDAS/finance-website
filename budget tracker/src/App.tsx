import React, { useState } from 'react';
import './styles.css';
import BudgetTrackerNew from './components/BudgetTrackerNew';

const App: React.FC = () => {
  return (
    <div className="App">
      <header>
      <nav className="navbar">
        <div className="logo">
            <a href="index.html"><img src="logo CapiFy.com\logo\dark theme\CapiFy-logo.png"/></a>
        </div>
        <ul className="nav-links">
            <li><a href="market/index.html">Markets</a></li>
            <li><a href="#">Economics</a></li>
            <li><a href="#">Industries</a></li>
            <li><a href="#">Tech</a></li>
            <li><a href="#">Businessweek</a></li>
            <li><a href="#">Opinion</a></li>
            <li><a href="#">More</a></li>
        </ul>
        <div className="nav-actions">
            <button className="sign-in">Sign In</button>
            <button className="subscribe">Subscribe</button>
            <div className="search-container">
                <input type="text" placeholder="Search..."/>
                <button className="search-btn">&#128269;</button>
            </div>
        </div>
    </nav>
      </header>
      <main>
        <BudgetTrackerNew />
      </main>
    </div>
  );
};

export default App;
