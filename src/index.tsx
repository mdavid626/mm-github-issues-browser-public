/* istanbul ignore file */
import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import ErrorBoundary from './components/error-boundary/error-boundary';
import './index.css';
import Routes from './router/routes';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <HashRouter>
        <Routes />
      </HashRouter>
    </ErrorBoundary>
  </React.StrictMode>
);
