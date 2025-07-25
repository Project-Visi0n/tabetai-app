import express from 'express';
const router = express.Router();
import fetch from 'node-fetch';
import dotenv from 'dotenv';
dotenv.config();

// POST /api/spoonacular/visualizeRecipe
router.post('/visualizeRecipe', express.raw({ type: 'application/x-www-form-urlencoded' }), async (req, res) => {
  try {
    const apiKey = process.env.SPOONACULAR_API_KEY || process.env.REACT_APP_SPOONACULAR_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: 'Spoonacular API key not set' });
    }
    // Forward the raw Buffer body and set Content-Length
    const contentLength = req.body.length;
    const spoonacularRes = await fetch(`https://api.spoonacular.com/recipes/visualizeRecipe?apiKey=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'image/png, application/json, text/html',
        'Content-Length': contentLength
      },
      body: req.body
    });
    if (!spoonacularRes.ok) {
      const errorText = await spoonacularRes.text();
      return res.status(spoonacularRes.status).send(errorText);
    }
    // Forward the image/png response
    res.set('Content-Type', 'image/png');
    spoonacularRes.body.pipe(res);
  } catch (err) {
    console.error('Spoonacular proxy error:', err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
