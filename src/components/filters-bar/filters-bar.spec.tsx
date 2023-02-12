import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { testFilters1 } from '../../test-data/filters';
import { Filters } from '../../types/filters';
import FiltersBar from './filters-bar';

describe('filters-bar', () => {
  afterEach(cleanup);

  it('should render', () => {
    const { asFragment } = render(
      <FiltersBar filters={testFilters1} setFilters={jest.fn()} />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render when no state filter', () => {
    const filters: Filters = {
      ...testFilters1,
      state: null,
    };
    render(<FiltersBar filters={filters} setFilters={jest.fn()} />);
    expect(screen.getByTestId('FiltersBar-state')).toHaveValue('');
  });

  it('should be able to select state filter', async () => {
    const filters: Filters = {
      ...testFilters1,
      state: 'open',
    };
    const setFilters = jest.fn();
    render(<FiltersBar filters={filters} setFilters={setFilters} />);
    await userEvent.selectOptions(
      screen.getByTestId('FiltersBar-state'),
      'Closed'
    );
    expect(setFilters).toHaveBeenCalledWith({
      ...filters,
      state: 'closed',
    });
  });

  it('should be able to select all state filter', async () => {
    const filters: Filters = {
      ...testFilters1,
      state: 'open',
    };
    const setFilters = jest.fn();
    render(<FiltersBar filters={filters} setFilters={setFilters} />);
    await userEvent.selectOptions(
      screen.getByTestId('FiltersBar-state'),
      'All'
    );
    expect(setFilters).toHaveBeenCalledWith({
      ...filters,
      state: null,
    });
  });

  it('should be able to search', async () => {
    const filters: Filters = {
      ...testFilters1,
      search: '',
    };
    const setFilters = jest.fn();
    render(<FiltersBar filters={filters} setFilters={setFilters} />);
    await userEvent.type(
      screen.getByPlaceholderText('Search...'),
      'test search'
    );
    await userEvent.click(screen.getByText('Search'));
    expect(setFilters).toHaveBeenCalledTimes(1);
    expect(setFilters).toHaveBeenCalledWith({
      ...filters,
      search: 'test search',
    });
  });

  it('should trigger search when pressing Enter in search box', async () => {
    const filters: Filters = {
      ...testFilters1,
      search: '',
    };
    const setFilters = jest.fn();
    render(<FiltersBar filters={filters} setFilters={setFilters} />);
    await userEvent.type(
      screen.getByPlaceholderText('Search...'),
      'test search{Enter}'
    );
    expect(setFilters).toHaveBeenCalledTimes(1);
    expect(setFilters).toHaveBeenCalledWith({
      ...filters,
      search: 'test search',
    });
  });

  it('should propagate search filter value to search text box when changes', () => {
    const filters: Filters = {
      ...testFilters1,
      search: 'test',
    };
    const { rerender } = render(
      <FiltersBar filters={filters} setFilters={jest.fn()} />
    );
    expect(screen.getByPlaceholderText('Search...')).toHaveValue('test');
    const updatedFilters: Filters = {
      ...testFilters1,
      search: 'new value',
    };
    rerender(<FiltersBar filters={updatedFilters} setFilters={jest.fn()} />);
    expect(screen.getByPlaceholderText('Search...')).toHaveValue('new value');
  });
});
