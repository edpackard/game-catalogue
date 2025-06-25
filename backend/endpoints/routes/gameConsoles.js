import express from 'express';
import { getGameConsoles, getGameConsoleById, createGameConsole, updateGameConsoleById, deleteGameConsoleById } from '../controllers/gameConsolesController.js';

const router = express.Router();

// POST /gameConsoles
router.post('/', createGameConsole);

// GET /gameConsoles
router.get('/', getGameConsoles);

// GET /gameConsoles/:id
router.get('/:id', getGameConsoleById);

// PUT /gameConsoles/:id
router.put('/:id', updateGameConsoleById);

// DELETE /gameConsoles/:id
router.delete('/:id', deleteGameConsoleById);

export default router; 