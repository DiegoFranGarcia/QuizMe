import React, { useEffect, useState } from 'react';
import axios from '../api';
import { Link } from 'react-router-dom';
import {
    BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer
  } from 'recharts';

export default function Results() {
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
        try {
          const res = await axios.get('/results');
          console.log('[📊 Raw results]', res.data); 
          setResults(res.data || []);
        } catch (err) {
          console.error('Error fetching results:', err);
        }
      };
      fetchResults();
  }, []);

  // Group results by quiz ID
  const groupedResults = results.reduce((acc, result) => {
    const quizId = result.quiz?._id;
    const title = result.quiz?.title;

    if (!quizId || !title) return acc; // skip if quiz is not populated

    if (!acc[quizId]) {
      acc[quizId] = {
        title,
        attempts: []
      };
    }

    acc[quizId].attempts.push({ score: result.score });
    return acc;
  }, {});

  const groupedArray = Object.entries(groupedResults).map(([quizId, data]) => ({
    quizId,
    title: data.title,
    attempts: data.attempts.map((a, i) => ({ attempt: i + 1, score: a.score }))
  }));

  return (
    <div>
      <h2>Your Quiz Results</h2>
      <Link to="/">
        <button style={{ marginBottom: '20px' }}>Back to Home</button>
      </Link>

      {groupedArray.length === 0 ? (
        <p>No results yet.</p>
      ) : (
        groupedArray.map((group) => (
          <div key={group.quizId} style={{ marginBottom: '40px' }}>
            <h3>{group.title}</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={group.attempts}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="attempt" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="score" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        ))
      )}
    </div>
  );
}