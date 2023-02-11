import React, { useState } from 'react';
import { Filters, StateFilter } from '../../types/filters';
import './filters-bar.css';

const FiltersBar: React.FC<{
  filters: Filters;
  setFilters: (newFilters: Filters) => void;
}> = ({ filters, setFilters }) => {
  const [search, setSearch] = useState(filters.search);
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
      />
      <button
        type="button"
        onClick={() =>
          setFilters({
            ...filters,
            search,
          })
        }
      >
        Search
      </button>
    </div>
  );
};

export default FiltersBar;
