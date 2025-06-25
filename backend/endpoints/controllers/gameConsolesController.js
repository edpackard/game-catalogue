import gameConsolesService from '../services/gameConsolesService.js';

async function getGameConsoles(req, res) {
  try {
    const gameConsoles = await gameConsolesService.getGameConsoles();
    console.log(`[GET] /gameConsoles - Fetched all game consoles (${gameConsoles.length})`);
    res.json(gameConsoles);
  } catch (error) {
    console.error(`[GET] /gameConsoles - Error:`, error);
    res.status(500).json({ error: 'Failed to fetch game consoles.' });
  }
}

async function getGameConsoleById(req, res) {
  try {
    const gameConsole = await gameConsolesService.getGameConsoleById(req.params.id);
    if (!gameConsole) {
      console.warn(`[GET] /gameConsoles/${req.params.id} - Not found`);
      return res.status(404).json({ error: 'Game console not found.' });
    }
    console.log(`[GET] /gameConsoles/${req.params.id} - Fetched game console`);
    res.json(gameConsole);
  } catch (error) {
    console.error(`[GET] /gameConsoles/${req.params.id} - Error:`, error);
    res.status(500).json({ error: 'Failed to fetch game console.' });
  }
}

async function createGameConsole(req, res) {
  const { name, manufacturer } = req.body;
  
  // Validate name field
  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    console.warn(`[POST] /gameConsoles - Invalid or missing name`);
    return res.status(400).json({ error: 'Name is required and must be a non-empty string.' });
  }
  
  // Validate manufacturer field
  if (!manufacturer || typeof manufacturer !== 'string' || manufacturer.trim().length === 0) {
    console.warn(`[POST] /gameConsoles - Invalid or missing manufacturer`);
    return res.status(400).json({ error: 'Manufacturer is required and must be a non-empty string.' });
  }
  
  // Validate field length (max 25 characters as per schema)
  if (name.trim().length > 25) {
    console.warn(`[POST] /gameConsoles - Name too long`);
    return res.status(400).json({ error: 'Name must be 25 characters or less.' });
  }
  
  if (manufacturer.trim().length > 25) {
    console.warn(`[POST] /gameConsoles - Manufacturer too long`);
    return res.status(400).json({ error: 'Manufacturer must be 25 characters or less.' });
  }
  
  try {
    const gameConsole = await gameConsolesService.createGameConsole({
      name: name.trim(),
      manufacturer: manufacturer.trim()
    });
    console.log(`[POST] /gameConsoles - Created game console with ID ${gameConsole.id}`);
    res.status(201).json(gameConsole);
  } catch (error) {
    console.error(`[POST] /gameConsoles - Error:`, error);
    res.status(500).json({ error: 'Failed to create game console.' });
  }
}

async function updateGameConsoleById(req, res) {
  const { name, manufacturer } = req.body;
  
  // Validate name field if provided
  if (name !== undefined) {
    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      console.warn(`[PUT] /gameConsoles/${req.params.id} - Invalid name`);
      return res.status(400).json({ error: 'Name must be a non-empty string.' });
    }
    if (name.trim().length > 25) {
      console.warn(`[PUT] /gameConsoles/${req.params.id} - Name too long`);
      return res.status(400).json({ error: 'Name must be 25 characters or less.' });
    }
  }
  
  // Validate manufacturer field if provided
  if (manufacturer !== undefined) {
    if (!manufacturer || typeof manufacturer !== 'string' || manufacturer.trim().length === 0) {
      console.warn(`[PUT] /gameConsoles/${req.params.id} - Invalid manufacturer`);
      return res.status(400).json({ error: 'Manufacturer must be a non-empty string.' });
    }
    if (manufacturer.trim().length > 25) {
      console.warn(`[PUT] /gameConsoles/${req.params.id} - Manufacturer too long`);
      return res.status(400).json({ error: 'Manufacturer must be 25 characters or less.' });
    }
  }
  
  try {
    // Prepare update data with trimmed values
    const updateData = {};
    if (name !== undefined) {
      updateData.name = name.trim();
    }
    if (manufacturer !== undefined) {
      updateData.manufacturer = manufacturer.trim();
    }
    
    const updated = await gameConsolesService.updateGameConsoleById(req.params.id, updateData);
    console.log(`[PUT] /gameConsoles/${req.params.id} - Updated game console`);
    res.json(updated);
  } catch (error) {
    if (error.code === 'P2025') {
      console.warn(`[PUT] /gameConsoles/${req.params.id} - Not found`);
      return res.status(404).json({ error: 'Game console not found.' });
    }
    console.error(`[PUT] /gameConsoles/${req.params.id} - Error:`, error);
    res.status(500).json({ error: 'Failed to update game console.' });
  }
}

async function deleteGameConsoleById(req, res) {
  try {
    await gameConsolesService.deleteGameConsoleById(req.params.id);
    console.log(`[DELETE] /gameConsoles/${req.params.id} - Deleted game console`);
    res.status(204).send();
  } catch (error) {
    if (error.code === 'P2025') {
      console.warn(`[DELETE] /gameConsoles/${req.params.id} - Not found`);
      return res.status(404).json({ error: 'Game console not found.' });
    }
    console.error(`[DELETE] /gameConsoles/${req.params.id} - Error:`, error);
    res.status(500).json({ error: 'Failed to delete game console.' });
  }
}

export { getGameConsoles, getGameConsoleById, createGameConsole, updateGameConsoleById, deleteGameConsoleById }; 