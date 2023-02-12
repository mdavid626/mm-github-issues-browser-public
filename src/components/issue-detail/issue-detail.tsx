import { parseISO, format } from 'date-fns';
import React from 'react';
import { Issue } from '../../types/issue';
import IssueCommentList from '../issue-comment-list/issue-comment-list';
import IssueStateBadge from '../issue-state-badge/issue-state-badge';
import './issue-detail.css';

const IssueDetail: React.FC<{
  issue: Issue;
}> = ({ issue }) => (
  <div className="IssueDetail">
    <div className="IssueDetail-header">
      <div className="IssueDetail-titleAndState">
        <div className="IssueDetail-title">{issue.title}</div>
        <IssueStateBadge state={issue.state} />
      </div>
      <div className="IssueDetail-detail">
        <div>#{issue.number}</div>
        <div>{format(parseISO(issue.createdAt), 'dd.MM.yyyy HH:mm')}</div>
        <div>{issue.author.login}</div>
      </div>
    </div>
    <div className="IssueDetail-body">{issue.body}</div>
    <IssueCommentList issueNumber={issue.number} comments={issue.comments} />
  </div>
);

export default IssueDetail;
