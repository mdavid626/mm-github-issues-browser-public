import { useQuery, gql } from '@apollo/client';
import { ApolloError } from '@apollo/client/errors';
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
  {
    repository(owner: "facebook", name: "react") {
      issue(number: 26077) {
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
      }
    }
  }
`;

export const useIssue = (): [
  IssueQueryResult | undefined,
  boolean,
  ApolloError | undefined
] => {
  const { data, loading, error } = useQuery<IssueQueryResult>(issueQuery);
  return [data, loading, error];
};
