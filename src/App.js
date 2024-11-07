import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import QuizSelection from './components/QuizSelection';
import Quiz from './components/Quiz/Quiz';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<QuizSelection />} />
        <Route path="/quiz/:quizId" element={<Quiz />} />
      </Routes>
    </Router>
  );
};

export default App;
