import express from 'express';
import Result from '../models/Result.js';

const router = express.Router();

router.post('/', async (req, res) => {
    try {
      const { quiz, user, answers, score } = req.body;
  
      if (!quiz || !user || !Array.isArray(answers) || score === undefined) {
        return res.status(400).json({ error: 'Missing fields in result submission' });
      }
  
      const result = new Result({ quiz, user, answers, score });
      await result.save();
      res.status(201).json(result);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  

router.get('/', async (req, res) => {
    try {
        const results = await Result.find().populate('quiz');
        res.json(results);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
});

export default router;
