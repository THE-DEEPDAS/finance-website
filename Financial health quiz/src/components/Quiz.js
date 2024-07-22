import React, { useState, useEffect } from 'react';
import Question from './Question';
import './Quiz.css';

const questions = [
  {
    type: 'yesno',
    question: 'Do you have an emergency fund that can cover at least 3 months of expenses?',
    options: ['Yes', 'No'],
    answer: 'Yes',
  },
  {
    type: 'yesno',
    question: 'Do you save at least 20% of your income each month?',
    options: ['Yes', 'No'],
    answer: 'Yes',
  },
  {
    type: 'mcq',
    question: 'Which of the following is a good practice for financial health?',
    options: ['Investing in stocks', 'Spending beyond your means', 'Ignoring retirement planning', 'None of the above'],
    answer: 'Investing in stocks',
  },
  {
    type: 'mcq',
    question: 'What should you prioritize first in financial planning?',
    options: ['Paying off debt', 'Saving for vacation', 'Buying luxury items', 'Upgrading your car'],
    answer: 'Paying off debt',
  },
  {
    type: 'input',
    question: 'What is your current monthly savings amount?',
    options: [],
    answer: '',
    inputType: 'number',
  },
];

const Quiz = ({ onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [inputSubmitted, setInputSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500); 

    return () => clearTimeout(timer);
  }, []);

  const handleAnswer = (selectedOption) => {
    if (questions[currentQuestion].type !== 'input') {
      if (selectedOption === questions[currentQuestion].answer) {
        setScore(score + 1);
      }
    }
    setCurrentQuestion(currentQuestion + 1);
    setInputSubmitted(false);
  };

  const handleInputChange = (event) => {
    setUserInput(event.target.value);
  };

  const handleInputSubmit = () => {
    if (parseInt(userInput, 10) > 1000000) {
      setCurrentQuestion(currentQuestion + 1);
      setInputSubmitted(true);
    }
  };

  if (currentQuestion >= questions.length) {
    onComplete(score);
    return null;
  }

  const { question, options, type, inputType } = questions[currentQuestion] || {};

  return (
    <div className="quiz-container">
      {loading ? (
        <div className="loader">
          <img src="/assets/loader.webp" alt="Loading..." />
        </div>
      ) : (
        <div className="question-container">
          {question && (
            <Question
              question={question}
              options={options}
              type={type}
              inputType={inputType}
              onAnswer={handleAnswer}
              onInputChange={handleInputChange}
              userInput={userInput}
              onInputSubmit={handleInputSubmit}
              inputSubmitted={inputSubmitted}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Quiz;
