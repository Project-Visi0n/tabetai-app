import express from 'express';
import User from '../models/User.js';

const router = express.Router();

// GET /api/users/test - Simple route check
router.get('/test', (req, res) => {
  res.send('User route is working!');
});

// POST /api/users/register - Register a new user
router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    // Check if user exists
    const existingUser = await User.findOne({ username });
    if (existingUser) return res.status(400).json({ message: 'Username already exists' });

    const user = new User({ username, password });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/users/login - Login a user
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    let user = await User.findOne({ username });
    if (!user) {
      // Auto-register new user if not found
      user = new User({ username, password });
      await user.save();
      return res.status(201).json({ message: 'User registered and logged in', user: { id: user._id, username: user.username } });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    res.json({ message: 'Login successful', user: { id: user._id, username: user.username } });
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/users/google-login - Login or register a Google user
router.post('/google-login', async (req, res) => {
  try {
    const { profile } = req.body;
    if (!profile || !profile.sub) {
      return res.status(400).json({ message: 'Invalid Google profile' });
    }
    // Try to find user by Google ID
    let user = await User.findOne({ googleId: profile.sub });
    if (!user) {
      // If not found, create a new user
      user = new User({
        googleId: profile.sub,
        name: profile.name,
        email: profile.email,
        // Optionally add more fields from profile
      });
      await user.save();
    }
    res.json({
      message: 'Google login successful',
      user: {
        id: user._id,
        googleId: user.googleId,
        name: user.name,
        email: user.email
      }
    });
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
});

// Add a Spoonacular recipe to favorites
router.post("/:userId/favorites", async (req, res) => {
  const { userId } = req.params;
  const recipe = req.body.recipe; // { id, title, image, ... }
  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { $addToSet: { favorites: recipe } }, // prevents duplicates
      { new: true }
    );
    res.status(200).json(user.favorites);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all favorite recipes for a user
router.get("/:userId/favorites", async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId);
    res.status(200).json(user.favorites);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Remove a favorite recipe 
router.delete("/:userId/favorites/:recipeId", async (req, res) => {
  const { userId, recipeId } = req.params;
  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { $pull: { favorites: { id: recipeId } } },
      { new: true }
    );
    res.status(200).json(user.favorites);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
