import React from 'react';
import { BrowserRouter as Router, Routes, Route, useParams } from 'react-router-dom';
import Home from './pages/Home';
import CreateQuiz from './pages/CreateQuiz';
import Results from './pages/Results';
import QuizPlayer from './components/QuizPlayer';
import QuizList from './components/QuizList';

import { useNavigate } from 'react-router-dom';

function QuizPlayerWrapper() {
  const { id } = useParams();
  const navigate = useNavigate();

  return <QuizPlayer quizId={id} onBack={() => navigate('/')} />;
}

function App() {
  return (
    <Router>
      <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreateQuiz />} />
          <Route path="/results" element={<Results />} />
          <Route path="/quiz/:id" element={<QuizPlayerWrapper />} />
          <Route path="/quiz-list" element={<QuizList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
