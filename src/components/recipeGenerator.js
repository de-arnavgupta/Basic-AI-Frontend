import React, { useState } from "react";

function RecipeGenerator() {
    const [ingredients, setIngredients] = useState('');
    const [cuisine, setCuisine] = useState('');
    const [dietaryRestrictions, setDietaryRestrictions] = useState('');
    const [recipe, setRecipe] = useState('');
    const [loading, setLoading] = useState(false);

    const generateRecipe = async () => {
        if (!ingredients.trim()) return;
        setLoading(true);
        try {
            const response = await fetch(`http://localhost:8080/createRecipe?ingredients=${encodeURIComponent(ingredients)}&cuisine=${encodeURIComponent(cuisine)}&diet=${encodeURIComponent(dietaryRestrictions)}`);
            const data = await response.text();
            setRecipe(data.replace(/<[^>]*>/g, "")); // Sanitize HTML response
        } catch (error) {
            setRecipe("Error generating recipe. Try again.");
        }
        setLoading(false);
    };

    return (
        <div className="recipe-container text-white p-6 bg-white/10 backdrop-blur-lg rounded-lg shadow-md">
            <h1 className="text-2xl font-semibold mb-4">Recipe Generator</h1>
            <p className="text-blue-200 mb-4">Generate recipes based on your preferences.</p>
            <input
                type="text"
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
                placeholder="Enter ingredients (comma separated)"
                className="w-full p-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3"
            />
            <input
                type="text"
                value={cuisine}
                onChange={(e) => setCuisine(e.target.value)}
                placeholder="Enter cuisine"
                className="w-full p-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3"
            />
            <input
                type="text"
                value={dietaryRestrictions}
                onChange={(e) => setDietaryRestrictions(e.target.value)}
                placeholder="Enter dietary restrictions"
                className="w-full p-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
            />
            <button
                onClick={generateRecipe}
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 px-6 rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
            >
                {loading ? "Generating..." : "Generate Recipe"}
            </button>
            <div className="output mt-6 p-4 rounded-lg bg-white/5 border border-white/10">
                <pre className="text-white whitespace-pre-wrap">{recipe}</pre>
            </div>
        </div>
    );
}

export default RecipeGenerator;
