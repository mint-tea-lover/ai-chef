import "./Recipe.css";

export default function Recipe({ recipeData }) {
  return (
    <div className="recipe-card">
      <h2>{recipeData.title}</h2>
      <p>{recipeData.description}</p>
      <h3>Ingredients:</h3>
      <ul className="recipe-ingredients">
        {recipeData.ingredients?.map((item, index) => {
          const [ingr, quantity] = item.split("-");
          return (
            <li key={index}>
              <span>{ingr}</span>
              <span>{quantity}</span>
            </li>
          );
        })}
      </ul>
      <h3>Steps:</h3>
      <ol className="recipe-instructions">
        {recipeData.instructions?.map((step, index) => (
          <li key={index}>{step}</li>
        ))}
      </ol>
    </div>
  );
}
