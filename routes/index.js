import express from 'express';
import * as homeController from '../controllers/home.js';
import * as playersController from '../controllers/players.js';
import * as piecesController from '../controllers/pieces.js';

const router = express.Router();

// Home
router.route('/').get(homeController.index);

// Hall of fame
router.route('/hall-of-fame').get(playersController.getPlayers);
router.route('/hall-of-fame').post(playersController.applySearchFilters);
router.route('/hall-of-fame/:id').get(playersController.getPlayerById);

// Pieces
router.route('/pieces/:id').get(piecesController.getPieceById);

export default router;