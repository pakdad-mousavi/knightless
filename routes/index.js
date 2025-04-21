import express from 'express';
import * as indexController from '../controllers/index.js';
import * as homeController from '../controllers/home.js';
import * as playersController from '../controllers/players.js';
import * as piecesController from '../controllers/pieces.js';
import * as notationController from '../controllers/notation.js';
import * as attributionsController from '../controllers/attributions.js';
import * as contactController from '../controllers/contact.js';
import * as puzzleController from '../controllers/puzzles.js';
import * as timelineController from '../controllers/timeline.js';
import * as faqController from '../controllers/faq.js';
import * as mapController from '../controllers/map.js';

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
router.route('/').get(ensureNotAuthenticated, indexController.index);

// Home
router.route('/home').get(ensureAuthenticated, homeController.index);

// // Map
// router.route('/map').get(ensureAuthenticated, mapController.index);

// Hall of fame
router.route('/hall-of-fame').get(playersController.getPlayers);
router.route('/hall-of-fame').post(playersController.applySearchFilters);
router.route('/hall-of-fame/:id').get(playersController.getPlayerById);

// Pieces
router.route('/pieces/:id').get(piecesController.getPieceById);

// Notation
router.route('/notation').get(notationController.index);

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

export default router;
