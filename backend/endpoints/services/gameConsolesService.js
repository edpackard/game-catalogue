import gameConsolesRepository from '../repositories/gameConsolesRepository.js';

async function getGameConsoles() {
  return gameConsolesRepository.getAllGameConsoles();
}

async function getGameConsoleById(id) {
  return gameConsolesRepository.getGameConsoleById(id);
}

async function createGameConsole(gameConsoleData) {
  return gameConsolesRepository.createGameConsole(gameConsoleData);
}

async function updateGameConsoleById(id, gameConsoleData) {
  return gameConsolesRepository.updateGameConsoleById(id, gameConsoleData);
}

async function deleteGameConsoleById(id) {
  return gameConsolesRepository.deleteGameConsoleById(id);
}

export default {
  getGameConsoles,
  getGameConsoleById,
  createGameConsole,
  updateGameConsoleById,
  deleteGameConsoleById,
}; 