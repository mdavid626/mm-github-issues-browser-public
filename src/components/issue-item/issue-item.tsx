import { parseISO, format } from 'date-fns';
import React from 'react';
import { useFetchMoreIssueComment } from '../../hooks/issue-hooks/issue-hooks';
import { IssueQueryItem } from '../../types/issue';
import IssueCommentItem from '../issue-comment-item/issue-comment-item';
import IssueStateBadge from '../issue-state-badge/issue-state-badge';
import './issue-item.css';

const IssueItem: React.FC<{
  issue: IssueQueryItem;
}> = ({ issue }) => {
  const [fetchMoreComments, isFetchingMoreComments] = useFetchMoreIssueComment(
    issue.number
  );
  return (
    <div className="IssueItem">
      <div className="IssueItem-header">
        <div className="IssueItem-titleAndState">
          <div className="IssueItem-title">{issue.title}</div>
          <IssueStateBadge state={issue.state} />
        </div>
        <div className="IssueItem-detail">
          <div>#{issue.number}</div>
          <div>{format(parseISO(issue.createdAt), 'dd.MM.yyyy HH:mm')}</div>
          <div>{issue.author.login}</div>
        </div>
      </div>
      <div className="IssueItem-body">{issue.body}</div>
      <div className="IssueItem-commentsTitle">
        Comments ({issue.comments.totalCount})
      </div>
      <div className="IssueItem-comments">
        {issue.comments.nodes.map((comment) => (
          <IssueCommentItem
            key={comment.id}
            comment={comment}
            className="IssueItem-comment"
          />
        ))}
      </div>
      {issue.comments.pageInfo.hasNextPage && !isFetchingMoreComments && (
        <div
          onClick={() => fetchMoreComments(issue.comments.pageInfo.endCursor)}
          className="IssueItem-loadMore"
        >
          load more comments
        </div>
      )}
      {isFetchingMoreComments && (
        <div className="IssueItem-loading">Loading...</div>
      )}
    </div>
  );
};

export default IssueItem;
