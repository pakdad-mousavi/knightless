export const usernameSchema = {
  customName: {
    trim: true,
    notEmpty: {
      bail: true,
      errorMessage: 'Username cannot be empty.',
    },
    matches: {
      options: /^[A-Za-z0-9_]+$/,
      errorMessage: 'Username must be letters, numbers, and underlines.',
      bail: true,
    },
    isLength: {
      options: { min: 1, max: 20 },
      bail: true,
      errorMessage: 'Username must be between 1 - 20 characters.',
    },
  },
};
