import React from 'react';
import { useFetchMoreIssueComment } from '../../hooks/issue-hooks/issue-hooks';
import { IssueQueryItem } from '../../types/issue';
import IssueCommentItem from '../issue-comment-item/issue-comment-item';
import './issue-comments.css';

const IssueComments: React.FC<{
  issueNumber: number;
  comments: IssueQueryItem['comments'];
}> = ({ issueNumber, comments }) => {
  const [fetchMoreComments, isFetchingMoreComments] =
    useFetchMoreIssueComment(issueNumber);
  return (
    <div className="IssueComments">
      <div className="IssueComments-title">
        Comments ({comments.totalCount})
      </div>
      {comments.nodes.length === 0 ? (
        <div>No comments yet</div>
      ) : (
        <div className="IssueComments-comments">
          {comments.nodes.map((comment) => (
            <IssueCommentItem key={comment.id} comment={comment} />
          ))}
        </div>
      )}
      {comments.pageInfo.hasNextPage && !isFetchingMoreComments && (
        <div
          onClick={() => fetchMoreComments(comments.pageInfo.endCursor)}
          className="IssueComments-loadMore"
        >
          load more comments
        </div>
      )}
      {isFetchingMoreComments && (
        <div className="IssueComments-loading">loading...</div>
      )}
    </div>
  );
};

export default IssueComments;
