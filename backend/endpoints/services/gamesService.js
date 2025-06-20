import gamesRepository from '../repositories/gamesRepository.js';

async function getGames() {
  return gamesRepository.getAllGames();
}

async function getGameById(id) {
  return gamesRepository.getGameById(id);
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
  createGame,
  updateGameById,
  deleteGameById,
};
