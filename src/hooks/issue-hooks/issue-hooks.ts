import { useQuery } from '@apollo/client';
import { ApolloError } from '@apollo/client/errors';
import { useCallback, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { IssueQueryResult, IssuesQueryResult } from '../../types/issue';
import { GetIssuesQuery, GetIssueQuery } from './queries';

export const useIssues = (): [
  IssuesQueryResult | undefined,
  boolean,
  ApolloError | undefined,
  () => void
] => {
  const {
    data,
    loading,
    error,
    fetchMore: queryFetchMore,
  } = useQuery<IssuesQueryResult>(GetIssuesQuery, {
    variables: {
      cursor: null,
    },
  });
  const fetchMore = useCallback(
    () =>
      queryFetchMore({
        variables: { cursor: data?.repository.issues.pageInfo.endCursor },
      }),
    [queryFetchMore, data]
  );
  return [data, loading, error, fetchMore];
};

export const useIssue = (
  issueNumber: number
): [
  IssueQueryResult | undefined,
  boolean,
  ApolloError | undefined,
  () => void
] => {
  const { data, loading, error, fetchMore } = useQuery<IssueQueryResult>(
    GetIssueQuery,
    {
      variables: {
        issueNumber,
        commentsCursor: null,
      },
    }
  );
  const fetchMoreComments = useCallback(
    () =>
      fetchMore({
        variables: {
          commentsCursor: data?.repository.issue.comments.pageInfo.endCursor,
        },
      }),
    [fetchMore, data]
  );
  return [data, loading, error, fetchMoreComments];
};

export const useIssueNumber = () => {
  const location = useLocation();
  return useMemo(
    () => parseInt(location.pathname.replace('/issue/', ''), 10),
    [location.pathname]
  );
};
