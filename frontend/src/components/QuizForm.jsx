import React, { useState } from 'react';
import axios from '../api';
import styled from 'styled-components';

const FormWrapper = styled.div`
  max-width: 700px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: #0a0f1f;
  border-radius: 10px;
  color: white;
`;

const FormTitle = styled.h2`
  text-align: center;
  margin-bottom: 1.5rem;
`;

const FieldGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  font-weight: bold;
  margin-bottom: 0.3rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  margin-bottom: 0.5rem;
  background-color: #1e293b;
  border: 1px solid #3b82f6;
  color: white;
  border-radius: 4px;
`;

const Select = styled.select`
  width: 100%;
  padding: 8px;
  background-color: #1e293b;
  border: 1px solid #3b82f6;
  color: white;
  border-radius: 4px;
`;

const QuestionBlock = styled.div`
  margin-bottom: 2rem;
  padding: 1rem;
  border: 1px solid #3b82f6;
  border-radius: 8px;
  background-color: #111827;
`;

const Button = styled.button`
  margin-top: 1rem;
  margin-right: 0.5rem;
  padding: 10px 20px;
  background-color: #3b82f6;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #2563eb;
  }
`;

export default function QuizForm() {
  const [title, setTitle] = useState('');
  const [questions, setQuestions] = useState([
    { questionText: '', options: ['', '', '', ''], correctAnswerIndex: 0 }
  ]);

  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...questions];
    if (field === 'questionText') {
      updatedQuestions[index].questionText = value;
    } else if (field.startsWith('option')) {
      const optionIndex = parseInt(field.split('-')[1]);
      updatedQuestions[index].options[optionIndex] = value;
    } else if (field === 'correctAnswerIndex') {
      updatedQuestions[index].correctAnswerIndex = parseInt(value);
    }
    setQuestions(updatedQuestions);
  };

  const addQuestion = () => {
    setQuestions([
      ...questions,
      { questionText: '', options: ['', '', '', ''], correctAnswerIndex: 0 }
    ]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const quizRes = await axios.post('/quizzes', {
        title,
        creator: '6651c7f16e149c8fae6efb9f' // TEMP ID
      });
      const quizId = quizRes.data._id;
      const questionIds = [];

      for (const q of questions) {
        const res = await axios.post('/questions', {
          ...q,
          quiz: quizId
        });
        questionIds.push(res.data._id);
      }

      await axios.put(`/quizzes/${quizId}`, {
        questions: questionIds
      });

      alert('✅ Quiz created successfully!');
      setTitle('');
      setQuestions([{ questionText: '', options: ['', '', '', ''], correctAnswerIndex: 0 }]);
    } catch (err) {
      console.error('[❌ Error]', err.response?.data || err.message);
      alert('❌ Error creating quiz.');
    }
  };

  return (
    <FormWrapper>
      <FormTitle>Create a New Quiz</FormTitle>
      <form onSubmit={handleSubmit}>
        <FieldGroup>
          <Label>Quiz Title</Label>
          <Input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </FieldGroup>

        {questions.map((q, index) => (
          <QuestionBlock key={index}>
            <FieldGroup>
              <Label>Question {index + 1}</Label>
              <Input
                type="text"
                value={q.questionText}
                onChange={(e) => handleQuestionChange(index, 'questionText', e.target.value)}
                required
              />
            </FieldGroup>

            {q.options.map((opt, i) => (
              <FieldGroup key={i}>
                <Label>Option {i + 1}</Label>
                <Input
                  type="text"
                  value={opt}
                  onChange={(e) => handleQuestionChange(index, `option-${i}`, e.target.value)}
                  required
                />
              </FieldGroup>
            ))}

            <FieldGroup>
              <Label>Correct Answer</Label>
              <Select
                value={q.correctAnswerIndex}
                onChange={(e) => handleQuestionChange(index, 'correctAnswerIndex', e.target.value)}
              >
                {[0, 1, 2, 3].map((num) => (
                  <option key={num} value={num}>
                    Option {num + 1}
                  </option>
                ))}
              </Select>
            </FieldGroup>
          </QuestionBlock>
        ))}

        <Button type="button" onClick={addQuestion}>+ Add Question</Button>
        <Button type="submit">Submit Quiz</Button>
      </form>
    </FormWrapper>
  );
}