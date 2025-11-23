import { useEffect, useMemo, useState } from "react";
import SearchBar from "./components/SearchBar.jsx";
import RecipeList from "./components/RecipeList.jsx";
import Favorites from "./components/Favorites.jsx";

export default function App() {
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });
  const [error, setError] = useState("");

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const fetchRecipes = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setError("");
    try {
      // Search by name
      const res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(
          query
        )}`
      );
      const data = await res.json();
      setRecipes(Array.isArray(data.meals) ? data.meals : []);
    } catch (e) {
      setError("Failed to fetch recipes. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const addFavorite = (meal) => {
    setFavorites((prev) =>
      prev.some((m) => m.idMeal === meal.idMeal) ? prev : [...prev, meal]
    );
  };

  const removeFavorite = (idMeal) => {
    setFavorites((prev) => prev.filter((m) => m.idMeal !== idMeal));
  };

  const resultsLabel = useMemo(() => {
    if (loading) return "Loading…";
    if (error) return error;
    if (!query) return "Search for a recipe";
    return recipes.length ? `${recipes.length} result(s)` : "No results found";
  }, [loading, error, query, recipes]);

  return (
    <div className="container">
      <header className="header">
        <h1>Recipe Finder</h1>
        <p>Search recipes and save your favorites.</p>
      </header>

      <SearchBar
        value={query}
        onChange={setQuery}
        onSearch={fetchRecipes}
        placeholder="Search recipes by name (e.g., 'chicken', 'pasta')"
      />

      <div className="status">{resultsLabel}</div>

      <RecipeList
        recipes={recipes}
        onFavorite={addFavorite}
        onUnfavorite={removeFavorite}
        favorites={favorites}
      />

      <Favorites
        favorites={favorites}
        onUnfavorite={removeFavorite}
      />

      <footer className="footer">
        <small>Powered by TheMealDB • Built with React</small>
      </footer>
    </div>
  );
}
