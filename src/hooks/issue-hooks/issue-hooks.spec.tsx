import { renderHookWithRouter } from '../../testing-library/render';
import { useIssueNumber } from './issue-hooks';

describe('issue-hooks', () => {
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
});
