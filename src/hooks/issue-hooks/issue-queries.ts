import { gql } from '@apollo/client';

export const GetIssuesQuery = gql`
  query getIssues($cursor: String, $search: String!) {
    search(query: $search, after: $cursor, type: ISSUE, first: 10) {
      issueCount
      nodes {
        ... on Issue {
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
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

export const GetIssueQuery = gql`
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
        body
        author {
          login
        }
        comments(first: 3, orderBy: { field: UPDATED_AT, direction: DESC }) {
          nodes {
            id
            createdAt
            body
            author {
              login
            }
          }
          pageInfo {
            hasNextPage
            endCursor
          }
          totalCount
        }
      }
    }
  }
`;

export const GetIssueCommentsQuery = gql`
  query getIssueComments($issueNumber: Int!, $commentsCursor: String) {
    repository(owner: "facebook", name: "react") {
      id
      issue(number: $issueNumber) {
        id
        comments(
          first: 3
          after: $commentsCursor
          orderBy: { field: UPDATED_AT, direction: DESC }
        ) {
          nodes {
            id
            createdAt
            body
            author {
              login
            }
          }
          pageInfo {
            hasNextPage
            endCursor
          }
          totalCount
        }
      }
    }
  }
`;
