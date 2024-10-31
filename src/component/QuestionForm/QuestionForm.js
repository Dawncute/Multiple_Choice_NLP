import React from 'react';

const QuestionForm = ({
  text,
  handleTextChange,
  selectedQuestionType,
  handleQuestionType,
  selectedQuestionCount,
  handleQuestionCount,
  handleSubmit,
  sentenceCount
}) => {
  return (
    <form onSubmit={handleSubmit} className='textbox'>
      <textarea
        className='text-area'
        value={text}
        onChange={(e) => handleTextChange(e.target.value)}
        placeholder="Enter your text here"
      />
      <div className="question-option">
        <div className='question-type'>
          <label className='question-lable'>Question Type</label>
          <select value={selectedQuestionType} onChange={handleQuestionType} className='question-type-select'>
            <option value="MCQ">MCQ</option>
            <option value="Fill">Fill in the blank</option>
            <option value="T/F">True/ False</option>
          </select>
        </div>
        <div className='question-count'>
          <label className='question-lable'>Question Count</label>
          <select value={selectedQuestionCount} onChange={handleQuestionCount} className='question-type-select'>
            {Array.from({ length: sentenceCount }, (_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
        </div>
      </div>
      <button type="submit" className='submit-button'>Generate Questions</button>
    </form>
  );
};

export default QuestionForm;
