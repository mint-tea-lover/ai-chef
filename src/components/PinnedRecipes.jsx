export default function PinnedRecipes({ recipesList, onSelect, onRemove }) {
  if (recipesList.length === 0) return null;

  return (
    <section className="pinned-recipes">
      <h3>Pinned Recipes</h3>
      <ul>
        {recipesList.map((recipe) => (
          <li key={recipe.id}>
            <button
              aria-label={`See recipe ${recipe.title}`}
              onClick={() => onSelect(recipe.id)}
            >
              {recipe.title}
            </button>
            <button
              aria-label={`Unpin recipe ${recipe.title}`}
              onClick={() => onRemove(recipe.id)}
            >
              x
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
