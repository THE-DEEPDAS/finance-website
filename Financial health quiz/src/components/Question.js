import React from 'react';
import './Question.css'; 

const Question = ({
  question,
  options,
  type,
  inputType,
  onAnswer,
  onInputChange,
  userInput,
  onInputSubmit,
  inputSubmitted
}) => {
  return (
    <div className="question-container">
      <h2>{question}</h2>
      {type === 'input' ? (
        <div className="input-container">
          <input
            type={inputType}
            value={userInput}
            onChange={onInputChange}
            className="question-input"
            placeholder="Enter your answer"
          />
          <button
            className="submit-button"
            onClick={onInputSubmit}
            disabled={inputSubmitted}
          >
            Submit
          </button>
        </div>
      ) : (
        options.map((option, index) => (
          <button
            key={index}
            className="question-button"
            onClick={() => onAnswer(option)}
          >
            {option}
          </button>
        ))
      )}
    </div>
  );
};

export default Question;
