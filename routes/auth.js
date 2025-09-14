import express from 'express';
import passport from 'passport';
import * as loginController from '../controllers/login.js';

const router = express.Router();

// Authentication middleware
const ensureNotAuthenticated = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return next();
  }
  res.redirect('/home');
};

// Add route for login page
router.route('/login').get(ensureNotAuthenticated, loginController.index);

// Authentication via google
router.get('/google', ensureNotAuthenticated, passport.authenticate('google', { scope: ['profile', 'email'] }));

// Callback after user is authenticated with google
router.get('/google/callback', ensureNotAuthenticated, passport.authenticate('google', { failureRedirect: '/auth/login' }), (req, res) => {
  res.redirect('/');
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
