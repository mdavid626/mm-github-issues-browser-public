import { useQuery, gql } from '@apollo/client';
import { ApolloError } from '@apollo/client/errors';
import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { IssueQueryResult, IssuesQueryResult } from '../../types/issue';

const issuesQuery = gql`
  query {
    repository(owner: "facebook", name: "react") {
      issues(last: 20) {
        edges {
          node {
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
        }
      }
    }
  }
`;

export const useIssues = (): [
  IssuesQueryResult | undefined,
  boolean,
  ApolloError | undefined
] => {
  const { data, loading, error } = useQuery<IssuesQueryResult>(issuesQuery);
  return [data, loading, error];
};

const issueQuery = gql`
  query Issue($issueNumber: Int!) {
    repository(owner: "facebook", name: "react") {
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
