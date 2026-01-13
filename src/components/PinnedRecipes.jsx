import "./PinnedRecipes.css";

export default function PinnedRecipes({
  recipesList,
  onSelect,
  onRemove,
  activeRecipeId,
}) {
  if (recipesList.length === 0) return null;

  return (
    <section className="pinned-recipes">
      <h3>Pinned Recipes</h3>
      <ul>
        {recipesList.map((recipe) => (
          <li
            key={recipe.id}
            className={recipe.id === activeRecipeId ? "active" : ""}
          >
            <button
              className="see-recipe-btn"
              aria-label={`See recipe ${recipe.title}`}
              onClick={() => onSelect(recipe.id)}
            >
              {recipe.title}
            </button>
            <button
              className="unpin-recipe-btn"
              aria-label={`Unpin recipe ${recipe.title}`}
              onClick={() => onRemove(recipe.id)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="18px"
                viewBox="0 -960 960 960"
                width="18px"
                fill="currentColor"
              >
                <path d="M480-424 284-228q-11 11-28 11t-28-11q-11-11-11-28t11-28l196-196-196-196q-11-11-11-28t11-28q11-11 28-11t28 11l196 196 196-196q11-11 28-11t28 11q11 11 11 28t-11 28L536-480l196 196q11 11 11 28t-11 28q-11 11-28 11t-28-11L480-424Z" />
              </svg>
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
