import "./Main.css";
import React from "react";

export default function Main() {
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

  return (
    <main>
      <form className="ingredient-form" action={addIngredient}>
        <input
          className="ingredient-inp"
          aria-label="Add ingredient"
          type="text"
          placeholder="e.g. milk"
          name="ingredient"
        />
        <button className="ingredient-add-btn" type="submit">
          + Add ingredient
        </button>
      </form>
      <ul className="ingredients-list">
        {ingredients.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </main>
  );
}
