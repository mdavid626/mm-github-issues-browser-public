import { gql } from '@apollo/client';

export const GetIssuesQuery = gql`
  query getIssues($cursor: String, $states: [IssueState!]) {
    repository(owner: "facebook", name: "react") {
      id
      issues(
        first: 10
        after: $cursor
        states: $states
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
        }
        totalCount
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
        bodyText
        author {
          login
        }
        comments(first: 3, orderBy: { field: UPDATED_AT, direction: DESC }) {
          nodes {
            id
            createdAt
            bodyText
            author {
              login
            }
          }
          pageInfo {
            hasPreviousPage
            hasNextPage
            startCursor
            endCursor
          }
          totalCount
        }
      }
    }
  }
`;

export const GetCommentsQuery = gql`
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
            bodyText
            author {
              login
            }
          }
          pageInfo {
            hasPreviousPage
            hasNextPage
            startCursor
            endCursor
          }
          totalCount
        }
      }
    }
  }
`;
