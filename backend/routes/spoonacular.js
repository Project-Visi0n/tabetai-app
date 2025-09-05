import express from 'express';
const router = express.Router();
import fetch from 'node-fetch';
import dotenv from 'dotenv';
dotenv.config();

// GET /api/spoonacular/recipes - Search recipes by ingredients
router.get('/recipes', async (req, res) => {
  try {
    const apiKey = process.env.SPOONACULAR_API_KEY || process.env.REACT_APP_SPOONACULAR_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: 'Spoonacular API key not set' });
    }

    const { ingredients, number = 12 } = req.query;
    if (!ingredients) {
      return res.status(400).json({ error: 'Ingredients parameter is required' });
    }

    const url = `https://api.spoonacular.com/recipes/findByIngredients?apiKey=${apiKey}&ingredients=${encodeURIComponent(ingredients)}&number=${number}&ignorePantry=true`;
    
    const spoonacularRes = await fetch(url);
    if (!spoonacularRes.ok) {
      const errorText = await spoonacularRes.text();
      return res.status(spoonacularRes.status).json({ error: errorText });
    }

    const data = await spoonacularRes.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/spoonacular/recipes/:id - Get detailed recipe information
router.get('/recipes/:id', async (req, res) => {
  try {
    const apiKey = process.env.SPOONACULAR_API_KEY || process.env.REACT_APP_SPOONACULAR_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: 'Spoonacular API key not set' });
    }

    const { id } = req.params;
    const url = `https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}&includeNutrition=false`;
    
    const spoonacularRes = await fetch(url);
    if (!spoonacularRes.ok) {
      const errorText = await spoonacularRes.text();
      return res.status(spoonacularRes.status).json({ error: errorText });
    }

    const data = await spoonacularRes.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/spoonacular/visualizeRecipe
router.post('/visualizeRecipe', async (req, res) => {
  try {
    const apiKey = process.env.SPOONACULAR_API_KEY || process.env.REACT_APP_SPOONACULAR_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: 'Spoonacular API key not set' });
    }
    
    // Get the raw body as string
    const bodyData = req.body ? req.body.toString() : '';
    
    const spoonacularRes = await fetch(`https://api.spoonacular.com/recipes/visualizeRecipe?apiKey=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'image/png, application/json, text/html'
      },
      body: bodyData
    });
    
    if (!spoonacularRes.ok) {
      const errorText = await spoonacularRes.text();
      return res.status(spoonacularRes.status).send(errorText);
    }
    
    // Forward the image/png response
    res.set('Content-Type', 'image/png');
    spoonacularRes.body.pipe(res);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
