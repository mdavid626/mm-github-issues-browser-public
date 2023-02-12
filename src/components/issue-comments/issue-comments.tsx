import React from 'react';
import { useFetchMoreIssueComment } from '../../hooks/issue-hooks/issue-hooks';
import { Issue } from '../../types/issue';
import IssueCommentsItem from '../issue-comments-item/issue-comments-item';
import './issue-comments.css';

const IssueComments: React.FC<{
  issueNumber: number;
  comments: Issue['comments'];
}> = ({ issueNumber, comments }) => {
  const [fetchMoreComment, isFetchingMoreComment] =
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
            <IssueCommentsItem key={comment.id} comment={comment} />
          ))}
        </div>
      )}
      {comments.pageInfo.hasNextPage && !isFetchingMoreComment && (
        <div
          onClick={() => fetchMoreComment(comments.pageInfo.endCursor)}
          className="IssueComments-loadMore"
        >
          load more comments
        </div>
      )}
      {isFetchingMoreComment && (
        <div className="IssueComments-loading">loading...</div>
      )}
    </div>
  );
};

export default IssueComments;
