import { Filters } from '../../types/filters';
import createSearchQueryText from './search-query-text';

describe('search-query-text', function () {
  it('should create search query text from filters', () => {
    const filters: Filters = {
      search: 'test',
      state: 'open',
    };
    expect(createSearchQueryText(filters)).toBe(
      'repo:facebook/react type:issue state:open (in:title test OR in:body test)'
    );
  });

  it('should not add search and state when empty', () => {
    const filters: Filters = {
      search: '',
      state: null,
    };
    expect(createSearchQueryText(filters)).toBe(
      'repo:facebook/react type:issue'
    );
  });

  it('should escape search', () => {
    const filters: Filters = {
      search: `~!@#$%^&*()_{}:"'<>/\\tEst123 abc`,
      state: null,
    };
    expect(createSearchQueryText(filters)).toBe(
      'repo:facebook/react type:issue (in:title tEst123 abc OR in:body tEst123 abc)'
    );
  });
});
