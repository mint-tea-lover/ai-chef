import "./Main.css";
import React from "react";

export default function Main() {
  const [ingredients, setIngredients] = React.useState([
    "Chicken",
    "Tomatoes",
    "Oregano",
  ]);

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newIngredient = formData.get("ingredient");
    if (!ingredients.includes(newIngredient)) {
      setIngredients((prevIngredients) => [...prevIngredients, newIngredient]);
    }
    event.currentTarget.reset();
  }
  return (
    <main>
      <form className="ingredient-form" onSubmit={handleSubmit}>
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
