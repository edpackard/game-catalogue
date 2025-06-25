import { getStructuredLlm } from '../../ai/llm.js';
import { gamePrompt } from '../../ai/prompts.js';
import { gameGenreSchema } from '../../ai/schemas.js';

async function getAiGameGenre(title, releaseYear, gamesConsole) {
  const structuredLlm = getStructuredLlm(gameGenreSchema, 'gameGenreSchema');
  const game = {
    title,
    releaseYear,
    gamesConsole,
  };
  const message = await structuredLlm.invoke(gamePrompt(game));
  return message;
}

export default { getAiGameGenre };
