import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const prisma = new PrismaClient();

async function main() {
  const gamesPath = path.join(__dirname, 'games_seed.json');
  const games = JSON.parse(fs.readFileSync(gamesPath, 'utf-8'));
  for (const game of games) {
    await prisma.game.create({ data: game });
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