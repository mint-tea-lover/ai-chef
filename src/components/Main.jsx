import "./Main.css";

export default function Main() {
  return (
    <main>
      <form className="ingredient-form">
        <input
          className="ingredient-inp"
          aria-label="Add ingredient"
          type="text"
          placeholder="e.g. milk"
          id="ingredient-inp"
        />
        <button className="ingredient-add-btn" type="submit">
          + Add ingredient
        </button>
      </form>
      dsgdf
    </main>
  );
}
