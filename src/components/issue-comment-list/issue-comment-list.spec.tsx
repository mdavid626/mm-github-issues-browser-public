import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { useFetchMoreIssueComment } from '../../hooks/issue-hooks/issue-hooks';
import {
  testIssueComments1,
  testEmptyIssueComments,
} from '../../test-data/issue-comments';
import IssueCommentItem from '../issue-comment-item/issue-comment-item';
import IssueCommentList from './issue-comment-list';

jest.mock('../../hooks/issue-hooks/issue-hooks');
jest.mock('../issue-comment-item/issue-comment-item');

describe('issue-comment-list', () => {
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
      <IssueCommentList issueNumber={1} comments={testIssueComments1} />
    );
    expect(asFragment()).toMatchSnapshot();
    expect(useFetchMoreIssueComment).toHaveBeenCalledWith(1);
    expect(IssueCommentItem).toHaveBeenCalledTimes(2);
    expect(IssueCommentItem).toHaveBeenCalledWith(
      { comment: testIssueComments1.nodes[0] },
      {}
    );
    expect(IssueCommentItem).toHaveBeenCalledWith(
      { comment: testIssueComments1.nodes[1] },
      {}
    );
  });

  it('should render no comments message when no comments', () => {
    render(
      <IssueCommentList issueNumber={1} comments={testEmptyIssueComments} />
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
    render(<IssueCommentList issueNumber={1} comments={testIssueComments1} />);
    await userEvent.click(screen.getByText('load more comments'));
    expect(fetchMoreIssueComment).toHaveBeenCalledWith(
      testIssueComments1.pageInfo.endCursor
    );
  });

  it('should show loading spinner when loading more comments', () => {
    (useFetchMoreIssueComment as jest.Mock).mockReturnValue([jest.fn(), true]);
    render(<IssueCommentList issueNumber={1} comments={testIssueComments1} />);
    expect(screen.getByText('loading...')).toBeVisible();
    expect(screen.queryByText('load more comments')).toBe(null);
  });
});
