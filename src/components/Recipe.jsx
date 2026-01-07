import "./Recipe.css";

export default function Recipe({ responseFromAI }) {
  function cleanAndParseJSON(rawResponse) {
    try {
      const cleaned = rawResponse
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

      return JSON.parse(cleaned);
    } catch (error) {
      console.error("Ошибка парсинга JSON:", error);
      return null;
    }
  }

  const recipe = cleanAndParseJSON(responseFromAI);

  return (
    <div className="recipe-card">
      <h2>{recipe.title}</h2>
      <h3>Ingredients:</h3>
      <ul className="recipe-ingredients">
        {recipe.ingredients.map((item) => {
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
        {recipe.instructions.map((step) => (
          <li>{step}</li>
        ))}
      </ol>
    </div>
  );
}
