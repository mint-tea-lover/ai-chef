export default function RecipeCTA({ minReached, toggleRecipe, isLoading }) {
  return (
    <>
      <div className="get-recipe-container">
        <div>
          <h3>
            {minReached ? "Ready for a recipe?" : "Need more ingredients"}
          </h3>
          <p>
            {minReached
              ? "Generate a recipe from your list"
              : "Add more to get a personal recipe"}
          </p>
        </div>
        <button
          className="get-recipe-btn"
          disabled={!minReached || isLoading}
          onClick={toggleRecipe}
        >
          Get a recipe
        </button>
        {isLoading && <p className="loading">Generating...</p>}
      </div>
    </>
  );
}
