import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const resultSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  quiz: { type: Schema.Types.ObjectId, ref: 'Quiz', required: true },
  answers: [{ type: Number, required: true }],
  score: { type: Number, required: true }
}, { timestamps: true });

const Result = model('Result', resultSchema);

export default Result;
