import React from 'react';
import { Navigate, Route, Routes as RouterRoutes } from 'react-router-dom';
import AboutPage from '../pages/about-page/about-page';
import IssuePage from '../pages/issue-page/issue-page';
import IssuesPage from '../pages/issues-page/issues-page';

const ErrorPage: React.FC = () => {
  throw new Error('test error');
};

const Routes: React.FC = () => (
  <RouterRoutes>
    <Route path="/issue/:issueNumber" element={<IssuePage />}  />
    <Route path="/" element={<IssuesPage />} />
    <Route path="/about" element={<AboutPage />} />
    <Route path="/error" element={<ErrorPage />} />
    <Route path="*" element={<Navigate to="/" replace />} />
  </RouterRoutes>
);

export default Routes;
