import { z } from 'zod';

const gameReviewSchema = z.object({
  review: z
    .string()
    .describe(`Provide a short review of the game's good and bad aspects.`),
  rating: z
    .number()
    .min(1)
    .max(5)
    .describe(
      'Based on criticial consensus, a rating of the game from 1 (worst) to 5 (best).'
    ),
});

const gameGenreSchema = z.object({
  primary_genre: z
    .string()
    .describe(
      "Short 1-2 word description of the game's primary genre (i.e. action-adventure, platformer, fighting)."
    ),
  secondary_genre: z
    .string()
    .describe(
      "Short 1-2 word description of the game's secondary genre if it has one (i.e. stealth, brawler etc)."
    ),
});

export { gameGenreSchema, gameReviewSchema };
