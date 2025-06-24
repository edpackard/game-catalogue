import express from 'express';
import {
  getGames,
  getGameById,
  createGame,
  updateGameById,
  deleteGameById,
  getAiGameReviewById,
  getAiGenreById,
} from '../controllers/gamesController.js';

const router = express.Router();

// POST /games
router.post('/', createGame);

// GET /games
router.get('/', getGames);

// GET /games/:id
router.get('/:id', getGameById);

// GET /games/:id/ai-review
router.get('/:id/ai-review', getAiGameReviewById);

// GET /games/:id/ai-genre
router.get('/:id/ai-genre', getAiGenreById);

// PUT /games/:id
router.put('/:id', updateGameById);

// DELETE /games/:id
router.delete('/:id', deleteGameById);

export default router;
