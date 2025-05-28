import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const questionSchema = new Schema({
  questionText: { type: String, required: true },
  options: [{ type: String, required: true }],
  correctAnswerIndex: { type: Number, required: true },
  quiz: { type: Schema.Types.ObjectId, ref: 'Quiz', required: true }
});

const Question = model('Question', questionSchema);

export default Question;
