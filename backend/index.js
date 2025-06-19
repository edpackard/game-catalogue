import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

app.post('/games', async (req, res) => {
  const { title, releaseYear, labelCode, region } = req.body;
  if (!title || !releaseYear || !labelCode || !region) {
    return res.status(400).json({ error: 'All fields are required.' });
  }
  try {
    const game = await prisma.game.create({
      data: { title, releaseYear, labelCode, region },
    });
    res.status(201).json(game);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create game.' });
  }
});

app.get('/games', async (req, res) => {
  try {
    const games = await prisma.game.findMany();
    res.json(games);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch games.' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 