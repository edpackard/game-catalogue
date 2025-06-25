import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import gamesRouter from './endpoints/routes/games.js';
import gameConsolesRouter from './endpoints/routes/gameConsoles.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/games', gamesRouter);
app.use('/gameConsoles', gameConsolesRouter);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
