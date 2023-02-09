import { parseISO, format } from 'date-fns';
import React from 'react';
import { IssueQueryItem } from '../../types/issue';
import IssueCommentItem from '../issue-comment-item/issue-comment-item';
import IssueStateBadge from '../issue-state-badge/issue-state-badge';
import './issue-item.css';

const IssueItem: React.FC<{ issue: IssueQueryItem }> = ({ issue }) => (
  <div className="IssueItem">
    <div className="IssueItem-titleAndState">
      <div className="IssueItem-title">{issue.title}</div>
      <IssueStateBadge state={issue.state} />
    </div>
    <div className="IssueItem-detail">
      <div>#{issue.number}</div>
      <div>{format(parseISO(issue.createdAt), 'dd.MM.yyyy HH:mm')}</div>
      <div>{issue.author.login}</div>
    </div>
    <div className="IssueItem-body">{issue.bodyText}</div>
    <div className="IssueItem-commentsTitle">Comments:</div>
    <div className="IssueItem-comments">
      {issue.comments.edges.map(({ node: comment }) => (
        <IssueCommentItem key={comment.id} comment={comment} />
      ))}
    </div>
  </div>
);

export default IssueItem;
