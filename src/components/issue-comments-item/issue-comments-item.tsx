import classnames from 'classnames';
import { format, parseISO } from 'date-fns';
import React from 'react';
import { IssueComment } from '../../types/issue-comment';
import './issue-comments-item.css';

const IssueCommentsItem: React.FC<{
  comment: IssueComment;
  className?: string;
}> = ({ comment, className }) => (
  <div
    className={classnames('IssueCommentsItem', className)}
    data-testid="IssueCommentsItem"
  >
    <div className="IssueCommentsItem-detail">
      <div>{comment.author.login}</div>
      <div>{format(parseISO(comment.createdAt), 'dd.MM.yyyy HH:mm')}</div>
    </div>
    <div className="IssueCommentsItem-comment">{comment.body}</div>
  </div>
);

export default IssueCommentsItem;
