import React from 'react';
import { IssueState } from '../../types/issue';
import './issue-state-badge.css';

const stateLabels: Record<IssueState, string> = {
  CLOSED: 'closed',
  OPEN: 'open',
};

const IssueStateBadge: React.FC<{ state: IssueState }> = ({ state }) => (
  <div className={`IssueStateBadge IssueStateBadge--${state.toLowerCase()}`}>
    {stateLabels[state]}
  </div>
);

export default IssueStateBadge;
