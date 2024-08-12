import mongoose from 'mongoose';

const PlayerSchema = new mongoose.Schema({
  id: { type: String, required: true },
  personalDetails: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    gender: { type: String, required: true },
    dateOfBirth: { type: String, required: true },
    placeOfBirth: { type: String, required: true },
    dateOfDeath: { type: String, default: 'N/A' },
    placeOfDeath: { type: String, default: 'N/A' },
    peakFideRating: { type: Number, required: true },
    hasBeenChampion: { type: Boolean, required: true },
  },
  earlyLife: { type: String, required: true },
  riseToProminence: { type: String, required: true },
  worldChessChampion: { type: String, required: true },
  playingStyle: { type: [String], required: true },
  achievementsAndRecords: { type: String, required: true },
  offTheboard: { type: String, required: true },
  personalLife: { type: String, required: true },
  funFact: { type: String, required: true },
});

export const Player = mongoose.model('Player', PlayerSchema);
