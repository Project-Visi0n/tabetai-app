import React from "react";

function FavoriteRecipes() {
  const recipes = ["Gumbo", "Avocado Toast", "Mac & Cheese"];

  return (
    <div>
      <h1>My Favorite Recipes</h1>
      <ul>
        {recipes.map((recipe, index) => (
          <li key={index}>{recipe}</li>
        ))}
      </ul>
    </div>
  );
}

export default FavoriteRecipes;
