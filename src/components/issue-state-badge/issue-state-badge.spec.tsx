import { cleanup, render, screen } from '@testing-library/react';
import React from 'react';
import { IssueState } from '../../types/issue';
import IssueStateBadge from './issue-state-badge';

describe('issue-state-badge', () => {
  afterEach(cleanup);

  it('should render', () => {
    const { asFragment } = render(<IssueStateBadge state="OPEN" />);
    expect(asFragment()).toMatchSnapshot();
  });

  const stateCases: [IssueState, string][] = [
    ['OPEN', 'open'],
    ['CLOSED', 'closed'],
  ];
  it.each(stateCases)('should render label for %s', (state, label) => {
    render(<IssueStateBadge state={state} />);
    expect(screen.getByText(label)).toBeVisible();
  });
});
