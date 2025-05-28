import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const quizSchema = new Schema({
  title: { type: String, required: true },
  creator: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  questions: [{ type: Schema.Types.ObjectId, ref: 'Question' }]
}, { timestamps: true });

const Quiz = model('Quiz', quizSchema);

export default Quiz;
