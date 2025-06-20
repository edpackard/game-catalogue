import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function getAllGames() {
  return prisma.game.findMany();
}

async function getGameById(id) {
  return prisma.game.findUnique({ where: { id: Number(id) } });
}

async function createGame(data) {
  return prisma.game.create({ data });
}

async function updateGameById(id, data) {
  return prisma.game.update({ where: { id: Number(id) }, data });
}

async function deleteGameById(id) {
  return prisma.game.delete({ where: { id: Number(id) } });
}

export default {
  getAllGames,
  getGameById,
  createGame,
  updateGameById,
  deleteGameById,
};
