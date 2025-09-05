import dotenv from 'dotenv';
dotenv.config();

import './db/index.js';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the React app in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'public')));
} else {
  // In development, serve static files from client/dist
  app.use(express.static(path.join(__dirname, '..', 'client', 'dist')));
}

// Always serve favicon from the public directory
app.get('/favicon.ico', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'favicon.ico'));
});

// Register routes
import searchbarRoutes from './routes/searchbar.js';
import recipeRoutes from './routes/recipes.js';
import spoonacularRouter from './routes/spoonacular.js';
import userRoutes from './routes/users.js';

app.use('/api/searchbar', searchbarRoutes);
app.use('/api/recipes', recipeRoutes);
app.use('/api/spoonacular', spoonacularRouter);
app.use('/api/users', userRoutes);

// Test endpoint
app.get('/api/test', (req, res) => {
  res.json({ message: 'Tabetai API is working!', timestamp: new Date().toISOString() });
});

// Serve React app for any non-API routes in production
if (process.env.NODE_ENV === 'production') {
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });
}

const PORT = process.env.PORT || 8080;
app.listen(PORT, '0.0.0.0', () => {
});