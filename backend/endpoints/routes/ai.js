import express from 'express';
import { getAiGenre } from '../controllers/aiController.js';

const router = express.Router();

// GET /genres
router.get('/genres', getAiGenre);

export default router;
