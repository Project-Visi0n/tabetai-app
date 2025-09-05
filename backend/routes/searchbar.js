import express from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();
const apiKey = process.env.REACT_APP_SPOONACULAR_API_KEY || process.env.SPOONACULAR_API_KEY;

// Search recipes by ingredients
router.get('/recipes', async (req, res) => {
  const { ingredients } = req.query;
  if (!ingredients) return res.status(400).json({ error: 'Missing ingredients' });
  if (!apiKey) return res.status(500).json({ error: 'Spoonacular API key is missing on server.' });
  const url = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${encodeURIComponent(ingredients)}&number=5&ranking=1&ignorePantry=true&apiKey=${apiKey}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      const errorText = await response.text();
      return res.status(response.status).json({ error: 'API error', details: errorText });
    }
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch recipes.', details: err.message });
  }
});

// Get recipe details by ID
router.get('/recipes/:id', async (req, res) => {
  const { id } = req.params;
  const url = `https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}`;
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('API error');
    const data = await response.json();
    res.json(data);
  } catch {
    res.status(500).json({ error: 'Failed to fetch recipe details.' });
  }
});

export default router;
