import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import IssuesItem from '../../components/issues-item/issues-item';
import PageLoader from '../../components/page-loader/page-loader';
import { useIssues } from '../../hooks/issue-hooks/issue-hooks';
import './issues-page.css';

const IssuesPage: React.FC = () => {
  const [queryResult, isFetching, queryError, fetchMore] = useIssues();
  return (
    <div className="IssuesPage">
      <Header />
      <PageLoader
        isLoading={isFetching && !queryResult}
        errorMessage={queryError?.message}
      >
        {() => {
          const {
            repository: { issues },
          } = queryResult!;
          return (
            <div className="IssuesPage-content">
              <div className="IssuesPage-totalCount">
                Total Issues: {issues.totalCount}
              </div>
              <div className="IssuesPage-issues">
                {issues.nodes.map((issue) => (
                  <Link
                    to={`/issue/${encodeURIComponent(issue.number)}`}
                    className="IssuesPage-issue"
                    key={issue.id}
                  >
                    <IssuesItem issue={issue} />
                  </Link>
                ))}
              </div>
              {issues.pageInfo.hasNextPage && !isFetching && (
                <div
                  onClick={() => fetchMore()}
                  className="IssuesPage-fetchMore"
                >
                  Fetch More
                </div>
              )}
              {isFetching && <div>Loading...</div>}
            </div>
          );
        }}
      </PageLoader>
      <Footer />
    </div>
  );
};

export default IssuesPage;
