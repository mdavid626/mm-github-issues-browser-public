import classnames from 'classnames';
import { format, parseISO } from 'date-fns';
import React from 'react';
import { IssueComment } from '../../types/issue-comment';
import './issue-comment-item.css';

const IssueCommentItem: React.FC<{
  comment: IssueComment;
  className?: string;
}> = ({ comment, className }) => (
  <div
    className={classnames('IssueCommentItem', className)}
    data-testid="IssueCommentItem"
  >
    <div className="IssueCommentItem-detail">
      <div>{comment.author.login}</div>
      <div>{format(parseISO(comment.createdAt), 'dd.MM.yyyy HH:mm')}</div>
    </div>
    <div className="IssueCommentItem-comment">{comment.body}</div>
  </div>
);

export default IssueCommentItem;
