export default function RecipeCard({ meal, isFavorite, onFavorite, onUnfavorite }) {
  const {
    strMeal,
    strMealThumb,
    strArea,
    strCategory,
    strInstructions,
    idMeal,
  } = meal;

  return (
    <article className="card">
      <img src={strMealThumb} alt={strMeal} className="thumb" />
      <div className="card-body">
        <h3 className="title">{strMeal}</h3>
        <p className="meta">
          <span>{strArea}</span> • <span>{strCategory}</span> • <span>ID: {idMeal}</span>
        </p>
        <p className="instructions">
          {strInstructions?.slice(0, 160)}{strInstructions && strInstructions.length > 160 ? "…" : ""}
        </p>
        <div className="actions">
          {!isFavorite ? (
            <button className="button" onClick={onFavorite}>Add to Favorites</button>
          ) : (
            <button className="button button-outline" onClick={onUnfavorite}>Remove Favorite</button>
          )}
          <a
            className="link"
            href={`https://www.themealdb.com/meal/${idMeal}`}
            target="_blank"
            rel="noreferrer"
          >
            View full recipe
          </a>
        </div>
      </div>
    </article>
  );
}
