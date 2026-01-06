export default function IngredientsList({ ingredientsData }) {
  const ingredientsListItems = ingredientsData.map((item) => (
    <li key={item}>{item}</li>
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
