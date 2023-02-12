import { cleanup, render, screen } from '@testing-library/react';
import React from 'react';
import { testIssueComment1 } from '../../test-data/issue-comments';
import IssueCommentListItem from './issue-comment-list-item';

describe('issue-comment-list-item', () => {
  afterEach(cleanup);

  it('should render', () => {
    const { asFragment } = render(
      <IssueCommentListItem comment={testIssueComment1} />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render custom class name', () => {
    render(
      <IssueCommentListItem
        comment={testIssueComment1}
        className="myClassName"
      />
    );
    expect(screen.getByTestId('IssueCommentListItem')).toHaveClass(
      'myClassName'
    );
  });
});
