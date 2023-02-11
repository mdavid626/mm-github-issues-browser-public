/* istanbul ignore file */
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import ErrorBoundary from './components/error-boundary/error-boundary';
import './index.css';
import Routes from './router/routes';
import { IssueQueryResult, IssuesQueryResult } from './types/issue';

const client = new ApolloClient({
  uri: 'https://api.github.com/graphql',
  cache: new InMemoryCache({
    typePolicies: {
      Repository: {
        fields: {
          issues: {
            keyArgs: ['states'],
            merge: (
              existing: IssuesQueryResult['repository']['issues'],
              incoming: IssuesQueryResult['repository']['issues']
            ) => ({
              ...incoming,
              nodes: [...(existing?.nodes ?? []), ...(incoming.nodes ?? [])],
            }),
          },
        },
      },
      Issue: {
        fields: {
          comments: {
            keyArgs: false,
            merge: (
              existing: IssueQueryResult['repository']['issue']['comments'],
              incoming: IssueQueryResult['repository']['issue']['comments']
            ) => ({
              ...incoming,
              nodes: [...(existing?.nodes ?? []), ...(incoming.nodes ?? [])],
            }),
          },
        },
      },
    },
  }),
  headers: {
    Authorization: `Bearer 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`,
  },
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <ApolloProvider client={client}>
        <HashRouter>
          <Routes />
        </HashRouter>
      </ApolloProvider>
    </ErrorBoundary>
  </React.StrictMode>
);
