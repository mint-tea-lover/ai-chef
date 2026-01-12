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
  const [ingredients, setIngredients] = React.useState(() => {
    const saved = localStorage.getItem("ingredients"); // берем ингредиенты из localSorage, если есть
    return saved ? JSON.parse(saved) : [];
  });
  const [recipe, setRecipe] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

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

  React.useEffect(() => {
    localStorage.setItem("ingredients", JSON.stringify(ingredients));
  }, [ingredients]); // сохраняем массив ingredients в localSorage при любом изменении

  function removeIngredient(ingredientName) {
    setIngredients((prev) => prev.filter((ing) => ing != ingredientName));
  }

  async function toggleRecipeShown() {
    setIsLoading(true); // начинаем загрузку
    setError(null);
    try {
      const recipeObject = await getRecipeFromAI(ingredients);
      setRecipe(recipeObject);
    } catch (err) {
      switch (err.message) {
        case "PARSE_ERROR":
          setError("AI returned a broken recipe. Please try again.");
          break;
        case "MODEL_REJECTED":
          setError(
            "AI couldn't process your ingrediends. Change the list and try again."
          );
          break;
        case "RATE_LIMIT":
          setError("Too many requests. Wait a minute and try again.");
          break;
        case "BAD_REQUEST":
          setError("Bad request.");
          break;
        default:
          setError(
            "Couldn't connect the AI assistant. Check your internet connection and try again."
          );
      }
    } finally {
      setIsLoading(false); // заканчиваем загрузку
    }
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
      {/* Если ошибка - выводим ошибку */}
      {error && <div className="error-message">{error}</div>}{" "}
      {/* Рендерим рецепт только если ошибки нет */}
      {!error && recipe && <Recipe recipeData={recipe} />}
    </main>
  );
}
