import React from 'react';
import { useFetchMoreIssueComment } from '../../hooks/issue-hooks/issue-hooks';
import { Issue } from '../../types/issue';
import IssueCommentListItem from '../issue-comment-list-item/issue-comment-list-item';
import './issue-comment-list.css';

const IssueCommentList: React.FC<{
  issueNumber: number;
  comments: Issue['comments'];
}> = ({ issueNumber, comments }) => {
  const [fetchMoreComment, isFetchingMoreComment] =
    useFetchMoreIssueComment(issueNumber);
  return (
    <div className="IssueCommentList">
      <div className="IssueCommentList-title">
        Comments ({comments.totalCount})
      </div>
      {comments.nodes.length === 0 ? (
        <div>No comments yet</div>
      ) : (
        <div className="IssueCommentList-comments">
          {comments.nodes.map((comment) => (
            <IssueCommentListItem key={comment.id} comment={comment} />
          ))}
        </div>
      )}
      {comments.pageInfo.hasNextPage && !isFetchingMoreComment && (
        <div
          onClick={() => fetchMoreComment(comments.pageInfo.endCursor)}
          className="IssueCommentList-loadMore"
        >
          load more comments
        </div>
      )}
      {isFetchingMoreComment && (
        <div className="IssueCommentList-loading">loading...</div>
      )}
    </div>
  );
};

export default IssueCommentList;
