import classnames from 'classnames';
import { format, parseISO } from 'date-fns';
import React from 'react';
import { IssueComment } from '../../types/issue-comment';
import './issue-comment-list-item.css';

const IssueCommentListItem: React.FC<{
  comment: IssueComment;
  className?: string;
}> = ({ comment, className }) => (
  <div
    className={classnames('IssueCommentListItem', className)}
    data-testid="IssueCommentListItem"
  >
    <div className="IssueCommentListItem-detail">
      <div>{comment.author.login}</div>
      <div>{format(parseISO(comment.createdAt), 'dd.MM.yyyy HH:mm')}</div>
    </div>
    <div className="IssueCommentListItem-comment">{comment.body}</div>
  </div>
);

export default IssueCommentListItem;
