import RecipeCard from "./RecipeCard.jsx";

export default function RecipeList({ recipes, favorites, onFavorite, onUnfavorite }) {
  if (!recipes.length) return null;

  return (
    <section className="grid">
      {recipes.map((meal) => {
        const isFav = favorites.some((m) => m.idMeal === meal.idMeal);
        return (
          <RecipeCard
            key={meal.idMeal}
            meal={meal}
            isFavorite={isFav}
            onFavorite={() => onFavorite(meal)}
            onUnfavorite={() => onUnfavorite(meal.idMeal)}
          />
        );
      })}
    </section>
  );
}
