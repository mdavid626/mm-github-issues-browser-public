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
  query getIssue($issueNumber: Int!) {
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
        comments(last: 20) {
          edges {
            node {
              bodyText
              author {
                login
              }
              createdAt
              id
            }
          }
        }
      }
    }
  }
`;

export const useIssue = (
  issueNumber: number
): [IssueQueryResult | undefined, boolean, ApolloError | undefined] => {
  const { data, loading, error } = useQuery<IssueQueryResult>(issueQuery, {
    variables: {
      issueNumber,
    },
  });
  return [data, loading, error];
};

export const useIssueNumber = () => {
  const location = useLocation();
  return useMemo(
    () => parseInt(location.pathname.replace('/issue/', ''), 10),
    [location.pathname]
  );
};
