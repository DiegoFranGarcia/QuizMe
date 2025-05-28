import express from 'express';
import Quiz from '../models/Quiz.js';
import Question from '../models/Question.js';
import Result from '../models/Result.js';


const router = express.Router();

router.post('/', async (req, res) => {
    try {
      console.log('[📥 POST /api/quizzes]', req.body);  // ✅ Log incoming data
      const newQuiz = new Quiz(req.body);
      const savedQuiz = await newQuiz.save();
      console.log('[✅ Quiz Saved]', savedQuiz);         // ✅ Log success
      res.status(201).json(savedQuiz);
    } catch (err) {
      console.error('[❌ Quiz Insert Error]', err.message);
      res.status(400).json({ error: err.message });
    }
  });
  

router.get('/', async (req, res) => {
  const quizzes = await Quiz.find().populate('questions').populate('creator');
  res.json(quizzes);
});

router.get('/:id', async (req, res) => {
    try {
      const quiz = await Quiz.findById(req.params.id).populate('questions');
      if (!quiz) return res.status(404).json({ error: 'Quiz not found' });
      res.json(quiz);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

router.put('/:id', async (req, res) => {
    try {
      const updatedQuiz = await Quiz.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },  
        { new: true }
      );
      res.json(updatedQuiz);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });

  router.delete('/:id', async (req, res) => {
    try {
      const quizId = req.params.id;
  
      // Delete the quiz
      const deletedQuiz = await Quiz.findByIdAndDelete(quizId);
      if (!deletedQuiz) {
        return res.status(404).json({ error: 'Quiz not found' });
      }
  
      // Delete associated questions
      await Question.deleteMany({ quiz: quizId });
  
      // Delete associated results
      await Result.deleteMany({ quiz: quizId });
  
      res.json({ message: 'Quiz, questions, and results deleted' });
    } catch (err) {
      console.error('[❌ Delete Error]', err.message);
      res.status(500).json({ error: err.message });
    }
  });


export default router;