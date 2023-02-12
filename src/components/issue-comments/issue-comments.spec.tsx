import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { useFetchMoreIssueComment } from '../../hooks/issue-hooks/issue-hooks';
import { noCommentsIssue1, testIssue1 } from '../../test-data/issues';
import IssueCommentsItem from '../issue-comments-item/issue-comments-item';
import IssueComments from './issue-comments';

jest.mock('../../hooks/issue-hooks/issue-hooks');
jest.mock('../issue-comments-item/issue-comments-item');

describe('issue-comments', () => {
  beforeEach(() => {
    (IssueCommentsItem as jest.Mock).mockReturnValue(
      <div>issue-comments-item</div>
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
    expect(IssueCommentsItem).toHaveBeenCalledTimes(2);
    expect(IssueCommentsItem).toHaveBeenCalledWith(
      { comment: testIssue1.comments.nodes[0] },
      {}
    );
    expect(IssueCommentsItem).toHaveBeenCalledWith(
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
    expect(IssueCommentsItem).not.toHaveBeenCalled();
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
