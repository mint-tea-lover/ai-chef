import "./Recipe.css";

export default function Recipe({ recipeData, onPin, onUnpin, isPinned }) {
  function handlePinClick() {
    if (isPinned) {
      onUnpin(recipeData.id);
    } else {
      onPin(recipeData);
    }
  }

  return (
    <div className="recipe-card">
      <div className="recipe-actions">
        <button
          className={`pin-btn ${isPinned ? "active" : ""}`}
          aria-label={`${isPinned ? "Unpin" : "Pin"} current recipe`}
          onClick={handlePinClick}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="currentColor"
          >
            <path d="M640-760v280l68 68q6 6 9 13.5t3 15.5v23q0 17-11.5 28.5T680-320H520v234q0 17-11.5 28.5T480-46q-17 0-28.5-11.5T440-86v-234H280q-17 0-28.5-11.5T240-360v-23q0-8 3-15.5t9-13.5l68-68v-280q-17 0-28.5-11.5T280-800q0-17 11.5-28.5T320-840h320q17 0 28.5 11.5T680-800q0 17-11.5 28.5T640-760ZM354-400h252l-46-46v-314H400v314l-46 46Zm126 0Z" />
          </svg>
        </button>
      </div>
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
