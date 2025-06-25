import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const prisma = new PrismaClient();

async function main() {
  // First, seed game consoles
  const gameConsolesPath = path.join(__dirname, 'gameConsoles_seed.json');
  const gameConsoles = JSON.parse(fs.readFileSync(gameConsolesPath, 'utf-8'));
  
  for (const gameConsoleData of gameConsoles) {
    await prisma.gameConsole.create({ data: gameConsoleData });
  }
  console.log('Seeded', gameConsoles.length, 'game consoles!');

  // Get all game consoles to map names to IDs
  const allGameConsoles = await prisma.gameConsole.findMany();
  const gameConsoleMap = {};
  for (const gameConsole of allGameConsoles) {
    gameConsoleMap[gameConsole.name] = gameConsole.id;
  }

  // Then seed games with game console relationships
  const gamesPath = path.join(__dirname, 'games_seed.json');
  const games = JSON.parse(fs.readFileSync(gamesPath, 'utf-8'));
  
  for (const game of games) {
    const { gameConsole: gameConsoleName, ...gameData } = game;
    const gameConsoleId = gameConsoleMap[gameConsoleName];
    
    if (!gameConsoleId) {
      console.error(`Game console not found: ${gameConsoleName}`);
      continue;
    }
    
    await prisma.game.create({ 
      data: {
        ...gameData,
        gameConsoleId: gameConsoleId
      }
    });
  }
  console.log('Seeded', games.length, 'games!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 