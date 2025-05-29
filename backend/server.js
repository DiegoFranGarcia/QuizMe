import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './config/db.js';


//import all routes
import userRoutes from './routes/users.js';
import quizRoutes from './routes/quizzes.js';
import questionRoutes from './routes/questions.js';
import resultRoutes from './routes/results.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
  res.send('API is working!');
});

app.use('/api/users', userRoutes);
app.use('/api/quizzes', quizRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api/results', resultRoutes);

app.listen(3000, () => {
  connectDB();
  console.log('Server is running at http://localhost:3000');
});
