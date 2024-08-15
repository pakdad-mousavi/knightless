import express from 'express';
import * as homeController from '../controllers/home.js';
import * as playersController from '../controllers/players.js';

const router = express.Router();

router.route('/').get(homeController.index);
router.route('/hall-of-fame').get(playersController.getPlayers);
router.route('/hall-of-fame').post(playersController.applySearchFilters);
router.route('/hall-of-fame/:id').get(playersController.getPlayerById);

export default router;