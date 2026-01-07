import "./Main.css";
import React from "react";
import Recipe from "./Recipe";
import IngredientsList from "./IngredientsList";

function RecipeCTA({ minReached, toggleRecipe }) {
  return (
    <div className="get-recipe-container">
      <div>
        <h3>{minReached ? "Ready for a recipe?" : "Need more ingredients"}</h3>
        <p>
          {minReached
            ? "Generate a recipe from your list"
            : "Add more to get a personal recipe"}
        </p>
      </div>
      <button
        className="get-recipe-btn"
        disabled={!minReached}
        onClick={toggleRecipe}
      >
        Get a recipe
      </button>
    </div>
  );
}

export default function Main() {
  const minIngredientsCount = 3;
  const [ingredients, setIngredients] = React.useState([]);
  const [recipeShown, setRecipeShown] = React.useState(false);

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

  function toggleRecipeShown() {
    setRecipeShown((prev) => !prev);
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
          />
        )}
      </section>
      {recipeShown && <Recipe />}
    </main>
  );
}
