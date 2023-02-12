import { cleanup, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import {
  commentsQueryResult1,
  issueQueryResult1,
} from '../../test-data/query-results';
import { renderWithRouterAndQueryClient } from '../../testing-library/render';
import IssuePage from './issue-page';

describe('issue-page', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
    fetchMock.mockResponseOnce(JSON.stringify(issueQueryResult1));
    fetchMock.mockResponseOnce(JSON.stringify(commentsQueryResult1));
  });
  afterEach(cleanup);
  afterEach(jest.resetAllMocks);

  it('should render', async () => {
    renderWithRouterAndQueryClient(<IssuePage />);
    await screen.findByText(
      'Bug: Failed when set "homepage" in package.json or set PUBLIC_URL'
    );
    expect(screen.getByText('Comments (5)')).toBeVisible();
  });

  it('should be able to load more comments', async () => {
    renderWithRouterAndQueryClient(<IssuePage />);
    await screen.findByText(
      'Bug: Failed when set "homepage" in package.json or set PUBLIC_URL'
    );
    await userEvent.click(screen.getByText('load more comments'));
    await screen.findByText(
      'Are you using react-router-dom? If yes, try adding the attribute basename'
    );
  });
});
