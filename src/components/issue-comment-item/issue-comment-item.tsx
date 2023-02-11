import { format, parseISO } from 'date-fns';
import React from 'react';
import { IssueComment } from '../../types/issue';
import './issue-comment-item.css';

const IssueCommentItem: React.FC<{ comment: IssueComment }> = ({ comment }) => (
  <div className="IssueCommentItem">
    <div className="IssueCommentItem-comment">{comment.body}</div>
    <div className="IssueCommentItem-detail">
      <div>{comment.author.login}</div>
      <div>{format(parseISO(comment.createdAt), 'dd.MM.yyyy HH:mm')}</div>
    </div>
  </div>
);

export default IssueCommentItem;
