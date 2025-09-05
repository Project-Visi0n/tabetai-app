import React, { useState } from "react";

// Usage: <SpoonacularRecipeCard title="Pizza" ingredients={["cheese", "dough"]} instructions={["Bake it"]} />
function SpoonacularRecipeCard({ title, ingredients, instructions, image }) {
  const [cardUrl, setCardUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGenerate = async () => {
    setLoading(true);
    setError(null);
    setCardUrl(null);
    try {
      // Hardcoded, non-empty values for testing
      const params = new URLSearchParams({
        title: "Test Recipe",
        ingredients: "1 cup flour, 2 eggs, 1/2 cup milk",
        instructions: "Mix ingredients. Bake for 20 minutes. Let cool."
      });
      const res = await fetch("/api/spoonacular/visualizeRecipe", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Accept": "image/png, application/json, text/html"
        },
        body: params.toString()
      });
      if (!res.ok) {
        const errorText = await res.text();
        throw new Error("Failed to generate recipe card: " + errorText);
      }
      const blob = await res.blob();
      setCardUrl(URL.createObjectURL(blob));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="my-4">
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        onClick={handleGenerate}
        disabled={loading}
      >
        {loading ? "Generating..." : "Generate Recipe Card (Spoonacular)"}
      </button>
      {error && <div className="text-red-500 mt-2">{error}</div>}
      {cardUrl && (
        <div className="mt-4">
          <img src={cardUrl} alt="Recipe Card" className="w-full max-w-md mx-auto" />
        </div>
      )}
    </div>
  );
}

export default SpoonacularRecipeCard;
