import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MCQGenerator.css';
import FileUploader from '../FileUpload/FileUploader';
import QuestionForm from '../QuestionForm/QuestionForm';
import QuestionCard from '../QuestionCard/QuestionCard';
import ExportButton from '../ExportButton/ExportButton';
import { exportToPDF } from '../../utils/pdfUtils';
import { shuffleArray, countSentences } from '../../utils/questionUtils';

const MCQGenerator = () => {
  const [text, setText] = useState('');
  const [questions, setQuestions] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedQuestionType, setSelectedQuestionType] = useState('');
  const [selectedQuestionCount, setSelectedQuestionCount] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Chỉ tải dữ liệu từ sessionStorage khi load trang
  useEffect(() => {
    const savedState = sessionStorage.getItem("mcqGeneratorState");
    if (savedState) {
      const parsedState = JSON.parse(savedState);
      setText(parsedState.text || '');
      setQuestions(parsedState.questions || []);
      setSelectedFile(parsedState.selectedFile || null);
      setSelectedQuestionType(parsedState.selectedQuestionType || '');
      setSelectedQuestionCount(parsedState.selectedQuestionCount || '');
      setShowResult(parsedState.showResult || false);
      setIsEditing(parsedState.isEditing || false);
    }
  }, []);

  const handleQuestionEdit = (index, newQuestionText) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index] = { ...updatedQuestions[index], questionText: newQuestionText };
    setQuestions(updatedQuestions);
  };

  const handleAnswerEdit = (questionIndex, answerIndex, newAnswer) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].allAnswers[answerIndex] = newAnswer;
    if (updatedQuestions[questionIndex].correctAnswerIndex === answerIndex) {
      updatedQuestions[questionIndex].correctAnswer = newAnswer;
    }
    setQuestions(updatedQuestions);
  };

  const handleEditToggle = () => {
    if (isEditing) {
      setQuestions([...questions]);
    }
    setIsEditing(!isEditing);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text || text.trim() === "") {
      console.error("Text input is empty. Please enter some text.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post('http://localhost:9002/generate', {
        text: text,
        count: selectedQuestionCount,
      });

      const formattedQuestions = response.data.map((question) => {
        const allAnswers = shuffleArray([question.correctAnswer, ...question.distractors]);
        const correctAnswerIndex = allAnswers.indexOf(question.correctAnswer);
        return { ...question, allAnswers, correctAnswerIndex };
      });

      setQuestions(formattedQuestions);
    } catch (error) {
      console.error('Error fetching questions:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStudy = () => {
    if (questions.length > 0) {
      sessionStorage.setItem('questionsForStudy', JSON.stringify(questions));
      const studyWindow = window.open('/study', '_blank');
      studyWindow.location.href = `/study?questions=${encodeURIComponent(JSON.stringify(questions))}`;
    } else {
      alert("No questions available for study!");
    }
  };

  // Lưu trạng thái vào sessionStorage khi thay đổi dữ liệu
  useEffect(() => {
    const stateToSave = {
      text,
      questions,
      selectedFile,
      selectedQuestionType,
      selectedQuestionCount,
      showResult,
      isEditing,
    };
    sessionStorage.setItem("mcqGeneratorState", JSON.stringify(stateToSave));
  }, [text, questions, selectedFile, selectedQuestionType, selectedQuestionCount, showResult, isEditing]);

  return (
    <div className="generate">
      <h1>Generate different quizzes like MCQs using AI</h1>
      <div className="generate-content">
        <div className="left-generate">
          <FileUploader setSelectedFile={setSelectedFile} setText={setText} />
          {selectedFile && <p>Selected file: {selectedFile}</p>}
          <QuestionForm
            text={text}
            handleTextChange={setText}
            selectedQuestionType={selectedQuestionType}
            handleQuestionType={(e) => setSelectedQuestionType(e.target.value)}
            selectedQuestionCount={selectedQuestionCount}
            handleQuestionCount={(e) => setSelectedQuestionCount(e.target.value)}
            handleSubmit={handleSubmit}
            sentenceCount={countSentences(text)}
          />
        </div>
        <div className="right-generate">
          <div className="button-list">
            <button onClick={() => setShowResult(!showResult)} className="show-result-button">
              {showResult ? "Hide Result" : "Show Result"}
            </button>
            <div className="button-custom">
              <button className="study" onClick={handleStudy}>
                <i className="fas fa-book"></i> STUDY
              </button>
              <button className="edit" onClick={handleEditToggle}>
                <i className={`fas fa-${isEditing ? 'save' : 'edit'}`}></i> {isEditing ? "SAVE" : "EDIT"}
              </button>
              <ExportButton questions={questions} exportToPDF={exportToPDF} />
            </div>
          </div>
          <div>
            {isLoading ? (
              <div className="loading-spinner">
                <p>Loading</p>
              </div>
            ) : (
              questions.length > 0 &&
              questions.map((question, index) => (
                <QuestionCard
                  key={index}
                  question={question}
                  index={index}
                  showResult={showResult}
                  isEditing={isEditing}
                  onQuestionEdit={(newText) => handleQuestionEdit(index, newText)}
                  onAnswerEdit={(answerIndex, newAnswer) => handleAnswerEdit(index, answerIndex, newAnswer)}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MCQGenerator;
