import gamesService from '../services/gamesService.js';

async function getGames(req, res) {
  try {
    const games = await gamesService.getGames();
    console.log(`[GET] /games - Fetched all games (${games.length})`);
    res.json(games);
  } catch (error) {
    console.error(`[GET] /games - Error:`, error);
    res.status(500).json({ error: 'Failed to fetch games.' });
  }
}

async function getGameById(req, res) {
  try {
    const game = await gamesService.getGameById(req.params.id);
    if (!game) {
      console.warn(`[GET] /games/${req.params.id} - Not found`);
      return res.status(404).json({ error: 'Game not found.' });
    }
    console.log(`[GET] /games/${req.params.id} - Fetched game`);
    res.json(game);
  } catch (error) {
    console.error(`[GET] /games/${req.params.id} - Error:`, error);
    res.status(500).json({ error: 'Failed to fetch game.' });
  }
}

async function createGame(req, res) {
  const { title, releaseYear, labelCode, region } = req.body;
  if (!title) {
    console.warn(`[POST] /games - Missing title`);
    return res.status(400).json({ error: 'Title is required.' });
  }
  try {
    const game = await gamesService.createGame({
      title,
      releaseYear: releaseYear ?? null,
      labelCode: labelCode ?? null,
      region: region ?? null
    });
    console.log(`[POST] /games - Created game with ID ${game.id}`);
    res.status(201).json(game);
  } catch (error) {
    console.error(`[POST] /games - Error:`, error);
    res.status(500).json({ error: 'Failed to create game.' });
  }
}

async function updateGameById(req, res) {
  try {
    const updated = await gamesService.updateGameById(req.params.id, req.body);
    console.log(`[PUT] /games/${req.params.id} - Updated game`);
    res.json(updated);
  } catch (error) {
    if (error.code === 'P2025') {
      console.warn(`[PUT] /games/${req.params.id} - Not found`);
      return res.status(404).json({ error: 'Game not found.' });
    }
    console.error(`[PUT] /games/${req.params.id} - Error:`, error);
    res.status(500).json({ error: 'Failed to update game.' });
  }
}

async function deleteGameById(req, res) {
  try {
    await gamesService.deleteGameById(req.params.id);
    console.log(`[DELETE] /games/${req.params.id} - Deleted game`);
    res.status(204).send();
  } catch (error) {
    if (error.code === 'P2025') {
      console.warn(`[DELETE] /games/${req.params.id} - Not found`);
      return res.status(404).json({ error: 'Game not found.' });
    }
    console.error(`[DELETE] /games/${req.params.id} - Error:`, error);
    res.status(500).json({ error: 'Failed to delete game.' });
  }
}

export { getGames, getGameById, createGame, updateGameById, deleteGameById }; 