import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomRecipeCard from "./CustomRecipeCard";

function CreateRecipePage() {
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState({
    title: "",
    image: "",
    ingredients: [{ name: "", quantity: "", unit: "" }],
    instructions: [""],
    readyInMinutes: "",
    servings: ""
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (field, value) => {
    setRecipe({ ...recipe, [field]: value });
  };

  const handleIngredientChange = (idx, field, value) => {
    const newIngredients = recipe.ingredients.map((ing, i) =>
      i === idx ? { ...ing, [field]: value } : ing
    );
    setRecipe({ ...recipe, ingredients: newIngredients });
  };

  const addIngredient = () =>
    setRecipe({
      ...recipe,
      ingredients: [...recipe.ingredients, { name: "", quantity: "", unit: "" }],
    });

  const removeIngredient = (idx) =>
    setRecipe({
      ...recipe,
      ingredients: recipe.ingredients.filter((_, i) => i !== idx),
    });

  const handleInstructionChange = (idx, value) => {
    const newInstructions = recipe.instructions.map((step, i) =>
      i === idx ? value : step
    );
    setRecipe({ ...recipe, instructions: newInstructions });
  };

  const addInstruction = () =>
    setRecipe({ ...recipe, instructions: [...recipe.instructions, ""] });

  const removeInstruction = (idx) =>
    setRecipe({
      ...recipe,
      instructions: recipe.instructions.filter((_, i) => i !== idx),
    });

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Filter out blank ingredients
    const filteredIngredients = recipe.ingredients.filter(ing => ing.name && ing.name.trim() !== "");
    // Filter out blank instructions
    const filteredInstructions = recipe.instructions.filter(step => step && step.trim() !== "");
    // Basic validation
    if (!recipe.title.trim()) {
      alert("Title is required.");
      setLoading(false);
      return;
    }
    if (filteredIngredients.length === 0) {
      alert("At least one ingredient with a name is required.");
      setLoading(false);
      return;
    }
    if (filteredInstructions.length === 0) {
      alert("At least one instruction is required.");
      setLoading(false);
      return;
    }
    const recipeToSend = {
      ...recipe,
      ingredients: filteredIngredients,
      instructions: filteredInstructions
    };
    try {
      const response = await fetch("/api/recipes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(recipeToSend),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create recipe");
      }
      alert("Recipe created!");
      navigate("/your-recipes");
    } catch (err) {
      alert("Error creating recipe: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-16 sm:pt-20 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-fridgeText">Create Recipe</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Form Section */}
          <form onSubmit={handleSave} className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
            <div className="space-y-4">
              <input
                className="w-full p-3 border rounded-lg text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-yellow-300"
                placeholder="Recipe Title"
                value={recipe.title}
                onChange={e => handleChange("title", e.target.value)}
              />
              <input
                className="w-full p-3 border rounded-lg text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-yellow-300"
                placeholder="Image URL"
                value={recipe.image}
                onChange={e => handleChange("image", e.target.value)}
              />
              
              {/* Ingredients Section */}
              <div>
                <label className="font-semibold text-sm sm:text-base mb-2 block">Ingredients</label>
                <div className="space-y-2">
                  {recipe.ingredients.map((ing, idx) => (
                    <div key={idx} className="grid grid-cols-3 sm:grid-cols-4 gap-2 items-center">
                      <input
                        className="p-2 border rounded text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-yellow-300"
                        value={ing.name}
                        onChange={e => handleIngredientChange(idx, "name", e.target.value)}
                        placeholder="Ingredient"
                      />
                      <input
                        className="p-2 border rounded text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-yellow-300"
                        value={ing.quantity}
                        onChange={e => handleIngredientChange(idx, "quantity", e.target.value)}
                        placeholder="Qty"
                      />
                      <input
                        className="p-2 border rounded text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-yellow-300"
                        value={ing.unit}
                        onChange={e => handleIngredientChange(idx, "unit", e.target.value)}
                        placeholder="Unit"
                      />
                      <button 
                        type="button" 
                        onClick={() => removeIngredient(idx)} 
                        className="text-red-500 text-lg hover:text-red-700 touch-manipulation p-1"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
                <button 
                  type="button" 
                  onClick={addIngredient} 
                  className="text-blue-500 text-sm mt-2 hover:text-blue-700 touch-manipulation"
                >
                  + Add Ingredient
                </button>
              </div>
              
              {/* Instructions Section */}
              <div>
                <label className="font-semibold text-sm sm:text-base mb-2 block">Instructions</label>
                <div className="space-y-2">
                  {recipe.instructions.map((step, idx) => (
                    <div key={idx} className="flex gap-2">
                      <div className="flex-shrink-0 w-6 h-6 bg-yellow-300 rounded-full flex items-center justify-center text-xs font-bold">
                        {idx + 1}
                      </div>
                      <textarea
                        className="flex-1 p-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-yellow-300 min-h-[80px]"
                        value={step}
                        onChange={e => handleInstructionChange(idx, e.target.value)}
                        placeholder={`Step ${idx + 1} instructions...`}
                      />
                      <button 
                        type="button" 
                        onClick={() => removeInstruction(idx)} 
                        className="text-red-500 hover:text-red-700 touch-manipulation p-1"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
                <button 
                  type="button" 
                  onClick={addInstruction} 
                  className="text-blue-500 text-sm mt-2 hover:text-blue-700 touch-manipulation"
                >
                  + Add Step
                </button>
              </div>
              
              {/* Recipe Details */}
              <div className="grid grid-cols-2 gap-4">
                <input
                  className="p-3 border rounded-lg text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-yellow-300"
                  type="number"
                  placeholder="Prep time (min)"
                  value={recipe.readyInMinutes}
                  onChange={e => handleChange("readyInMinutes", e.target.value)}
                />
                <input
                  className="p-3 border rounded-lg text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-yellow-300"
                  type="number"
                  placeholder="Servings"
                  value={recipe.servings}
                  onChange={e => handleChange("servings", e.target.value)}
                />
              </div>
              
              <button
                className="w-full bg-yellow-300 hover:bg-yellow-400 px-4 py-3 rounded-lg font-semibold transition-colors text-sm sm:text-base touch-manipulation"
                type="submit"
                disabled={loading}
              >
                {loading ? "Creating Recipe..." : "Create Recipe"}
              </button>
            </div>
          </form>
          
          {/* Preview Section */}
          <div className="bg-gray-50 rounded-lg p-4 sm:p-6">
            <h3 className="font-semibold text-lg mb-4 text-center">Recipe Preview</h3>
            <CustomRecipeCard recipe={recipe} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateRecipePage;
