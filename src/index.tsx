/* istanbul ignore file */
import { ApolloClient, ApolloProvider } from '@apollo/client';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import createApolloMemoryCache from './apollo-memory-cache';
import ErrorBoundary from './components/error-boundary/error-boundary';
import './index.css';
import Routes from './router/routes';

const base64Token = process.env.REACT_APP_GITHUB_TOKEN_BASE64 || '';

const client = new ApolloClient({
  uri: 'https://api.github.com/graphql',
  cache: createApolloMemoryCache(),
  headers: {
    Authorization: `Bearer ${atob(base64Token)}`,
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
