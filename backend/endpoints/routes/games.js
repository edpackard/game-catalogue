import express from 'express';
import { getGames, getGameById, createGame, updateGameById, deleteGameById } from '../controllers/gamesController.js';

const router = express.Router();

// POST /games
router.post('/', createGame);

// GET /games
router.get('/', getGames);

// GET /games/:id
router.get('/:id', getGameById);

// PUT /games/:id
router.put('/:id', updateGameById);

// DELETE /games/:id
router.delete('/:id', deleteGameById);

export default router; 