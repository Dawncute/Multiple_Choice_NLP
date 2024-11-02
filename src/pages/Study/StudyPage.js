import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './StudyPage.css';

const StudyPage = () => {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const location = useLocation();
  const { questions } = location.state || { questions: [] };

  const handleAnswerSelect = (questionIndex, answerIndex) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionIndex]: answerIndex,
    }));
  };

  const handleSubmit = () => {
    setShowResults(true);
  };

  const handleRestart = () => {
    setSelectedAnswers({});
    setShowResults(false);
  };

  const calculateScore = () => {
    return questions.reduce((score, question, index) => {
      return selectedAnswers[index] === question.correctAnswerIndex ? score + 1 : score;
    }, 0);
  };

  return (
    <div className="study-page">
      <h2>Practice Cards</h2>
      {questions.map((question, index) => (
        <div key={index} className="question-study">
          <p>Question {index + 1}. {question.questionText}</p>
          <div className="answers-study">
            {question.allAnswers.map((answer, answerIndex) => {
              const isSelected = selectedAnswers[index] === answerIndex;
              const isCorrect = showResults && answerIndex === question.correctAnswerIndex;
              const isIncorrect =
                showResults && isSelected && answerIndex !== question.correctAnswerIndex;

              return (
                <button
                  key={answerIndex}
                  className={`answer-button-study 
                    ${isSelected ? 'selected' : ''} 
                    ${isCorrect ? 'correct' : ''} 
                    ${isIncorrect ? 'incorrect' : ''}`}
                  onClick={() => handleAnswerSelect(index, answerIndex)}
                  disabled={showResults}
                >
                  {answer}
                </button>
              );
            })}
          </div>
        </div>
      ))}
      {!showResults ? (
        <button className="submit-button" onClick={handleSubmit}>
          Submit
        </button>
      ) : (
        <div>
          <p>
            You answered {calculateScore()} out of {questions.length} correctly!
          </p>
          <button className="restart-button" onClick={handleRestart}>
            Restart
          </button>
        </div>
      )}
    </div>
  );
};

export default StudyPage;
