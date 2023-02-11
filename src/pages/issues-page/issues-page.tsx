import React from 'react';
import { Link } from 'react-router-dom';
import FiltersBar from '../../components/filters-bar/filters-bar';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import IssuesItem from '../../components/issues-item/issues-item';
import PageLoader from '../../components/page-loader/page-loader';
import { useFilters } from '../../hooks/filter-hooks/filter-hooks';
import { useIssues } from '../../hooks/issue-hooks/issue-hooks';
import './issues-page.css';

const IssuesPage: React.FC = () => {
  const [filters, setFilters] = useFilters();
  const [queryResult, isFetching, queryError, fetchMore] = useIssues(filters);
  return (
    <div className="IssuesPage">
      <Header />
      <div className="IssuesPage-content">
        <div className="IssuesPage-filters">
          <FiltersBar filters={filters} setFilters={setFilters} />
          {queryResult && (
            <div className="IssuesPage-totalCount">
              Total Issues: {queryResult.repository.issues.totalCount}
            </div>
          )}
        </div>
        <PageLoader isLoading={!queryResult} errorMessage={queryError?.message}>
          {() => {
            const {
              repository: { issues },
            } = queryResult!;
            return (
              <>
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
              </>
            );
          }}
        </PageLoader>
      </div>
      <Footer />
    </div>
  );
};

export default IssuesPage;
