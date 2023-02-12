import { cleanup, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import IssueDetail from '../../components/issue-detail/issue-detail';
import { useIssue, useIssueNumber } from '../../hooks/issue-hooks/issue-hooks';
import { testIssueQueryResult1 } from '../../test-data/issues';
import { renderWithRouter } from '../../testing-library/render';
import IssuePage from './issue-page';

jest.mock('../../components/footer/footer');
jest.mock('../../components/header/header');
jest.mock('../../components/issue-detail/issue-detail');
jest.mock('../../hooks/issue-hooks/issue-hooks');
describe('issue-page', () => {
  beforeEach(() => {
    (Footer as jest.Mock).mockReturnValue(<div>footer</div>);
    (Header as jest.Mock).mockReturnValue(<div>header</div>);
    (IssueDetail as jest.Mock).mockReturnValue(<div>issue-detail</div>);
    (useIssueNumber as jest.Mock).mockReturnValue(1);
    (useIssue as jest.Mock).mockReturnValue([testIssueQueryResult1, undefined]);
  });
  afterEach(cleanup);
  afterEach(jest.resetAllMocks);

  it('should render', () => {
    const { asFragment } = renderWithRouter(<IssuePage />);
    expect(asFragment()).toMatchSnapshot();
    expect(useIssueNumber).toHaveBeenCalledWith();
    expect(useIssue).toHaveBeenCalledWith(1);
    expect(Footer).toHaveBeenCalledWith({}, {});
    expect(Header).toHaveBeenCalledWith({}, {});
    expect(IssueDetail).toHaveBeenCalledWith(
      { issue: testIssueQueryResult1.repository.issue },
      {}
    );
  });

  it('should render spinner when loading', () => {
    (useIssue as jest.Mock).mockReturnValue([undefined, undefined]);
    const { asFragment } = renderWithRouter(<IssuePage />);
    expect(asFragment()).toMatchSnapshot();
    expect(Footer).toHaveBeenCalledWith({}, {});
    expect(Header).toHaveBeenCalledWith({}, {});
    expect(IssueDetail).not.toHaveBeenCalled();
  });

  it('should show error when error', () => {
    (useIssue as jest.Mock).mockReturnValue([undefined, new Error('test error')]);
    renderWithRouter(<IssuePage />);
    expect(screen.getByText('test error')).toBeVisible();
    expect(Footer).toHaveBeenCalledWith({}, {});
    expect(Header).toHaveBeenCalledWith({}, {});
    expect(IssueDetail).not.toHaveBeenCalled();
  });

  it('should navigate back to issues when back clicked', async () => {
    const { router } = renderWithRouter(<IssuePage />, undefined, [
      '/issue/1?test=2',
    ]);
    await userEvent.click(screen.getByText('« back to issues'));
    expect(router.location?.pathname).toBe('/');
    expect(router.location?.search).toBe('?test=2');
  });
});
