import gamesRepository from '../repositories/gamesRepository.js';
import { gameReviewSchema, gameGenreSchema } from '../../ai/schemas.js';
import { getStructuredLlm } from '../../ai/llm.js';
import { gamePrompt } from '../../ai/prompts.js';

async function getGames() {
  return gamesRepository.getAllGames();
}

async function getGameById(id) {
  return gamesRepository.getGameById(id);
}

async function getAiGameReview(game) {
  const structuredLlm = getStructuredLlm(gameReviewSchema, 'gameReviewSchema');
  const message = await structuredLlm.invoke(gamePrompt(game));
  return message;
}

async function getAiGameGenre(game) {
  const structuredLlm = getStructuredLlm(gameGenreSchema, 'gameGenreSchema');
  console.log(structuredLlm);
  const message = await structuredLlm.invoke(gamePrompt(game));
  return message;
}

async function createGame(gameData) {
  return gamesRepository.createGame(gameData);
}

async function updateGameById(id, gameData) {
  return gamesRepository.updateGameById(id, gameData);
}

async function deleteGameById(id) {
  return gamesRepository.deleteGameById(id);
}

export default {
  getGames,
  getGameById,
  getAiGameReview,
  getAiGameGenre,
  createGame,
  updateGameById,
  deleteGameById,
};
