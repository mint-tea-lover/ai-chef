import "./IngredientsList.css";

export default function IngredientsList({ ingredientsData, onDelete }) {
  const ingredientsListItems = ingredientsData.map((item) => (
    <li key={item}>
      {item}
      <button
        className="remove-ingredient-btn"
        aria-label={`Remove ${item}`}
        onClick={() => onDelete(item)}
      >
        ×
      </button>
    </li>
  ));

  return (
    <>
      {ingredientsData.length > 0 ? (
        <ul className="ingredients-list">{ingredientsListItems}</ul>
      ) : (
        <p className="no-ingredients-msg">You haven't added any ingredients</p>
      )}
    </>
  );
}
