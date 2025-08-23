import express from 'express';
import * as indexController from '../controllers/index.js';
import * as playersController from '../controllers/players.js';
import * as attributionsController from '../controllers/attributions.js';
import * as contactController from '../controllers/contact.js';
import * as puzzleController from '../controllers/puzzles.js';
import * as faqController from '../controllers/faq.js';
import * as learnController from '../controllers/learn.js';
import * as profileController from '../controllers/profile.js';

const router = express.Router();

// Authentication middleware
const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/auth/login');
};

const ensureNotAuthenticated = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return next();
  }
  res.redirect('/home');
};

// Index
router.route('/').get(indexController.index);

// Hall of fame
router.route('/hall-of-fame').get(playersController.getPlayers);
router.route('/hall-of-fame').post(playersController.applySearchFilters);
router.route('/hall-of-fame/:id').get(playersController.getPlayerById);

// Pieces
router.route('/learn/pieces').get(learnController.pieces);
router.route('/learn/pieces/king').get(learnController.king);
router.route('/learn/pieces/queen').get(learnController.queen);
router.route('/learn/pieces/rook').get(learnController.rook);
router.route('/learn/pieces/bishop').get(learnController.bishop);
router.route('/learn/pieces/knight').get(learnController.knight);
router.route('/learn/pieces/pawn').get(learnController.pawn);

// Attributions
router.route('/attributions').get(attributionsController.index);

// Contact
router.route('/contact').get(contactController.index);

// Daily puzzle
router.route('/daily-puzzle').get(puzzleController.getDailyPuzzle);
router.route('/faq').get(faqController.getFaqPage);

// Puzzle forge
router.route('/puzzle-forge').get(puzzleController.getRandomPuzzle);
router.route('/puzzle-forge/:id').get(puzzleController.getPuzzleById);

// User Profile
router.route('/profile').get(ensureAuthenticated, profileController.getProfilePage);
router.route('/profile').post(ensureAuthenticated, profileController.updateCustomUsername);
router.route('/profile').delete(ensureAuthenticated, profileController.deleteAccount);

export default router;
