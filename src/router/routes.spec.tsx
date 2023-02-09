import { cleanup, screen } from '@testing-library/react';
import React from 'react';
import AboutPage from '../pages/about-page/about-page';
import IssuePage from '../pages/issue-page/issue-page';
import IssuesPage from '../pages/issues-page/issues-page';
import { renderWithRouter } from '../testing-library/render';
import Routes from './routes';

jest.mock('../pages/issues-page/issues-page');
jest.mock('../pages/issue-page/issue-page');
jest.mock('../pages/about-page/about-page');

describe('routes', () => {
  beforeEach(() => {
    jest.spyOn(console, 'error').mockReturnValue(undefined);
    (IssuesPage as jest.Mock).mockReturnValue(<div>issues-page</div>);
    (IssuePage as jest.Mock).mockReturnValue(<div>issue-page</div>);
    (AboutPage as jest.Mock).mockReturnValue(<div>about-page</div>);
  });
  afterEach(cleanup);
  afterEach(jest.resetAllMocks);

  const pages: string[] = ['/', '/issue/1', '/about'];
  it.each(pages)('should render "%s" page', (page) => {
    const { asFragment } = renderWithRouter(<Routes />, undefined, [page]);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render default page when unknown route', () => {
    renderWithRouter(<Routes />, undefined, ['/unknown']);
    expect(screen.getByText('issues-page')).toBeVisible();
  });

  it('should throw error on error route', () => {
    expect(() => renderWithRouter(<Routes />, undefined, ['/error'])).toThrow(
      'test error'
    );
  });
});
