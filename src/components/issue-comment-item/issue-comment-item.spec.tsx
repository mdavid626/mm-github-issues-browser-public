import { cleanup, render, screen } from '@testing-library/react';
import React from 'react';
import { testIssueComment1 } from '../../test-data/issue-comments';
import IssueCommentItem from './issue-comment-item';

describe('issue-comment-item', () => {
  afterEach(cleanup);

  it('should render', () => {
    const { asFragment } = render(
      <IssueCommentItem comment={testIssueComment1} />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render custom class name', () => {
    render(
      <IssueCommentItem comment={testIssueComment1} className="myClassName" />
    );
    expect(screen.getByTestId('IssueCommentItem')).toHaveClass('myClassName');
  });
});
