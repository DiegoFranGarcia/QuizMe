import express from 'express';
import Question from '../models/Question.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const question = new Question(req.body);
    const saved = await question.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  const questions = await Question.find();
  res.json(questions);
});

export default router;
