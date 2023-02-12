import { parseISO, format } from 'date-fns';
import React from 'react';
import { IssuesItem } from '../../types/issue';
import IssueStateBadge from '../issue-state-badge/issue-state-badge';
import './issue-list-item.css';

const IssueListItem: React.FC<{ issue: IssuesItem }> = ({ issue }) => (
  <div className="IssueListItem">
    <div className="IssueListItem-titleAndState">
      <div className="IssueListItem-title">{issue.title}</div>
      <IssueStateBadge state={issue.state} />
    </div>
    <div className="IssueListItem-detail">
      <div>#{issue.number}</div>
      <div>{format(parseISO(issue.createdAt), 'dd.MM.yyyy HH:mm')}</div>
      <div>{issue.author.login}</div>
    </div>
  </div>
);

export default IssueListItem;
