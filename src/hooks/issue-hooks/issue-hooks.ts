import { useQuery } from '@apollo/client';
import { ApolloError } from '@apollo/client/errors';
import { useCallback, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { Filters, StateFilter } from '../../types/filters';
import {
  IssueQueryResult,
  IssuesQueryResult,
  IssueState,
} from '../../types/issue';
import { GetIssuesQuery, GetIssueQuery, GetCommentsQuery } from './queries';

const stateFilterMap: Record<StateFilter, IssueState> = {
  open: 'OPEN',
  closed: 'CLOSED',
};

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
      states: stateFilterMap[filters.state!] || null,
    },
    notifyOnNetworkStatusChange: true,
  });
  const fetchMore = useCallback(
    () =>
      queryFetchMore({
        variables: {
          cursor: data?.repository.issues.pageInfo.endCursor,
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
  const { fetchMore: queryFetchMore, loading } = useQuery<IssueQueryResult>(
    GetCommentsQuery,
    {
      variables: {
        issueNumber,
      },
      skip: true,
      onError: (error) => {
        alert(error.message);
      },
    }
  );
  const fetchMore = useCallback(
    (commentsCursor: string) =>
      queryFetchMore({
        variables: {
          commentsCursor,
        },
      }),
    [queryFetchMore]
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
