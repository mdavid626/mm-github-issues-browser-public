import { cleanup, render, screen } from '@testing-library/react';
import React from 'react';
import { testIssueComment1 } from '../../test-data/issue-comments';
import IssueCommentsItem from './issue-comments-item';

describe('issue-comments-item', () => {
  afterEach(cleanup);

  it('should render', () => {
    const { asFragment } = render(
      <IssueCommentsItem comment={testIssueComment1} />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render custom class name', () => {
    render(
      <IssueCommentsItem comment={testIssueComment1} className="myClassName" />
    );
    expect(screen.getByTestId('IssueCommentsItem')).toHaveClass('myClassName');
  });
});
