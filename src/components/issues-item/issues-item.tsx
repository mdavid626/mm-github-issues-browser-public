import { parseISO, format } from 'date-fns';
import React from 'react';
import { IssuesQueryItem } from '../../types/issue';
import IssueStateBadge from '../issue-state-badge/issue-state-badge';
import './issues-item.css';

const IssuesItem: React.FC<{ issue: IssuesQueryItem }> = ({ issue }) => (
  <div className="IssuesItem">
    <div className="IssuesItem-titleAndState">
      <div className="IssuesItem-title">{issue.title}</div>
      <IssueStateBadge state={issue.state} />
    </div>
    <div className="IssuesItem-detail">
      <div>#{issue.number}</div>
      <div>{format(parseISO(issue.createdAt), 'dd.MM.yyyy HH:mm')}</div>
      <div>{issue.author.login}</div>
    </div>
  </div>
);

export default IssuesItem;
