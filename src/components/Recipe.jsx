import "./Recipe.css";

export default function Recipe({ responseFromAI }) {
  function cleanAndParseJSON(rawResponse) {
    try {
      const jsonMatch = rawResponse.match(/\{[\s\S]*\}/);
      if (!jsonMatch) return null;
      return JSON.parse(jsonMatch[0]);
    } catch (error) {
      console.error("Error while JSON parcing");
      return null;
    }
  }

  const recipe = cleanAndParseJSON(responseFromAI);

  if (!recipe) {
    return (
      <div className="recipe-card">
        <h2>Oops!</h2>
        <p>
          Something went wrong while formatting the recipe. Please try again.
        </p>
      </div>
    );
  }

  return (
    <div className="recipe-card">
      <h2>{recipe.title}</h2>
      <p>{recipe.description}</p>
      <h3>Ingredients:</h3>
      <ul className="recipe-ingredients">
        {recipe.ingredients?.map((item) => {
          const [ingr, quantity] = item.split("-");
          return (
            <li>
              <span>{ingr}</span>
              <span>{quantity}</span>
            </li>
          );
        })}
      </ul>
      <h3>Steps:</h3>
      <ol className="recipe-instructions">
        {recipe.instructions?.map((step) => (
          <li>{step}</li>
        ))}
      </ol>
    </div>
  );
}
