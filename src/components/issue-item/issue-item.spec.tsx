import { cleanup, render } from '@testing-library/react';
import React from 'react';
import { testIssue1 } from '../../test-data/issues';
import IssueComments from '../issue-comments/issue-comments';
import IssueStateBadge from '../issue-state-badge/issue-state-badge';
import IssueItem from './issue-item';

jest.mock('../issue-comments/issue-comments');
jest.mock('../issue-state-badge/issue-state-badge');

describe('issue-item', () => {
  afterEach(cleanup);
  afterEach(jest.resetAllMocks);

  it('should render', () => {
    (IssueComments as jest.Mock).mockReturnValue(<div>issue-comments</div>);
    (IssueStateBadge as jest.Mock).mockReturnValue(
      <div>issue-state-badge</div>
    );
    const { asFragment } = render(<IssueItem issue={testIssue1} />);
    expect(asFragment()).toMatchSnapshot();
    expect(IssueStateBadge).toHaveBeenCalledWith({ state: testIssue1.state }, {});
    expect(IssueComments).toHaveBeenCalledWith(
      { issueNumber: testIssue1.number, comments: testIssue1.comments },
      {}
    );
  });
});
