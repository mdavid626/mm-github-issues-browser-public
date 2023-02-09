import { cleanup } from '@testing-library/react';
import React from 'react';
import { renderWithRouter } from '../../testing-library/render';
import Header from './header';

describe('header', () => {
  afterEach(cleanup);
  afterEach(jest.resetAllMocks);

  it('should render', () => {
    const { asFragment } = renderWithRouter(<Header />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should highlight about page when on about page', () => {
    const { getByText } = renderWithRouter(<Header />, undefined, ['/about']);
    expect(getByText('React GitHub Issues')).not.toHaveClass('Header-selectedLink');
    expect(getByText('About')).toHaveClass('Header-selectedLink');
  });

  it('should highlight issues page when on issue detail page', () => {
    const { getByText } = renderWithRouter(<Header />, undefined, ['/issue/1']);
    expect(getByText('React GitHub Issues')).toHaveClass('Header-selectedLink');
    expect(getByText('About')).not.toHaveClass('Header-selectedLink');
  });
});
