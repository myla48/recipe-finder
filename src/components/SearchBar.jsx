export default function SearchBar({ value, onChange, onSearch, placeholder }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch();
  };

  return (
    <form className="searchbar" onSubmit={handleSubmit}>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="input"
      />
      <button type="submit" className="button">Search</button>
    </form>
  );
}
