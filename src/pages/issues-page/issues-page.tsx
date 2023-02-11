import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import IssuesItem from '../../components/issues-item/issues-item';
import PageLoader from '../../components/page-loader/page-loader';
import { useIssues } from '../../hooks/issue-hooks/issue-hooks';
import './issues-page.css';

const IssuesPage: React.FC = () => {
  const [issues, areIssuesFetching, issuesError, fetchMore] = useIssues();
  return (
    <div className="IssuesPage">
      <Header />
      <PageLoader
        isLoading={areIssuesFetching}
        errorMessage={issuesError?.message}
      >
        <div className="IssuesPage-content">
          <div className="IssuesPage-totalCount">
            Total Issues: {issues?.repository.issues.totalCount}
          </div>
          <div className="IssuesPage-issues">
            {issues?.repository.issues.nodes.map((issue) => (
              <Link
                to={`/issue/${encodeURIComponent(issue.number)}`}
                className="IssuesPage-issue"
                key={issue.id}
              >
                <IssuesItem issue={issue} />
              </Link>
            ))}
          </div>
          {issues?.repository.issues.pageInfo.hasNextPage && (
            <div onClick={() => fetchMore()} className="IssuesPage-fetchMore">
              Fetch More
            </div>
          )}
        </div>
      </PageLoader>
      <Footer />
    </div>
  );
};

export default IssuesPage;
