import React, { useEffect, useState } from 'react';
import axios from '../api';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';

const ListWrapper = styled.div`
  max-width: 700px;
  margin: 2rem auto;
  color: white;
`;

const QuizCard = styled.div`
  padding: 1.5rem;
  background-color: #111827;
  border: 1px solid #3b82f6;
  border-radius: 8px;
  margin-bottom: 1.5rem;
`;

const Title = styled.h3`
  margin: 0 0 0.5rem 0;
`;

const Button = styled.button`
  margin-right: 10px;
`;

export default function QuizList() {
  const [quizzes, setQuizzes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const res = await axios.get('/quizzes');
        setQuizzes(res.data);
      } catch (err) {
        console.error('Error fetching quizzes:', err);
      }
    };
    fetchQuizzes();
  }, []);

  const handleTakeQuiz = (quizId) => {
    navigate(`/quiz/${quizId}`);
  };

  const handleDeleteQuiz = async (quizId) => {
    if (!window.confirm('Are you sure you want to delete this quiz?')) return;
    try {
      await axios.delete(`/quizzes/${quizId}`);
      setQuizzes(quizzes.filter(q => q._id !== quizId));
    } catch (err) {
      console.error('Error deleting quiz:', err);
      alert('Failed to delete quiz');
    }
  };

  return (
    <ListWrapper>
      <Link to="/"><Button>Back to Home</Button></Link>
      <h2>Available Quizzes</h2>
      {quizzes.length === 0 ? (
        <p>No quizzes available.</p>
      ) : (
        quizzes.map((quiz) => (
          <QuizCard key={quiz._id}>
            <Title>{quiz.title}</Title>
            <Button onClick={() => handleTakeQuiz(quiz._id)}>Take Quiz</Button>
            <Button onClick={() => handleDeleteQuiz(quiz._id)} style={{ backgroundColor: 'red' }}>
              Delete
            </Button>
          </QuizCard>
        ))
      )}
    </ListWrapper>
  );
}