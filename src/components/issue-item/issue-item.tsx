import { parseISO, format } from 'date-fns';
import React from 'react';
import { IssueQueryItem } from '../../types/issue';
import './issue-item.css';

const stateLabels: Record<IssueQueryItem['state'], string> = {
  CLOSED: 'closed',
  OPEN: 'open',
};

const IssueItem: React.FC<{ issue: IssueQueryItem }> = ({ issue }) => (
  <div className="IssueItem">
    <div className="IssueItem-titleAndState">
      <div className="IssueItem-title">{issue.title}</div>
      <div
        className={`IssueItem-state IssueItem-state--${issue.state.toLowerCase()}`}
      >
        {stateLabels[issue.state]}
      </div>
    </div>
    <div className="IssueItem-detail">
      <div>#{issue.number}</div>
      <div>{format(parseISO(issue.createdAt), 'dd.MM.yyyy HH:mm')}</div>
      <div>{issue.author.login}</div>
    </div>
    <div className="IssueItem-body">{issue.bodyText}</div>
  </div>
);

export default IssueItem;
