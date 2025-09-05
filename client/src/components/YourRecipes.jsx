import React, { useEffect, useState } from "react";
import CustomRecipeCard from "./CustomRecipeCard";
import { Link } from "react-router-dom";
import SpoonacularRecipeCard from "./SpoonacularRecipeCard";

function YourRecipes() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCard, setShowCard] = useState(false);
  const [cardRecipe, setCardRecipe] = useState(null);

  useEffect(() => {
    fetch("/api/recipes")
      .then(res => res.json())
      .then(data => {
        setRecipes(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="flex justify-center items-center min-h-screen pt-16 sm:pt-20">Loading...</div>;
  if (!recipes.length) return (
    <div className="text-center mt-8 pt-16 sm:pt-20 px-4">
      <p className="text-lg text-fridgeText">No recipes found.</p>
      <Link to="/create-recipe" className="inline-block mt-4 bg-yellow hover:bg-yellow-300 text-fridgeText px-4 py-2 rounded-lg transition-colors">
        Create your first recipe!
      </Link>
    </div>
  );

  return (
    <>
      <div className="min-h-screen pt-16 sm:pt-20 px-4 sm:px-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-fridgeText mb-6 text-center">Your Recipes</h1>
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {recipes.map(recipe => (
            <div key={recipe._id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden relative">
              <Link to={`/recipes/${recipe._id}`}>
                <img src={recipe.image} alt={recipe.title} className="w-full h-32 sm:h-40 object-cover" />
                <div className="p-3 sm:p-4">
                  <h3 className="font-bold text-sm sm:text-lg mb-1 text-fridgeText line-clamp-2">{recipe.title}</h3>
                  <div className="text-gray-600 text-xs sm:text-sm mb-2">
                    ⏱ {recipe.readyInMinutes} min &nbsp;|&nbsp; 🍽 {recipe.servings} servings
                  </div>
                  <div className="truncate text-xs text-gray-500 mb-2">
                    {recipe.ingredients && recipe.ingredients.map(ing => ing.name).join(", ")}
                  </div>
                </div>
              </Link>
              <button
                className="absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded text-xs shadow hover:bg-yellow-600 touch-manipulation"
                onClick={() => window.location.href = `/edit-recipe/${recipe._id}`}
              >
                Edit
              </button>
            </div>
          ))}
        </div>
      </div>
      {showCard && cardRecipe && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 max-w-lg w-full relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-xl touch-manipulation"
              onClick={() => setShowCard(false)}
            >
              ×
            </button>
            <h2 className="text-lg sm:text-xl font-bold mb-2">Spoonacular Recipe Card</h2>
            <SpoonacularRecipeCard
              title={cardRecipe.title}
              ingredients={cardRecipe.ingredients}
              instructions={cardRecipe.instructions}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default YourRecipes;
