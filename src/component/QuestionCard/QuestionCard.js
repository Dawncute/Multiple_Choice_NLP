import React from 'react';
import './QuestionCard.css';

const QuestionCard = ({ question, index, showResult, isEditing, onQuestionEdit, onAnswerEdit }) => {
  return (
    <div className="question-card">
      {isEditing ? (
          <input
            className='question-input'
            type="text"
            value={question.questionText}
            onChange={(e) => onQuestionEdit(e.target.value)}
          />
      ) : (
          <h3>Question {index + 1}. {question.questionText}</h3>
      )}
      <div className="answer-options">
        {question.allAnswers.map((answer, answerIndex) => (
          <div
            key={answerIndex}
            className={`answer-option ${
              (showResult || isEditing) && answer === question.correctAnswer ? 'correct-answer' : ''
            }`}
          >
            <span>{String.fromCharCode(65 + answerIndex)}.</span>
            {isEditing ? (
              <input
                className={`answer-input ${answer === question.correctAnswer ? 'correct-answer-input' : ''}`}
                type="text"
                value={answer}
                onChange={(e) => onAnswerEdit(answerIndex, e.target.value)}
                style={{ marginLeft: '5px' }}
              />
            ) : (
              <span style={{ marginLeft: '5px' }}>
                {answer}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;
