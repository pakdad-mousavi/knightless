import { User } from '../models/user.js';
import { checkSchema } from 'express-validator';
import { usernameSchema } from '../validators/profile.js';

export const getProfilePage = (req, res) => {
  const model = {
    title: 'Profile',
    user: req.user ? req.user : null,
  };

  res.render('profile', model);
};

export const updateCustomUsername = async (req, res) => {
  // Validate user input
  const result = await checkSchema(usernameSchema, ['body']).run(req);
  const errors = result[0]?.errors;
  if (errors && errors.length > 0) {
    const firstErr = errors[0];
    return res.json({ code: 400, message: firstErr.msg });
  }

  // Update user's record
  const { customName } = req.body;
  let response;
  try {
    await User.findOneAndUpdate({ email: req.user.email }, { customName: customName });
    response = { code: 200, message: 'Successfully updated username.' };
  } catch (e) {
    console.error(e);
    response = { code: 500, message: 'Error updating username, please try again later.' };
  } finally {
    return res.json(response);
  }
};

export const deleteAccount = async (req, res) => {
  let response;
  try {
    await User.findOneAndDelete({ email: req.user.email });
    response = { code: 200, message: 'Successfully deleted account.' };
  } catch (e) {
    console.error(e);
    response = { code: 500, message: 'Error deleting account, please try again later.' };
  } finally {
    return res.json(response);
  }
};
