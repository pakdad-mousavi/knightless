import express from 'express';
import * as homeController from '../controllers/home.js';

const router = express.Router();

router.route('/').get(homeController.index);

export default router;