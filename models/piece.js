import mongoose from 'mongoose';

// Define the schema for chess pieces
const pieceSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  overview: {
    type: String,
    required: true,
  },
  mainDetails: [
    {
      name: {
        type: String,
        required: true,
      },
      icon: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
    },
  ],
  strengths: {
    type: Map,
    of: String,
    default: {},
  },
  weaknesses: {
    type: Map,
    of: String,
    default: {},
  },
  strategicUses: {
    type: Map,
    of: {
      description: String,
      fen: String,
    },
    default: {},
  },
  historicalReference: {
    type: String,
    required: true,
  },
});

// Create a model based on the schema
export const Piece = mongoose.model('Piece', pieceSchema);
