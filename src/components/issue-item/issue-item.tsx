import { parseISO, format } from 'date-fns';
import React from 'react';
import { IssueQueryItem } from '../../types/issue';
import IssueCommentItem from '../issue-comment-item/issue-comment-item';
import IssueStateBadge from '../issue-state-badge/issue-state-badge';
import './issue-item.css';

const IssueItem: React.FC<{
  issue: IssueQueryItem;
  fetchMoreComments: () => void;
  isFetching?: boolean;
}> = ({ issue, fetchMoreComments, isFetching }) => (
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
    <div className="IssueItem-commentsTitle">
      Comments ({issue.comments.totalCount})
    </div>
    <div className="IssueItem-comments">
      {issue.comments.nodes.map((comment) => (
        <IssueCommentItem key={comment.id} comment={comment} />
      ))}
    </div>
    {issue.comments.pageInfo.hasNextPage && !isFetching && (
      <div onClick={() => fetchMoreComments()} className="IssueItem-fetchMore">
        Fetch More
      </div>
    )}
    {isFetching && <div>Loading...</div>}
  </div>
);

export default IssueItem;
