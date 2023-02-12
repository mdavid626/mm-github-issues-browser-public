import { cleanup, render } from '@testing-library/react';
import React from 'react';
import { testIssuesItem1 } from '../../test-data/issues';
import IssueStateBadge from '../issue-state-badge/issue-state-badge';
import IssueListItem from './issue-list-item';

jest.mock('../issue-state-badge/issue-state-badge');

describe('issue-list-item', () => {
  afterEach(cleanup);
  afterEach(jest.resetAllMocks);

  it('should render', () => {
    (IssueStateBadge as jest.Mock).mockReturnValue(
      <div>issue-state-badge</div>
    );
    const { asFragment } = render(<IssueListItem issue={testIssuesItem1} />);
    expect(asFragment()).toMatchSnapshot();
    expect(IssueStateBadge).toHaveBeenCalledWith(
      { state: testIssuesItem1.state },
      {}
    );
  });
});
