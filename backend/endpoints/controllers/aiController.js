import aiService from '../services/aiService.js';

async function getAiGenre(req, res) {
  const { title, releaseYear, gamesConsole } = req.query;
  if (!title) {
    return res.status(400).json({ error: 'No title provided' });
  }
  try {
    const genreObject = await aiService.getAiGameGenre(
      title,
      releaseYear,
      gamesConsole
    );
    console.log(`[GET] /ai${req.url} - Generated genre object`);
    res.json(genreObject);
  } catch (error) {
    console.error(`[GET] /ai${req.url} - Error:`, error);
    res.status(500).json({ error: 'Failed to generate genre object.' });
  }
}

export { getAiGenre };
