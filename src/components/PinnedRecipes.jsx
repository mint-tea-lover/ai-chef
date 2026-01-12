export default function PinnedRecipes({ recipesList, onSelect, onRemove }) {
  if (recipesList.length === 0) return null;

  return (
    <section className="pinned-recipes">
      <h3>Pinned Recipes</h3>
      <ul>
        {recipesList.map((recipe, index) => (
          <li>
            <button
              aria-label={`See recipe ${recipe.title}`}
              onClick={() => onSelect(index)}
            >
              {recipe.title}
            </button>
            <button
              aria-label={`Unpin recipe ${recipe.title}`}
              onClick={() => onRemove(index)}
            >
              x
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
