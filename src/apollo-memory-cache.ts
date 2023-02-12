/* istanbul ignore file */
import { InMemoryCache } from '@apollo/client';
import { IssueQueryResult, IssuesQueryResult } from './types/issue';

const createCache = () =>
  new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          search: {
            keyArgs: ['query'],
            merge: (
              existing: IssuesQueryResult['search'] | undefined,
              incoming: IssuesQueryResult['search']
            ) => {
              return {
                ...incoming,
                nodes: [...(existing?.nodes ?? []), ...(incoming?.nodes ?? [])],
              };
            },
          },
        },
      },
      Issue: {
        fields: {
          comments: {
            keyArgs: false,
            merge: (
              existing:
                | IssueQueryResult['repository']['issue']['comments']
                | undefined,
              incoming: IssueQueryResult['repository']['issue']['comments']
            ) => ({
              ...incoming,
              nodes: [...(existing?.nodes ?? []), ...(incoming.nodes ?? [])],
            }),
          },
        },
      },
    },
  });

export default createCache;
