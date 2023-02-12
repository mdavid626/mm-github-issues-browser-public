import { cleanup, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import FiltersBar from '../../components/filters-bar/filters-bar';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import IssueListItem from '../../components/issue-list-item/issue-list-item';
import { useFilters } from '../../hooks/filter-hooks/filter-hooks';
import { useIssues } from '../../hooks/issue-hooks/issue-hooks';
import { testFilters1 } from '../../test-data/filters';
import {
  testEmptyIssuesQueryResult1,
  testIssuesQueryResult1,
} from '../../test-data/issues';
import { renderWithRouter } from '../../testing-library/render';
import { IssuesItem } from '../../types/issue';
import IssuesPage from './issues-page';

jest.mock('../../components/filters-bar/filters-bar');
jest.mock('../../components/footer/footer');
jest.mock('../../components/header/header');
jest.mock('../../components/issue-list-item/issue-list-item');
jest.mock('../../hooks/filter-hooks/filter-hooks');
jest.mock('../../hooks/issue-hooks/issue-hooks');

describe('issues-page', () => {
  beforeEach(() => {
    (Footer as jest.Mock).mockReturnValue(<div>footer</div>);
    (Header as jest.Mock).mockReturnValue(<div>header</div>);
    (FiltersBar as jest.Mock).mockReturnValue(<div>filters-bar</div>);
    (IssueListItem as jest.Mock).mockImplementation(
      ({ issue }: { issue: IssuesItem }) => (
        <div>issue-list-item-{issue.number}</div>
      )
    );
    (useFilters as jest.Mock).mockReturnValue([testFilters1, jest.fn()]);
    (useIssues as jest.Mock).mockReturnValue([
      testIssuesQueryResult1,
      false,
      undefined,
      jest.fn(),
    ]);
  });
  afterEach(cleanup);
  afterEach(jest.resetAllMocks);

  it('should render', () => {
    const setFilters = jest.fn();
    (useFilters as jest.Mock).mockReturnValue([testFilters1, setFilters]);
    const { asFragment } = renderWithRouter(<IssuesPage />);
    expect(asFragment()).toMatchSnapshot();
    expect(useFilters).toHaveBeenCalledWith();
    expect(useIssues).toHaveBeenCalledWith(testFilters1);
    expect(Footer).toHaveBeenCalledWith({}, {});
    expect(Header).toHaveBeenCalledWith({}, {});
    expect(FiltersBar).toHaveBeenCalledWith(
      { filters: testFilters1, setFilters },
      {}
    );
    expect(IssueListItem).toHaveBeenCalledTimes(2);
    expect(IssueListItem).toHaveBeenCalledWith(
      { issue: testIssuesQueryResult1.search.nodes[0] },
      {}
    );
    expect(IssueListItem).toHaveBeenCalledWith(
      { issue: testIssuesQueryResult1.search.nodes[1] },
      {}
    );
  });

  it('should render spinner when loading', () => {
    (useIssues as jest.Mock).mockReturnValue([
      undefined,
      false,
      undefined,
      jest.fn(),
    ]);
    const { asFragment } = renderWithRouter(<IssuesPage />);
    expect(asFragment()).toMatchSnapshot();
    expect(Footer).toHaveBeenCalledWith({}, {});
    expect(Header).toHaveBeenCalledWith({}, {});
    expect(FiltersBar).toHaveBeenCalledWith(
      { filters: testFilters1, setFilters: expect.any(Function) },
      {}
    );
    expect(IssueListItem).not.toHaveBeenCalled();
  });

  it('should show error when error', () => {
    (useIssues as jest.Mock).mockReturnValue([
      undefined,
      false,
      new Error('test error'),
      jest.fn(),
    ]);
    renderWithRouter(<IssuesPage />);
    expect(screen.getByText('test error')).toBeVisible();
    expect(Footer).toHaveBeenCalledWith({}, {});
    expect(Header).toHaveBeenCalledWith({}, {});
    expect(FiltersBar).toHaveBeenCalledWith(
      { filters: testFilters1, setFilters: expect.any(Function) },
      {}
    );
    expect(IssueListItem).not.toHaveBeenCalled();
  });

  it('should go to issue detail page when issue clicked', async () => {
    const { router } = renderWithRouter(<IssuesPage />, undefined, [
      '/?test=1',
    ]);
    await userEvent.click(screen.getByText('issue-list-item-26126'));
    expect(router.location?.pathname).toBe('/issue/26126');
    expect(router.location?.search).toBe('?test=1');
  });

  it('should load more items when load more clicked', async () => {
    const fetchMore = jest.fn();
    (useIssues as jest.Mock).mockReturnValue([
      testIssuesQueryResult1,
      false,
      undefined,
      fetchMore,
    ]);
    renderWithRouter(<IssuesPage />);
    await userEvent.click(screen.getByText('load more'));
    expect(fetchMore).toHaveBeenCalledWith();
  });

  it('should not show load more when no more pages', async () => {
    (useIssues as jest.Mock).mockReturnValue([
      testEmptyIssuesQueryResult1,
      false,
      undefined,
      jest.fn(),
    ]);
    renderWithRouter(<IssuesPage />);
    expect(screen.queryByText('load more')).toBe(null);
  });

  it('should show loading indicator when loading more', async () => {
    (useIssues as jest.Mock).mockReturnValue([
      testIssuesQueryResult1,
      true,
      undefined,
      jest.fn(),
    ]);
    renderWithRouter(<IssuesPage />);
    expect(screen.getByText('loading...')).toBeVisible();
    expect(screen.queryByText('load more')).toBe(null);
  });
});
