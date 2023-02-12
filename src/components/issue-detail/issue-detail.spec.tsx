import { cleanup, render } from '@testing-library/react';
import React from 'react';
import { testIssue1 } from '../../test-data/issues';
import IssueCommentList from '../issue-comment-list/issue-comment-list';
import IssueStateBadge from '../issue-state-badge/issue-state-badge';
import IssueDetail from './issue-detail';

jest.mock('../issue-comment-list/issue-comment-list');
jest.mock('../issue-state-badge/issue-state-badge');

describe('issue-detail', () => {
  afterEach(cleanup);
  afterEach(jest.resetAllMocks);

  it('should render', () => {
    (IssueCommentList as jest.Mock).mockReturnValue(
      <div>issue-comment-list</div>
    );
    (IssueStateBadge as jest.Mock).mockReturnValue(
      <div>issue-state-badge</div>
    );
    const { asFragment } = render(<IssueDetail issue={testIssue1} />);
    expect(asFragment()).toMatchSnapshot();
    expect(IssueStateBadge).toHaveBeenCalledWith(
      { state: testIssue1.state },
      {}
    );
    expect(IssueCommentList).toHaveBeenCalledWith(
      { issueNumber: testIssue1.number, comments: testIssue1.comments },
      {}
    );
  });
});
