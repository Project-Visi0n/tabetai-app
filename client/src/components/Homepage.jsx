import React, { useState, useEffect } from "react";
import EmojiRainbow from "./EmojiRainbow";
import { useNavigate } from "react-router-dom";
import RecipeCard from "./RecipeCard";
import { useUser } from "../UserContext";

function HomePage() {
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState("");
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();
  const { user } = useUser();

  // Fetch favorites when user changes
  useEffect(() => {
    if (!user?.id) return;
    fetch(`/api/users/${user.id}/favorites`)
      .then((res) => res.json())
      .then(favs => {
        setFavorites(favs || []);
        setRecipes(prevRecipes => prevRecipes.map(r => ({
          ...r,
          favorite: favs.some(fav => fav.id == r.id)
        })));
      });
  }, [user]);

  const handleSearch = async () => {
    setError("");
    setRecipes([]);
    
    if (!query.trim()) return;
    
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
    if (!user?.id) return;
    if (isFavorite) {
      // Remove from favorites
      setRecipes(prev => prev.map(r =>
        r.id == recipe.id ? { ...r, favorite: false } : r
      ));
      await fetch(`/api/users/${user.id}/favorites/${recipe.id}`, {
        method: "DELETE",
      });
    } else {
      // Add to favorites
      setRecipes(prev => prev.map(r =>
        r.id == recipe.id ? { ...r, favorite: true } : r
      ));
      await fetch(`/api/users/${user.id}/favorites`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ recipe }),
      });
    }
    // Refresh favorites
    fetch(`/api/users/${user.id}/favorites`)
      .then((res) => res.json())
      .then(favs => {
        setFavorites(favs || []);
        setRecipes(prevRecipes => prevRecipes.map(r => ({
          ...r,
          favorite: favs.some(fav => fav.id == r.id)
        })));
      });
  };

  return (
    <>
      {/* ----- Full‑screen "kitchen" backdrop ----- */}
      <div className="min-h-screen bg-orange-200 pt-16 sm:pt-20 flex flex-col items-center justify-center px-4">
        {/* ----- Fridge box ----- */}
        <div className="w-full max-w-[400px] h-[650px] sm:h-[700px] bg-green-200 rounded-[3rem] border-8 sm:border-[12px] border-white shadow-[0_10px_40px_rgba(0,0,0,0.2)] flex flex-col relative px-4 sm:px-6 pt-8 sm:pt-10 pb-6 mb-8">
          {/* Emoji Rainbow inside fridge */}
          <EmojiRainbow />

          {/* Fridge Handle */}
          <div className="absolute left-[6px] sm:left-[8px] top-1/2 -translate-y-1/2 w-[60px] sm:w-[90px] h-[10px] sm:h-[12px] bg-white border border-gray-800 rounded-full shadow-md" />

          {/* Logo + Tagline */}
          <div className="flex flex-col items-center mb-2">
            <h2 className="text-gray-800 text-4xl sm:text-5xl md:text-6xl font-bold tracking-[0.1em] text-center mb-1">
              TABETAI
            </h2>
            <p className="text-gray-800 text-base sm:text-lg text-center">I want to eat!</p>
          </div>

          {/* Spacer pushes search to the bottom */}
          <div className="flex-1" />

          {/* Phrase + SearchBar */}
          <div className="flex flex-col items-center gap-2 mb-6">
            <p className="text-fridgeText text-sm md:text-base text-center font-medium px-2">
              Tell me what you have, I&apos;ll do the rest.
            </p>
            <p className="text-fridgeText text-xs md:text-sm text-center italic px-2">
              Separate your ingredients with commas — like &quot;eggs, milk, cheese&quot;
            </p>

            {/* Search Bar - Only search input, no results */}
            <div className="flex justify-center mb-6 w-full px-2">
              <div className="w-full max-w-sm">
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-0">
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
              </div>
            </div>
          </div>
        </div> {/* close fridge box */}

        {/* Recipe Results Section - Outside the fridge */}
        {(recipes.length > 0 || error) && (
          <div className="w-full max-w-6xl px-4">
            <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-4 sm:p-6">
              <h3 className="text-xl sm:text-2xl font-bold text-fridgeText text-center mb-6">
                Recipe Suggestions
              </h3>
              {error && <div className="text-red-500 text-center mb-4">{error}</div>}
              <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
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
          </div>
        )}
      </div> {/* close kitchen backdrop */}
    </>
  );
}

export default HomePage;
