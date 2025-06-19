import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function getAllGames() {
  return prisma.game.findMany();
}

async function createGame(data) {
  return prisma.game.create({ data });
}

export default { getAllGames, createGame }; 