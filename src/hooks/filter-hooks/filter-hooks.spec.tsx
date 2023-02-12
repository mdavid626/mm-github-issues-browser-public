import { act } from '@testing-library/react';
import { renderHookWithRouter } from '../../testing-library/render';
import { StateFilter } from '../../types/filters';
import { useFilters } from './filter-hooks';

describe('filter-hooks', () => {
  describe('useFilters', () => {
    it('should return filters from URL', () => {
      const { result } = renderHookWithRouter(() => useFilters(), undefined, [
        '/?search=test&state=open',
      ]);
      expect(result.current).toEqual([
        { search: 'test', state: 'open' },
        expect.any(Function),
      ]);
    });

    it('should return empty filters when not in URL', () => {
      const { result } = renderHookWithRouter(() => useFilters());
      expect(result.current[0]).toEqual({ search: '', state: null });
    });

    const stateCases: [string, StateFilter | null][] = [
      ['open', 'open'],
      ['closed', 'closed'],
      ['', null],
      ['test', null],
      ['abc', null],
    ];
    it.each(stateCases)(
      'should return state filter when %s state in URL',
      (stateInUrl, state) => {
        const { result } = renderHookWithRouter(() => useFilters(), undefined, [
          `/?state=${stateInUrl}`,
        ]);
        expect(result.current[0].state).toBe(state);
      }
    );

    it('should set filters in URL', () => {
      const { result, router } = renderHookWithRouter(
        () => useFilters(),
        undefined,
        ['/path?test=1']
      );
      act(() => {
        result.current[1]({ search: 'test', state: 'open' });
      });
      expect(router.location?.pathname).toBe('/path');
      expect(router.location?.search).toBe('?test=1&search=test&state=open');
    });

    it('should set clear state from URL when null', () => {
      const { result, router } = renderHookWithRouter(() => useFilters());
      act(() => {
        result.current[1]({ search: 'test', state: null });
      });
      expect(router.location?.search).toBe('?search=test');
    });
  });
});
