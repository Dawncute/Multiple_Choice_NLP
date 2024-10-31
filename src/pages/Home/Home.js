import React from 'react'
import Header from '../../component/Header/Header'
import { Link } from 'react-router-dom';
import './Home.css'

const Home = () => {
  return (
    <div className='home'>
        <Header/>
        <div className="home-content">
            <div className="left-side">
                <p className='title1'>Generate <span className="blue-text">quizzes</span> from any text in one click using AI.</p>
                <p className='title2'>For <span className="blue-text">Learners</span></p>
                <div className="title3">
                    <p>To generate assessments at scale.</p>
                    <p>Supports high-volume quiz generation of up to 150 quizzes from 100,000 words in 1-click!</p>
                </div>
                <Link to="/mcqgenerator" className="start-button">
                    Start for free
                </Link>
            </div>
            <div className="right-side">
                <img src="/image/home-image.png" alt="" />
            </div>
        </div>
    </div>
  )
}

export default Home
