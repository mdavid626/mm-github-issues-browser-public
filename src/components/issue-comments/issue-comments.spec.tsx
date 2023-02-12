import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { useFetchMoreIssueComment } from '../../hooks/issue-hooks/issue-hooks';
import { noCommentsIssue1, testIssue1 } from '../../test-data/issues';
import IssueCommentItem from '../issue-comment-item/issue-comment-item';
import IssueComments from './issue-comments';

jest.mock('../../hooks/issue-hooks/issue-hooks');
jest.mock('../issue-comment-item/issue-comment-item');

describe('issue-comments', () => {
  beforeEach(() => {
    (IssueCommentItem as jest.Mock).mockReturnValue(
      <div>issue-comment-item</div>
    );
    (useFetchMoreIssueComment as jest.Mock).mockReturnValue([jest.fn(), false]);
  });
  afterEach(cleanup);
  afterEach(jest.resetAllMocks);

  it('should render', () => {
    const { asFragment } = render(
      <IssueComments
        issueNumber={testIssue1.number}
        comments={testIssue1.comments}
      />
    );
    expect(asFragment()).toMatchSnapshot();
    expect(useFetchMoreIssueComment).toHaveBeenCalledWith(testIssue1.number);
    expect(IssueCommentItem).toHaveBeenCalledTimes(2);
    expect(IssueCommentItem).toHaveBeenCalledWith(
      { comment: testIssue1.comments.nodes[0] },
      {}
    );
    expect(IssueCommentItem).toHaveBeenCalledWith(
      { comment: testIssue1.comments.nodes[1] },
      {}
    );
  });

  it('should render no comments message when no comments', () => {
    render(
      <IssueComments
        issueNumber={noCommentsIssue1.number}
        comments={noCommentsIssue1.comments}
      />
    );
    expect(screen.getByText('No comments yet')).toBeVisible();
    expect(IssueCommentItem).not.toHaveBeenCalled();
  });

  it('should fetch more comments when button clicked', async () => {
    const fetchMoreIssueComment = jest.fn();
    (useFetchMoreIssueComment as jest.Mock).mockReturnValue([
      fetchMoreIssueComment,
      false,
    ]);
    render(
      <IssueComments
        issueNumber={testIssue1.number}
        comments={testIssue1.comments}
      />
    );
    await userEvent.click(screen.getByText('load more comments'));
    expect(fetchMoreIssueComment).toHaveBeenCalledWith(
      testIssue1.comments.pageInfo.endCursor
    );
  });

  it('should show loading spinner when loading more comments', () => {
    (useFetchMoreIssueComment as jest.Mock).mockReturnValue([jest.fn(), true]);
    render(
      <IssueComments
        issueNumber={testIssue1.number}
        comments={testIssue1.comments}
      />
    );
    expect(screen.getByText('loading...')).toBeVisible();
    expect(screen.queryByText('load more comments')).toBe(null);
  });
});
