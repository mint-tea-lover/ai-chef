import "./Main.css";
import React from "react";
import Recipe from "./Recipe";
import IngredientsList from "./IngredientsList";
import { getRecipeFromAI } from "../ai";

function RecipeCTA({ minReached, toggleRecipe, isLoading }) {
  return (
    <>
      <div className="get-recipe-container">
        <div>
          <h3>
            {minReached ? "Ready for a recipe?" : "Need more ingredients"}
          </h3>
          <p>
            {minReached
              ? "Generate a recipe from your list"
              : "Add more to get a personal recipe"}
          </p>
        </div>
        <button
          className="get-recipe-btn"
          disabled={!minReached || isLoading}
          onClick={toggleRecipe}
        >
          Get a recipe
        </button>
        {isLoading && <p className="loading">Generating...</p>}
      </div>
    </>
  );
}

export default function Main() {
  const minIngredientsCount = 3;
  const [ingredients, setIngredients] = React.useState([]);
  const [recipe, setRecipe] = React.useState(""); // здесь храним текст рецепта
  const [isLoading, setIsLoading] = React.useState(false);

  function addIngredient(formData) {
    const newIngredient = formData.get("ingredient").trim();
    if (!newIngredient) return;
    setIngredients((prev) => {
      const isDuplicate = prev.some(
        (ing) => ing.toLowerCase() === newIngredient.toLowerCase()
      );
      return isDuplicate && newIngredient ? prev : [...prev, newIngredient];
    });
  }

  function removeIngredient(ingredientName) {
    setIngredients((prev) => prev.filter((ing) => ing != ingredientName));
  }

  async function toggleRecipeShown() {
    setIsLoading(true); // начинаем загрузку
    const generatedRecipe = await getRecipeFromAI(ingredients);
    setRecipe(generatedRecipe);
    setIsLoading(false); // заканчиваем загрузку
  }

  return (
    <main>
      <form className="ingredient-form" action={addIngredient}>
        <input
          className="ingredient-inp"
          aria-label="Add ingredient"
          type="text"
          placeholder="e.g. milk"
          name="ingredient"
          required
        />
        <button className="ingredient-add-btn" type="submit">
          + Add ingredient
        </button>
      </form>
      <section>
        <h2>Ingredients on hand:</h2>
        <IngredientsList
          ingredientsData={ingredients}
          onDelete={removeIngredient}
        />

        {ingredients.length > 0 && (
          <RecipeCTA
            minReached={ingredients.length >= minIngredientsCount}
            toggleRecipe={toggleRecipeShown}
            isLoading={isLoading}
          />
        )}
      </section>
      {recipe && <Recipe text={recipe} />}
    </main>
  );
}
