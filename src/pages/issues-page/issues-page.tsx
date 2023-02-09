import React from 'react';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import IssuesItem from '../../components/issues-item/issues-item';
import PageLoader from '../../components/page-loader/page-loader';
import { useIssues } from '../../hooks/issue-hooks/issue-hooks';
import './issues-page.css';

const IssuesPage = () => {
  const [issues, areIssuesFetching, issuesError] = useIssues();
  return (
    <div className="IssuesPage">
      <Header />
      <PageLoader
        isLoading={areIssuesFetching}
        errorMessage={issuesError?.message}
      >
        <div className="IssuesPage-content">
          <div className="IssuesPage-issues">
            {issues?.repository.issues.edges.map(({ node: issue }) => (
              <IssuesItem
                key={issue.id}
                issue={issue}
                className="IssuesPage-issue"
              />
            ))}
          </div>
        </div>
      </PageLoader>
      <Footer />
    </div>
  );
};

export default IssuesPage;
