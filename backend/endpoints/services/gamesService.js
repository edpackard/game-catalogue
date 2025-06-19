import gamesRepository from '../repositories/gamesRepository.js';

async function getGames() {
  // Add business logic here if needed
  return gamesRepository.getAllGames();
}

async function createGame(gameData) {
  // Add business logic/validation here if needed
  return gamesRepository.createGame(gameData);
}

export default { getGames, createGame }; 