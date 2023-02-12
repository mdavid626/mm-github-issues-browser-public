import { waitFor } from '@testing-library/react';
import { testIssueQueryResult1 } from '../../test-data/issues';
import { issueQueryResult } from '../../test-data/query-results';
import {
  renderHookWithQueryClient,
  renderHookWithRouter,
} from '../../testing-library/render';
import { useIssue, useIssueNumber } from './issue-hooks';

describe('issue-hooks', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });
  afterEach(jest.resetAllMocks);

  describe('useIssueNumber', () => {
    it('should return issue number from URL', () => {
      const { result } = renderHookWithRouter(
        () => useIssueNumber(),
        undefined,
        ['/issue/123']
      );
      expect(result.current).toBe(123);
    });
  });

  describe('useIssue', () => {
    it('should load issue', async () => {
      fetchMock.mockResponse(JSON.stringify(issueQueryResult));
      const { result } = renderHookWithQueryClient(() => useIssue(123));
      expect(result.current).toEqual([undefined, undefined]);
      await waitFor(() => {
        expect(result.current).toEqual([expect.any(Object), undefined]);
      });
      expect(result.current[0]).toMatchSnapshot('query result');
      expect(fetchMock).toHaveBeenCalledTimes(1);
      expect(fetchMock.mock.calls[0]).toMatchSnapshot('query');
    });

    it('should return error when error', async () => {
      fetchMock.mockRejectedValue(new Error('test error'));
      const { result } = renderHookWithQueryClient(() => useIssue(123));
      expect(result.current).toEqual([undefined, undefined]);
      await waitFor(() => {
        expect(result.current).toEqual([undefined, expect.any(Error)]);
      });
    });
  });
});
