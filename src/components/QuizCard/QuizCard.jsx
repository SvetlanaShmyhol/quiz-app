import React from 'react';
import { Link } from 'react-router-dom';
import Quiz from '../Quiz/Quiz';
import styles from './QuizCard.module.scss';

const QuizCard = () => {
  const categories = [
    { id: 11, name: 'Films' },
    { id: 12, name: 'Music' },
    { id: 15, name: 'Video Games' },
    { id: 10, name: 'Books' },
  ];

  return (
    <div className={styles[`quiz-cards`]}>
      {categories.map((category) => (
        <Link
          className={`${styles['category-link']} ${
            styles[`category-link__${category.id}`]
          }`}
          key={category.id}
          to={`/quiz/${category.id}`}
        >
          <div className={styles['quiz-card']}>
            <p className={styles[`quiz-card__top`]}>Quiz by theme</p>
            <h2 className={styles['quiz-card__title']}>{category.name}</h2>
            <p className={styles['quiz-card__description']}>5 questions</p>
          </div>

          <button
            className={`${styles['quiz-card-button']} ${
              styles[`quiz-card-button-${category.id}`]
            }`}
          >
            Start quiz
          </button>
          <div className={styles['button-back']}> </div>
        </Link>
      ))}
    </div>
  );
};

export default QuizCard;
