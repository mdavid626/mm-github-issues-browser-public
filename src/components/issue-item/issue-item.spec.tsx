import { cleanup, render } from '@testing-library/react';
import React from 'react';
import { issue1 } from '../../test-data/issues';
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
    const { asFragment } = render(<IssueItem issue={issue1} />);
    expect(asFragment()).toMatchSnapshot();
    expect(IssueStateBadge).toHaveBeenCalledWith({ state: issue1.state }, {});
    expect(IssueComments).toHaveBeenCalledWith(
      { issueNumber: issue1.number, comments: issue1.comments },
      {}
    );
  });
});
