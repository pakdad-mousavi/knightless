import mongoose from 'mongoose';

// Define the schema for chess puzzles
const puzzleSchema = new mongoose.Schema({
  fen: {
    type: String,
    required: true,
  },
  moves: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
});

// Create a model based on the schema
export const Puzzle = mongoose.model('Puzzle', puzzleSchema);
