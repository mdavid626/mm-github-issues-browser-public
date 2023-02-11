import { useQuery } from '@apollo/client';
import { ApolloError } from '@apollo/client/errors';
import { useCallback, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { Filters } from '../../types/filters';
import { IssueQueryResult, IssuesQueryResult } from '../../types/issue';
import { SearchForIssues, GetIssueQuery, GetCommentsQuery } from './queries';

const getSearch = (filters: Filters) => {
  const search = filters.search
    ? `(in:title ${filters.search} OR in:body ${filters.search})`
    : '';
  const state = filters.state ? `state:${filters.state}` : '';
  return ['repo:facebook/react', 'type:issue', state, search]
    .filter((item) => item)
    .join(' ');
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
  } = useQuery<IssuesQueryResult>(SearchForIssues, {
    variables: {
      cursor: null,
      search: getSearch(filters),
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
