import { useQuery, gql } from '@apollo/client';
import { ApolloError } from '@apollo/client/errors';
import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { IssueQueryResult, IssuesQueryResult } from '../../types/issue';

const issuesQuery = gql`
  query getIssues($cursor: String) {
    repository(owner: "facebook", name: "react") {
      id
      issues(
        first: 10
        after: $cursor
        orderBy: { field: CREATED_AT, direction: DESC }
      ) {
        nodes {
          id
          createdAt
          title
          state
          number
          url
          author {
            login
          }
        }
        pageInfo {
          hasNextPage
          startCursor
          endCursor
          hasPreviousPage
        }
        totalCount
      }
    }
  }
`;

export const useIssues = (): [
  IssuesQueryResult | undefined,
  boolean,
  ApolloError | undefined,
  (args: { variables: { cursor: string | null } }) => void
] => {
  const { data, loading, error, fetchMore } = useQuery<IssuesQueryResult>(
    issuesQuery,
    {
      variables: {
        cursor: null,
      },
    }
  );
  return [data, loading, error, fetchMore];
};

const issueQuery = gql`
  query getIssue($issueNumber: Int!, $commentsCursor: String) {
    repository(owner: "facebook", name: "react") {
      id
      issue(number: $issueNumber) {
        id
        createdAt
        title
        state
        number
        stateReason
        url
        bodyText
        author {
          login
        }
        comments(
          first: 3
          after: $commentsCursor
          orderBy: { field: UPDATED_AT, direction: DESC }
        ) {
          nodes {
            bodyText
            author {
              login
            }
            createdAt
            id
          }
          pageInfo {
            hasNextPage
            startCursor
            endCursor
            hasPreviousPage
          }
          totalCount
        }
      }
    }
  }
`;

export const useIssue = (
  issueNumber: number
): [
  IssueQueryResult | undefined,
  boolean,
  ApolloError | undefined,
  (args: { variables: { commentsCursor: string | null } }) => void
] => {
  const { data, loading, error, fetchMore } = useQuery<IssueQueryResult>(
    issueQuery,
    {
      variables: {
        issueNumber,
        commentsCursor: null,
      },
    }
  );
  return [data, loading, error, fetchMore];
};

export const useIssueNumber = () => {
  const location = useLocation();
  return useMemo(
    () => parseInt(location.pathname.replace('/issue/', ''), 10),
    [location.pathname]
  );
};
