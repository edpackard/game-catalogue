import gamesService from '../services/gamesService.js';

async function getGames(req, res) {
  try {
    const games = await gamesService.getGames();
    res.json(games);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch games.' });
  }
}

async function createGame(req, res) {
  const { title, releaseYear, labelCode, region } = req.body;
  if (!title) {
    return res.status(400).json({ error: 'Title is required.' });
  }
  try {
    const game = await gamesService.createGame({
      title,
      releaseYear: releaseYear ?? null,
      labelCode: labelCode ?? null,
      region: region ?? null
    });
    res.status(201).json(game);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create game.' });
  }
}

export { getGames, createGame }; 