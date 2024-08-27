import express from 'express';
import * as homeController from '../controllers/home.js';
import * as playersController from '../controllers/players.js';
import * as piecesController from '../controllers/pieces.js';
import * as notationController from '../controllers/notation.js';
import * as attributionsController from '../controllers/attributions.js';
import * as contactController from '../controllers/contact.js';

const router = express.Router();

// Home
router.route('/').get(homeController.index);

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

export default router;