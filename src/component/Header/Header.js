// src/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header-left">
        <h1>QuestgenAI</h1>
      </div>
      <div className="header-right">
        <nav>
          <Link to="/"><a href="#home">Home</a></Link>
          <Link to="/team"><a href="#team">Team</a></Link>
          <a href="#contact">Contact</a>
          <a href="#product">Product</a>
        </nav>
        <Link to="/mcqgenerator" className="start-button">
          Start for free
        </Link>
      </div>
    </header>
  );
};

export default Header;
