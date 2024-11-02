// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MCQGenerator from './component/Generation/MCQGenerator';
import './App.css';
import Home from './pages/Home/Home';
import Team from './pages/Team/Team';
import StudyPage from './pages/Study/StudyPage'

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/team" element={<Team/>} />
          <Route path="/mcqgenerator" element={<MCQGenerator />} />
          <Route path="/study" element={<StudyPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
