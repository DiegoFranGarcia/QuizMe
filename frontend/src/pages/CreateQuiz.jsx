import React from 'react';
import { Link } from 'react-router-dom';
import QuizForm from '../components/QuizForm';

export default function CreateQuiz() {
  return (
    <div>
      <Link to="/">
        <button>Back to Home</button>
      </Link>
      <br />
      <h2>Create a New Quiz</h2>
      <QuizForm />
    </div>
  );
}
