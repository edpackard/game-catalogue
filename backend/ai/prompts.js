function gamePrompt(game) {
  let prompt = game.title;
  if (game.releaseYear) {
    prompt += `, ${game.releaseYear}`;
  }
  return prompt;
}

export { gamePrompt };
