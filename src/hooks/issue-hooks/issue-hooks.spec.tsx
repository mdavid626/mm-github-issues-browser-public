import { act, waitFor } from '@testing-library/react';
import { testFilters1 } from '../../test-data/filters';
import {
  commentsQueryResult1,
  issueQueryResult1,
  issuesQueryResult1,
  loadMoreIssuesQueryResult1,
} from '../../test-data/query-results';
import {
  renderHookWithQueryClient,
  renderHookWithRouter,
} from '../../testing-library/render';
import {
  useFetchMoreIssueComment,
  useIssue,
  useIssueNumber,
  useIssues,
} from './issue-hooks';
import createSearchQueryText from './search-query-text';

jest.mock('./search-query-text');
describe('issue-hooks', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
    jest.spyOn(window, 'alert').mockReturnValue(undefined);
    (createSearchQueryText as jest.Mock).mockReturnValue(
      'repo:facebook/react type:issue in:title test'
    );
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
      fetchMock.mockResponse(JSON.stringify(issueQueryResult1));
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

  describe('useFetchMoreIssueComment', () => {
    it('should fetch more comments', async () => {
      fetchMock.mockResponseOnce(JSON.stringify(issueQueryResult1));
      fetchMock.mockResponseOnce(JSON.stringify(commentsQueryResult1));
      const { result } = renderHookWithQueryClient(() => {
        return [useIssue(123), useFetchMoreIssueComment(123)];
      });
      expect(result.current).toEqual([
        [undefined, undefined],
        [expect.any(Function), false],
      ]);
      await waitFor(() => {
        expect(result.current[0]).toEqual([expect.any(Object), undefined]);
      });
      expect(fetchMock).toHaveBeenCalledTimes(1);

      const [fetchMoreComments] = result.current[1] as ReturnType<
        typeof useFetchMoreIssueComment
      >;
      act(() => {
        fetchMoreComments('testCursor1');
      });
      await waitFor(() => {
        const [queryResult] = result.current[0] as ReturnType<typeof useIssue>;
        expect(queryResult?.repository.issue.comments.nodes).toHaveLength(5);
      });

      expect(fetchMock).toHaveBeenCalledTimes(2);
      expect(fetchMock.mock.calls[1]).toMatchSnapshot('query');
      expect(result.current[0][0]).toMatchSnapshot('issue');
    });

    it('should show error when error', async () => {
      fetchMock.mockRejectOnce(new Error('test error'));
      const { result } = renderHookWithQueryClient(() =>
        useFetchMoreIssueComment(123)
      );
      act(() => {
        result.current[0]('testCursor1');
      });
      await waitFor(() => {
        expect(window.alert).toHaveBeenCalledWith('test error');
      });
    });
  });

  describe('useIssues', () => {
    it('should load issues', async () => {
      fetchMock.mockResponse(JSON.stringify(issuesQueryResult1));
      const { result } = renderHookWithQueryClient(() =>
        useIssues(testFilters1)
      );
      expect(result.current).toEqual([
        undefined,
        true,
        undefined,
        expect.any(Function),
      ]);
      await waitFor(() => {
        expect(result.current).toEqual([
          expect.any(Object),
          false,
          undefined,
          expect.any(Function),
        ]);
      });
      expect(result.current[0]).toMatchSnapshot('query result');
      expect(fetchMock).toHaveBeenCalledTimes(1);
      expect(fetchMock.mock.calls[0]).toMatchSnapshot('query');
      expect(createSearchQueryText).toHaveBeenCalledWith(testFilters1);
    });

    it('should return error when error', async () => {
      fetchMock.mockReject(new Error('test error'));
      const { result } = renderHookWithQueryClient(() =>
        useIssues(testFilters1)
      );
      expect(result.current).toEqual([
        undefined,
        true,
        undefined,
        expect.any(Function),
      ]);
      await waitFor(() => {
        expect(result.current[2]).toEqual(expect.any(Object));
      });
    });

    it('should load more issues', async () => {
      fetchMock.mockResponseOnce(JSON.stringify(issuesQueryResult1));
      fetchMock.mockResponseOnce(JSON.stringify(loadMoreIssuesQueryResult1));
      const { result } = renderHookWithQueryClient(() =>
        useIssues(testFilters1)
      );
      await waitFor(() => {
        expect(result.current[0]).toEqual(expect.any(Object));
      });
      result.current[3]();
      await waitFor(() => {
        expect(result.current[0]?.search.nodes).toHaveLength(4);
      });
      expect(fetchMock).toHaveBeenCalledTimes(2);
      expect(fetchMock.mock.calls[1]).toMatchSnapshot('query');
      expect(result.current[0]).toMatchSnapshot('query result');
    });
  });
});
