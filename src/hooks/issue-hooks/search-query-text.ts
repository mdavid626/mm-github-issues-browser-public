import { Filters } from '../../types/filters';

const createSearchQueryText = (filters: Filters) => {
  const escapedSearch = filters.search.replace(/[^a-z\d\s]/gi, '');
  const search = filters.search
    ? `(in:title ${escapedSearch} OR in:body ${escapedSearch})`
    : '';
  const state = filters.state ? `state:${filters.state}` : '';
  return ['repo:facebook/react', 'type:issue', state, search]
    .filter((item) => item)
    .join(' ');
};

export default createSearchQueryText;
