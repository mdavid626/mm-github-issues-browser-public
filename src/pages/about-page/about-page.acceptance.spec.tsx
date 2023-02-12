import { cleanup, screen } from '@testing-library/react';
import React from 'react';
import Routes from '../../router/routes';
import { renderWithRouter } from '../../testing-library/render';

describe('[Acceptance] about-page', () => {
  afterEach(cleanup);
  afterEach(jest.resetAllMocks);

  it('should render', async () => {
    renderWithRouter(<Routes />, undefined, ['/about']);
    expect(
      await screen.findByText('Simple React app to browser GitHub Issues')
    ).toBeVisible();
    expect(screen.getByText('GitHub Issues Browser')).toBeVisible();
    expect(screen.getByText('React GitHub Issues')).toBeVisible();
    expect(screen.getByText('About')).toBeVisible();
    expect(screen.getByText('Created by:')).toBeVisible();
    expect(screen.getByText('Dávid Molnár')).toBeVisible();
    expect(screen.getByText('Source Code')).toBeVisible();
    expect(screen.getByText('Dávid Molnár © 2023')).toBeVisible();
  });
});
