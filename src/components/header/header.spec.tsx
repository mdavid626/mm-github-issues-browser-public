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
});
