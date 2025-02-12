import React, {useState} from 'react';

function RecipeGenerator() {

    const [ingredients, setIngredients] = useState('');
    const [cuisine, setCuisine] = useState('any');
    const [dietaryRestrictions, setDietaryRestrictions] = useState('none');
    const [recipe, setRecipe] = useState('');
    const generateRecipe = async () => {
        try{
            const response = await fetch(`http://localhost:8080/createRecipe?ingredients=${ingredients}&cuisine=${cuisine}&diet=${dietaryRestrictions}`);
            const data = await response.text();
            setRecipe(data);
            console.log(data);
        }
        catch(error){
            console.error(error);
        }
    }

    return (
        <div>
            <h1>Recipe Generator</h1>
            <p>Generate recipes based on your preferences.</p>
            <input type="text"
                value = {ingredients}
                onChange={(e) => setIngredients(e.target.value)}
                placeholder={"Enter ingredients (comma separated)"}
            />
            <input type="text"
                value={cuisine}
                onChange={(e) => setCuisine(e.target.value)}
                placeholder={"Enter cuisine"}
            />
            <input type="text"
                value={dietaryRestrictions}
                onChange={(e) => setDietaryRestrictions(e.target.value)}
                placeholder={"Enter dietary restrictions"}
            />
            <button onClick={generateRecipe}> Generate Recipe</button>
            <div className="output">
                <pre className="recipe-text">{recipe}</pre>
            </div>
        </div>
    );
}

export default RecipeGenerator;