import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  justify-content: center;
  height: 50vh;
`;

export default function Home() {
  return (
    <Container>
      <h1>Welcome to QuizMe</h1>
      <Link to="/create"><button>Create a Quiz</button></Link>
      <Link to="/quiz-list"><button>Take a Quiz</button></Link>
      <Link to="/results"><button>View Results</button></Link>
    </Container>
  );
}
