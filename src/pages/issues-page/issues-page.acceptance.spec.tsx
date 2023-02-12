import { cleanup, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import {
  issuesQueryResult1,
  loadMoreIssuesQueryResult1,
} from '../../test-data/query-results';
import { renderWithRouterAndQueryClient } from '../../testing-library/render';
import IssuesPage from './issues-page';

describe('[Acceptance] issues-page', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
    fetchMock.mockResponseOnce(JSON.stringify(issuesQueryResult1));
    fetchMock.mockResponseOnce(JSON.stringify(loadMoreIssuesQueryResult1));
  });
  afterEach(cleanup);
  afterEach(jest.resetAllMocks);

  it('should render', async () => {
    renderWithRouterAndQueryClient(<IssuesPage />);
    await screen.findByText('Bug: build args parse error on powsershell');
    expect(
      screen.getByText(
        'Unable to establish connection with the sandpack bundler.[DevTools Bug]:'
      )
    ).toBeVisible();
    expect(screen.getByText('GitHub Issues Browser')).toBeVisible();
    expect(screen.getByText('React GitHub Issues')).toBeVisible();
    expect(screen.getByText('About')).toBeVisible();
    expect(screen.getByText('load more')).toBeVisible();
    expect(screen.getByText('Dávid Molnár © 2023')).toBeVisible();
    expect(screen.getByText('Total Issues: 12030')).toBeVisible();
  });

  it('should be able to load more', async () => {
    renderWithRouterAndQueryClient(<IssuesPage />);
    await screen.findByText('Bug: build args parse error on powsershell');
    expect(
      screen.getByText(
        'Unable to establish connection with the sandpack bundler.[DevTools Bug]:'
      )
    ).toBeVisible();
    await userEvent.click(screen.getByText('load more'));
    await screen.findByText(
      'Bug: react context not being provided to the components rendered that was passed as a prop.'
    );
    expect(
      screen.getByText(
        'Bug: Why is ref.current null when I get it in the useFetch callback?'
      )
    ).toBeVisible();
  });
});
