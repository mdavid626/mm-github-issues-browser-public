import { useCallback, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Filters, StateFilter, stateFilters } from '../../types/filters';

export const useFilters = (): [Filters, (newFilters: Filters) => void] => {
  const location = useLocation();
  const navigate = useNavigate();

  const filters = useMemo(() => {
    const query = new URLSearchParams(location.search);
    const state = query.get('state') as StateFilter;
    return {
      search: query.get('search') ?? '',
      state: stateFilters.includes(state) ? state : null,
    };
  }, [location.search]);

  const setFilters = useCallback(
    (newFilters: Filters) => {
      const query = new URLSearchParams(location.search);
      query.set('search', newFilters.search);
      if (newFilters.state) {
        query.set('state', newFilters.state);
      } else {
        query.delete('state');
      }
      navigate({
        search: query.toString(),
      });
    },
    [location.search, navigate]
  );

  return [filters, setFilters];
};
