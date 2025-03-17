const FilterSort = ({ onSortChange, genres }) => {
    return (
      <div className="filter-sort">
        <select onChange={onSortChange}>
          <option value="title">Sort by title (Asc)</option>
          <option value="userId">Sort by userrId (Desc)</option>
        </select>
  
        <select>
          {genres.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>
      </div>
    );
  };
  
  export default FilterSort;
  