import React from 'react';
import './Result.css'; 

const Result = ({ score }) => {
  return (
    <div className="result-page">
      <h1>Quiz Completed</h1>
      <p className="result-score">Your Score: {score}</p>
      <p className="result-details">Great job! Based on your score, here are some insights...</p>
      <button className="restart-button" onClick={() => window.location.reload()}>Restart Quiz</button>
    </div>
  );
};

export default Result;
