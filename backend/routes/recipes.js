import express from 'express';
import mongoose from 'mongoose';
import Recipe from '../models/Recipe.js';
import fetch from 'node-fetch';
const router = express.Router();
const SPOONACULAR_API_KEY = process.env.SPOONACULAR_API_KEY || 'YOUR_API_KEY';

// GET /api/recipes/:id
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid recipe ID' });
    }
    const recipe = await Recipe.findById(id);
    if (!recipe) {
      return res.status(404).json({ error: 'Recipe not found' });
    }
    res.json(recipe);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Spoonacular Recipe Card endpoint
// GET /api/recipes/:id/card
router.get('/:id/card', async (req, res) => {
  try {
    // Try to treat :id as a Spoonacular recipe ID (number)
    if (/^\d+$/.test(req.params.id)) {
      // Use Spoonacular's official recipe card endpoint
      const apiUrl = `https://api.spoonacular.com/recipes/${req.params.id}/card?apiKey=${SPOONACULAR_API_KEY}`;
      const apiRes = await fetch(apiUrl);
      if (!apiRes.ok) {
        return res.status(500).json({ error: 'Spoonacular API error' });
      }
      const data = await apiRes.json();
      if (data.url) {
        // Proxy the image
        const imgRes = await fetch(data.url);
        if (!imgRes.ok) return res.status(500).json({ error: 'Failed to fetch card image' });
        const buffer = await imgRes.buffer();
        res.set('Content-Type', 'image/png');
        return res.send(buffer);
      } else {
        return res.status(500).json({ error: 'No card URL returned from Spoonacular' });
      }
    }
    // Otherwise, treat as a custom recipe (from our DB)
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ error: 'Recipe not found' });
    const title = recipe.title;
    const ingredients = (recipe.ingredients || []).map(ing => ing.name || ing).join(', ');
    const instructions = (recipe.instructions || []).join('. ');
    const params = new URLSearchParams({
      title,
      ingredients,
      instructions,
      apiKey: SPOONACULAR_API_KEY
    });
    const apiUrl = `https://api.spoonacular.com/recipes/visualizeRecipe?${params.toString()}`;
    const apiRes = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });
    if (!apiRes.ok) {
      return res.status(500).json({ error: 'Failed to generate recipe card' });
    }
    const buffer = await apiRes.buffer();
    res.set('Content-Type', 'image/png');
    res.send(buffer);
  } catch {
    res.status(500).json({ error: 'Failed to generate recipe card' });
  }
});

//POST request (/api/recipes)

router.post('/', async (req, res) => {
  try {
    const newRecipe = await Recipe.create(req.body);
    res.status(201).json(newRecipe);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

//GET request (/api/recipes)
router.get('/', async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.status(200).json(recipes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
//Patch: give user the ability to update an existing recipe
router.patch("/:id", async (req, res) => {
  try {
    const updatedRecipe = await Recipe.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    if (!updatedRecipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }
    res.json(updatedRecipe);
  } catch {
    res.status(500).json({ error: "Failed to update recipe" });
  }
});


export default router;