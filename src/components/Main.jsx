import "./Main.css";
import React from "react";

export default function Main() {
  const minIngredientsCount = 3;
  const [ingredients, setIngredients] = React.useState([]);

  function addIngredient(formData) {
    const newIngredient = formData.get("ingredient");
    setIngredients((prevIngredients) => {
      if (prevIngredients.includes(newIngredient)) {
        return prevIngredients;
      }
      return [...prevIngredients, newIngredient];
    });
  }

  const ingredientsListItems = ingredients.map((item) => (
    <li key={item}>{item}</li>
  ));

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
        {ingredients.length > 0 ? (
          <ul className="ingredients-list">{ingredientsListItems}</ul>
        ) : (
          <p className="no-ingredients-msg">
            You haven't added any ingredients
          </p>
        )}

        <div className="get-recipe-container">
          {ingredients.length >= minIngredientsCount ? (
            <div>
              <h3>Ready for a recipe?</h3>
              <p>Generate a recipe from your list of ingredients</p>
            </div>
          ) : (
            <div>
              <h3>Add at least {minIngredientsCount} to get a recipe</h3>
            </div>
          )}

          <button
            className="get-recipe-btn"
            disabled={ingredients.length < minIngredientsCount}
          >
            Get a recipe
          </button>
        </div>
      </section>
    </main>
  );
}
