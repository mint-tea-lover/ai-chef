import "./Main.css";
import React from "react";
import Recipe from "./Recipe";
import IngredientsList from "./IngredientsList";
import RecipeCTA from "./RecipeCTA";
("./RecipeCTA");
import { getRecipeFromAI } from "../ai";
import PinnedRecipes from "./PinnedRecipes";

export default function Main() {
  const minIngredientsCount = 3;
  const [ingredients, setIngredients] = React.useState(() => {
    const saved = localStorage.getItem("ingredients"); // берем ингредиенты из localSorage, если есть
    return saved ? JSON.parse(saved) : [];
  });
  const [recipe, setRecipe] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [pinnedRecipes, setPinnedRecipes] = React.useState(
    () => JSON.parse(localStorage.getItem("pinnedRecipes")) || []
  );

  // Синхронизация с LocalStorage
  React.useEffect(() => {
    localStorage.setItem("ingredients", JSON.stringify(ingredients));
  }, [ingredients]);

  React.useEffect(() => {
    localStorage.setItem("pinnedRecipes", JSON.stringify(pinnedRecipes));
  }, [pinnedRecipes]);

  // Работа с ингредиентами
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

  // Работа с закрепами
  function pinRecipe(newRecipe) {
    if (pinnedRecipes.some((r) => r.id === newRecipe.id)) return;
    setPinnedRecipes((prev) => [...prev, newRecipe]);
  }

  function unpinRecipe(id) {
    setPinnedRecipes((prev) => prev.filter((r) => r.id !== id));
  }

  const isCurrentRecipePinned = pinnedRecipes.some((r) => r.id === recipe?.id);

  // Генерация рецепта
  async function generateRecipe() {
    setIsLoading(true); // начинаем загрузку
    setError(null);
    try {
      let recipeObject = await getRecipeFromAI(ingredients);
      recipeObject = {
        ...recipeObject,
        id: crypto.randomUUID(), // добавляем уникальный id
      };
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
            toggleRecipe={generateRecipe}
            isLoading={isLoading}
          />
        )}
      </section>
      {error && <div className="error-message">{error}</div>}{" "}
      {!error && recipe && (
        <Recipe
          recipeData={recipe}
          onPin={pinRecipe}
          onUnpin={unpinRecipe}
          isPinned={isCurrentRecipePinned}
        />
      )}
    </main>
  );
}
