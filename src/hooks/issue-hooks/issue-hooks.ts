import { useLazyQuery, useQuery } from '@apollo/client';
import { ApolloError } from '@apollo/client/errors';
import { useCallback, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { Filters } from '../../types/filters';
import { IssueQueryResult, IssuesQueryResult } from '../../types/issue';
import {
  GetIssuesQuery,
  GetIssueQuery,
  GetIssueCommentsQuery,
} from './issue-queries';
import createSearchQueryText from './search-query-text';

export const useIssues = (
  filters: Filters
): [
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
      search: createSearchQueryText(filters),
    },
    notifyOnNetworkStatusChange: true,
  });
  const fetchMore = useCallback(
    () =>
      queryFetchMore({
        variables: {
          cursor: data?.search.pageInfo.endCursor,
        },
      }),
    [queryFetchMore, data]
  );
  return [data, loading, error, fetchMore];
};

export const useIssue = (
  issueNumber: number
): [IssueQueryResult | undefined, ApolloError | undefined] => {
  const { data, error } = useQuery<IssueQueryResult>(GetIssueQuery, {
    variables: {
      issueNumber,
    },
  });
  return [data, error];
};

export const useFetchMoreIssueComment = (
  issueNumber: number
): [(commentsCursor: string) => void, boolean] => {
  const [load, { loading }] = useLazyQuery<IssueQueryResult>(
    GetIssueCommentsQuery,
    {
      variables: {
        issueNumber,
      },
      fetchPolicy: 'network-only',
      onError: (error) => {
        alert(error.message);
      },
    }
  );
  const fetchMore = useCallback(
    (commentsCursor: string) =>
      load({
        variables: {
          commentsCursor,
        },
      }),
    [load]
  );
  return [fetchMore, loading];
};

export const useIssueNumber = () => {
  const location = useLocation();
  return useMemo(
    () => parseInt(location.pathname.replace('/issue/', ''), 10),
    [location.pathname]
  );
};
