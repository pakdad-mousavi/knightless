import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  googleId: { type: String, unique: true },
  email: { type: String, unique: true },
  name: String,
  customName: {
    type: String,
    unique: true,
    default: null,
  },
});

export const User = mongoose.model('User', userSchema);
