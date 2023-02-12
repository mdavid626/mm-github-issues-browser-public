import React, { useEffect, useState } from 'react';
import { Filters, StateFilter } from '../../types/filters';
import './filters-bar.css';

const FiltersBar: React.FC<{
  filters: Filters;
  setFilters: (newFilters: Filters) => void;
}> = ({ filters, setFilters }) => {
  const [search, setSearch] = useState(filters.search);
  useEffect(() => {
    if (filters.search !== search) {
      setSearch(filters.search);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.search, setSearch]);
  return (
    <div className="FiltersBar">
      <select
        value={filters.state ?? ''}
        onChange={(e) =>
          setFilters({
            ...filters,
            state: (e.currentTarget.value as StateFilter) || null,
          })
        }
        className="FiltersBar-state"
        data-testid="FiltersBar-state"
      >
        <option value="">All</option>
        <option value="open">Open</option>
        <option value="closed">Closed</option>
      </select>
      <input
        value={search}
        onChange={(e) => setSearch(e.currentTarget.value)}
        placeholder="Search..."
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            setFilters({
              ...filters,
              search,
            });
          }
        }}
        className="FiltersBar-search"
      />
      <button
        type="button"
        onClick={() =>
          setFilters({
            ...filters,
            search,
          })
        }
        className="FiltersBar-searchButton"
      >
        Search
      </button>
    </div>
  );
};

export default FiltersBar;
