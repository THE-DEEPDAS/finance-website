import React, { useState } from 'react';
import Quiz from './components/Quiz';
import Result from './components/Result';
import './App.css'; 

const App = () => {
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizComplete, setQuizComplete] = useState(false);
  const [score, setScore] = useState(0);

  const startQuiz = () => {
    setQuizStarted(true);
  };

  const handleQuizCompletion = (score) => {
    setScore(score);
    setQuizComplete(true);
  };

  const resetQuiz = () => {
    setQuizStarted(false);
    setQuizComplete(false);
    setScore(0);
  };

  return (
    <div className="App">
      {!quizStarted ? (
        <div className="start-container">
          <h1>Welcome to the Financial Health Quiz</h1>
          <button className="start-button" onClick={startQuiz}>
            Start Quiz
          </button>
        </div>
      ) : !quizComplete ? (
        <Quiz onComplete={handleQuizCompletion} />
      ) : (
        <Result score={score} onRetry={resetQuiz} />
      )}
    </div>
  );
};

export default App;
