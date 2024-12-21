import express from 'express';
import passport from 'passport';
import * as loginController from '../controllers/login.js';

const router = express.Router();

// Add route for login page
router.route('/login').get(loginController.index);

// Authentication via google
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Callback after user is authenticated with google
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
  res.redirect('/daily-puzzle');
});

router.get('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }

    res.redirect('/');
  });
});

export default router;
