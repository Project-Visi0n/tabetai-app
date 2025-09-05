import React from "react";

function RecipeCard({ recipe, isFavorite, onFavoriteToggle, onClick }) {
  return (
    <div className="bg-white rounded-lg shadow p-3 sm:p-4 flex flex-col items-center hover:bg-lavender transition-colors w-full max-w-xs mx-auto min-h-[140px] sm:min-h-[160px]">
      <img
        src={recipe.image}
        alt={recipe.title}
        className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded-lg mb-2 cursor-pointer"
        onClick={onClick}
        tabIndex={0}
        role="button"
        aria-label={`View details for ${recipe.title}`}
      />
      <span
        className="font-semibold text-center text-xs sm:text-sm leading-tight cursor-pointer flex-1 flex items-center px-1"
        onClick={onClick}
        tabIndex={0}
        role="button"
        aria-label={`View details for ${recipe.title}`}
      >
        {recipe.title}
      </span>
      <button
        type="button"
        onClick={e => {
          e.stopPropagation();
          onFavoriteToggle(recipe, isFavorite);
        }}
        className={`mt-2 text-xl sm:text-2xl ${isFavorite ? "text-lavender" : "text-gray-300"} touch-manipulation`}
        aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        tabIndex={0}
        style={{ cursor: "pointer" }}
      >
        ★
      </button>
    </div>
  );
}

export default RecipeCard;
