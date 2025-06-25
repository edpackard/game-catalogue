import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function getAllGameConsoles() {
  return prisma.gameConsole.findMany();
}

async function getGameConsoleById(id) {
  return prisma.gameConsole.findUnique({ where: { id: Number(id) } });
}

async function createGameConsole(data) {
  return prisma.gameConsole.create({ data });
}

async function updateGameConsoleById(id, data) {
  return prisma.gameConsole.update({ where: { id: Number(id) }, data });
}

async function deleteGameConsoleById(id) {
  return prisma.gameConsole.delete({ where: { id: Number(id) } });
}

export default { getAllGameConsoles, getGameConsoleById, createGameConsole, updateGameConsoleById, deleteGameConsoleById }; 