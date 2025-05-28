import React, { useEffect, useState } from 'react';
import axios from '../api';
import styled from 'styled-components';

const Wrapper = styled.div`
  max-width: 800px;
  margin: 2rem auto;
  color: white;
`;

const QuestionBox = styled.div`
  background-color: #111827;
  border: 1px solid #3b82f6;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 2rem;
`;

const Button = styled.button`
  margin-top: 1rem;
  margin-right: 1rem;
`;

export default function QuizPlayer({ quizId, onBack }) {
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [score, setScore] = useState(null);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const res = await axios.get(`/quizzes/${quizId}`);
        setQuiz(res.data);
        setAnswers(Array(res.data.questions.length).fill(null));
      } catch (err) {
        console.error('Error fetching quiz:', err);
      }
    };
    fetchQuiz();
  }, [quizId]);

  const handleSelect = (questionIdx, optionIdx) => {
    const newAnswers = [...answers];
    newAnswers[questionIdx] = optionIdx;
    setAnswers(newAnswers);
  };

  const handleSubmit = async () => {
    const resultScore = quiz.questions.reduce((acc, q, idx) =>
      answers[idx] === q.correctAnswerIndex ? acc + 1 : acc, 0
    );

    try {
      await axios.post('/results', {
        quiz: quiz._id,
        user: '6651c7f16e149c8fae6efb9f',
        answers,
        score: resultScore
      });
      setScore(resultScore);
    } catch (err) {
      console.error('❌ Error submitting result:', err.response?.data || err.message);
    }
  };

  if (!quiz) return <Wrapper>Loading...</Wrapper>;

  return (
    <Wrapper>
      <h2>{quiz.title}</h2>
      {quiz.questions.map((q, idx) => (
        <QuestionBox key={q._id}>
        <p><strong>Q{idx + 1}:</strong> {q.questionText}</p>
        {q.options.map((opt, i) => (
            <div key={i} style={{ margin: '6px 0' }}>
                <label style={{ display: 'inline-flex', alignItems: 'center', verticalAlign: 'middle' }}>
                <input
                    type="radio"
                    name={`question-${idx}`}
                    checked={answers[idx] === i}
                    onChange={() => handleSelect(idx, i)}
                    style={{
                    marginRight: '10px',
                    transform: 'translateY(6px)'
                    }}
                />
                <span>{opt}</span>
                </label>
            </div>
            ))}
        </QuestionBox>
      ))}
      {score === null ? (
        <>
          <Button onClick={handleSubmit}>Submit Quiz</Button>
          {onBack && <Button onClick={onBack}>Back to Home</Button>}
        </>
      ) : (
        <>
          <h3>Your Score: {score} / {quiz.questions.length}</h3>
          {onBack && <Button onClick={onBack}>Back to Home</Button>}
        </>
      )}
    </Wrapper>
  );
}