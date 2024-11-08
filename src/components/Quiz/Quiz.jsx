import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import styles from './Quiz.module.scss';
import CloseButton from './../../img/Close-icon.svg';

const Quiz = () => {
  const { quizId } = useParams();
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  useEffect(() => {
    axios
      .get(
        `https://opentdb.com/api.php?amount=5&category=${quizId}&type=multiple&difficulty=easy`
      )
      .then((response) => {
        const fetchedQuestions = response.data.results.map((questionData) => ({
          question: questionData.question,
          options: [
            ...questionData.incorrect_answers,
            questionData.correct_answer,
          ].sort(() => Math.random() - 0.5),
          answer: questionData.correct_answer,
        }));
        setQuestions(fetchedQuestions);
      })
      .catch((error) => {
        console.error('Error fetching questions:', error);
      });
  }, [quizId]);

  const categories = [
    { id: 11, name: 'Films' },
    { id: 12, name: 'Music' },
    { id: 15, name: 'Video Games' },
    { id: 10, name: 'Books' },
  ];

  const currentCategory = categories.find(
    (category) => category.id === parseInt(quizId)
  );

  const decodeHtml = (html) => {
    const txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
  };

  const handleAnswer = (selectedOption) => {
    const correctAnswer = questions[currentQuestionIndex].answer;
    if (selectedOption === correctAnswer) {
      setScore(score + 1);
    }

    const nextQuestionIndex = currentQuestionIndex + 1;
    if (nextQuestionIndex < questions.length) {
      setCurrentQuestionIndex(nextQuestionIndex);
    } else {
      setShowScore(true);
    }
  };

  return (
    <div className="section-hero section-hero-quiz">
      {showScore ? (
        <div className={styles[`result-card`]}>
          <h2>
            Your score:{' '}
            <span className={styles['result-card-score']}>{score}</span> out of{' '}
            <span className={styles['result-card-total']}>
              {questions.length}
            </span>
          </h2>
          <div className={styles[`result-card-buttons`]}>
            <a href={`/quiz-app`}>
              <button
                className={`${styles['result-card-button']} ${
                  styles[`result-card-button-back`]
                }`}
              >
                Back to the categories
              </button>
            </a>
            <a href={`/quiz-app/quiz/${quizId}`}>
              <button className={styles[`result-card-button`]}>
                Try again
              </button>
            </a>
          </div>
        </div>
      ) : (
        questions.length > 0 && (
          <div className={styles[`question-card`]}>
            <div className={styles[`card-top`]}>
              {currentCategory && (
                <div>
                  <h2 className={styles[`card-title`]}>
                    {currentCategory.name}
                  </h2>
                  <a className={styles[`card-button-close`]} href={`/quiz-app`}>
                    <img src={CloseButton} alt="Close" />
                  </a>
                </div>
              )}
            </div>

            <div className={styles[`card-questions-section`]}>
              <h3>{decodeHtml(questions[currentQuestionIndex].question)}</h3>
              <div className={styles[`card-questions-list`]}>
                {questions[currentQuestionIndex].options.map(
                  (option, index) => (
                    <button key={index} onClick={() => handleAnswer(option)}>
                      {decodeHtml(option)}
                    </button>
                  )
                )}
              </div>
            </div>

            <div className={styles[`question-card__bottom`]}>
              <div className={styles[`question-card__bottom-1`]}></div>
              <div className={styles[`question-card__bottom-2`]}></div>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default Quiz;
