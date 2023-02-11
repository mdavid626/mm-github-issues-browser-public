import React from 'react';
import { Filters, StateFilter } from '../../types/filters';
import './filters-bar.css';

const FiltersBar: React.FC<{
  filters: Filters;
  setFilters: (newFilters: Filters) => void;
}> = ({ filters, setFilters }) => {
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
        value={filters.search}
        onChange={(e) =>
          setFilters({ ...filters, search: e.currentTarget.value })
        }
        placeholder="Search..."
      />
    </div>
  );
};

export default FiltersBar;
