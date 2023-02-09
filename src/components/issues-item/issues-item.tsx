import classnames from 'classnames';
import { parseISO, format } from 'date-fns';
import React from 'react';
import { Link } from 'react-router-dom';
import { IssuesQueryItem } from '../../types/issue';
import './issues-item.css';

const stateLabels: Record<IssuesQueryItem['state'], string> = {
  CLOSED: 'closed',
  OPEN: 'open',
};

const IssuesItem: React.FC<{ issue: IssuesQueryItem; className?: string }> = ({
  issue,
  className,
}) => (
  <Link
    to={`/issue/${issue.id}`}
    className={classnames('IssuesItem', className)}
  >
    <div className="IssuesItem-titleAndState">
      <div className="IssuesItem-title">{issue.title}</div>
      <div
        className={`IssuesItem-state IssuesItem-state--${issue.state.toLowerCase()}`}
      >
        {stateLabels[issue.state]}
      </div>
    </div>
    <div className="IssuesItem-detail">
      <div>#{issue.number}</div>
      <div>{format(parseISO(issue.createdAt), 'dd.MM.yyyy HH:mm')}</div>
      <div>{issue.author.login}</div>
    </div>
  </Link>
);

export default IssuesItem;
