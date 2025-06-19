import express from 'express';
import { getGames, createGame } from '../controllers/gamesController.js';

const router = express.Router();

// POST /games
router.post('/', createGame);

// GET /games
router.get('/', getGames);

export default router; 