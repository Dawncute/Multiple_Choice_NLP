// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MCQGenerator from './component/Generation/MCQGenerator';
import './App.css';
import Home from './pages/Home/Home';
import Team from './pages/Team/Team';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/team" element={<Team/>} />
          <Route path="/mcqgenerator" element={<MCQGenerator />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
