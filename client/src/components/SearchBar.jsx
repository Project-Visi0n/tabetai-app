import React, { useState, useEffect } from "react";
import RecipeCard from "./RecipeCard";
import { useNavigate } from "react-router-dom";

function SearchBar({ userId, showResultsInline = true }) {
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  // Removed selectedRecipe state, navigation now handles card display
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [favorites, setFavorites] = useState([]);

  // Fetch favorites and merge into recipes
  useEffect(() => {
    if (!userId) return;
    fetch(`/api/users/${userId}/favorites`)
      .then((res) => res.json())
      .then(favs => {
        setFavorites(favs);
        setRecipes(prevRecipes => prevRecipes.map(r => ({
          ...r,
          favorite: favs.some(fav => fav.id == r.id)
        })));
      });
  }, [userId]);

  const handleSearch = async () => {
    setError("");
    setRecipes([]);
    // Removed setSelectedRecipe, navigation now handles card display
    try {
      const res = await fetch(
        `/api/spoonacular/recipes?ingredients=${encodeURIComponent(query)}`
      );
      if (!res.ok) throw new Error("API error");
      const data = await res.json();
      // Merge favorite state
      setRecipes(data.map(r => ({
        ...r,
        favorite: favorites.some(fav => fav.id == r.id)
      })));
    } catch {
      setError("Failed to fetch recipes.");
    }
  };

  const handleRecipeClick = (id) => {
    navigate(`/recipe-card/${id}`);
  };

  const handleFavorite = async (recipe, isFavorite) => {
    if (!userId) return;
    if (isFavorite) {
      // Remove from favorites
      setRecipes(prev => prev.map(r =>
        r.id == recipe.id ? { ...r, favorite: false } : r
      ));
      await fetch(`/api/users/${userId}/favorites/${recipe.id}`, {
        method: "DELETE",
      });
    } else {
      // Add to favorites
      setRecipes(prev => prev.map(r =>
        r.id == recipe.id ? { ...r, favorite: true } : r
      ));
      await fetch(`/api/users/${userId}/favorites`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ recipe }),
      });
    }
    // Refresh favorites and merge
    fetch(`/api/users/${userId}/favorites`)
      .then((res) => res.json())
      .then(favs => {
        setFavorites(favs);
        setRecipes(prevRecipes => prevRecipes.map(r => ({
          ...r,
          favorite: favs.some(fav => fav.id == r.id)
        })));
      });
  };



  return (
    <div className="w-full max-w-sm">
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-0 mb-4">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSearch();
            }
          }}
          placeholder="What's in your fridge?"
          className="px-3 py-2 rounded-lg sm:rounded-l-lg sm:rounded-r-none border border-fridgeText text-fridgeText placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-fridgeText w-full text-sm"
        />
        <button
          type="button"
          onClick={handleSearch}
          className="bg-white text-fridgeText font-semibold px-4 py-2 border border-fridgeText rounded-lg sm:rounded-l-none sm:rounded-r-lg sm:border-l-0 hover:bg-gray-100 transition-colors text-sm whitespace-nowrap"
        >
          Let&apos;s take a look
        </button>
      </div>
      {showResultsInline && (
        <div className="mt-4">
          {error && <div className="text-red-500 text-center mb-2">{error}</div>}
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {recipes.map((recipe) => (
              <li key={recipe.id}>
                <RecipeCard
                  recipe={recipe}
                  isFavorite={recipe.favorite}
                  onFavoriteToggle={handleFavorite}
                  onClick={() => handleRecipeClick(recipe.id)}
                />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default SearchBar;
