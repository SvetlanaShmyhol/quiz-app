import React from 'react';
import logo from '../img/Quizzle-logo.svg';
import '../index.scss';
import HeroTitle from './HeroTitle';
import QuizCard from './QuizCard/QuizCard';

const QuizSelection = () => {
  return (
    <div className="section-hero">
      <div className="hero-logo">
        <img className="logo" src={logo} alt="Quiz Logo" />
      </div>
      <div className="text-content">
        <HeroTitle />
        <p className="hero-description">
          By presenting questions in a structured format, quizzes not only
          reinforce what you already know but also inspire curiosity and further
          exploration into subjects that pique your interest.
        </p>
      </div>
      <div className="quiz-categories">
        <QuizCard />
      </div>
    </div>
  );
};

export default QuizSelection;
