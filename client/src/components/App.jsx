import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import HomePage from "./Homepage";
import FavoriteRecipes from "./FavoriteRecipes";
import LoginPage from "./LoginPage";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useUser } from "../UserContext";
import RecipeCardPage from "./RecipeCards/RecipeCardPage";
import YourRecipes from "./YourRecipes";
import RecipeDetailPage from "./RecipeDetailPage";
import CreateRecipePage from "./CreateRecipePage";

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID || process.env.GOOGLE_CLIENT_ID;

function App() {
  const { user, setUser } = useUser();
  const [error, setError] = useState(null);

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/favorites" element={<FavoriteRecipes />} />
          <Route path="/login" element={<LoginPage onLogin={setUser} error={error} setError={setError} />} />
          <Route path="/recipe-card/:id" element={<RecipeCardPage />} />
          <Route path="/create-recipe" element={<CreateRecipePage />} />
      <Route path="/your-recipes" element={<YourRecipes />} />
      <Route path="/recipes/:id" element={<RecipeDetailPage />} />
        </Route>
      </Routes>
    </GoogleOAuthProvider>
  );
}

export default App;
