export const usernameSchema = {
  customName: {
    trim: true,
    notEmpty: {
      bail: true,
      errorMessage: 'Your username must have at least 1 character.',
    },
    matches: {
      options: /^[A-Za-z0-9_]+$/,
      errorMessage: 'Your username may only contain letters, numbers, and underscores.',
      bail: true,
    },
    isLength: {
      options: { min: 1, max: 20 },
      bail: true,
      errorMessage: 'Your username needs to have at between 1 - 20 characters.',
    },
  },
};
