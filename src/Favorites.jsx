export default function Favorites({ favorites, onUnfavorite }) {
  if (!favorites.length) return null;

  return (
    <section className="favorites">
      <h2>Your favorites</h2>
      <div className="grid">
        {favorites.map((meal) => (
          <div key={meal.idMeal} className="fav-card">
            <img src={meal.strMealThumb} alt={meal.strMeal} className="thumb small" />
            <div className="fav-meta">
              <strong>{meal.strMeal}</strong>
              <button
                className="button button-outline small"
                onClick={() => onUnfavorite(meal.idMeal)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
