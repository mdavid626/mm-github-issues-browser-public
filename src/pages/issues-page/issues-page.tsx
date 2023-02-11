import React from 'react';
import { Link, useLocation } from 'react-router-dom';
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
  const location = useLocation();
  return (
    <div className="IssuesPage">
      <Header />
      <div className="IssuesPage-content">
        <div className="IssuesPage-filters">
          <FiltersBar filters={filters} setFilters={setFilters} />
          {queryResult && (
            <div className="IssuesPage-totalCount">
              Total Issues: {queryResult.search.issueCount}
            </div>
          )}
        </div>
        <PageLoader isLoading={!queryResult} errorMessage={queryError?.message}>
          {() => {
            const {
              search: { nodes: issues, pageInfo },
            } = queryResult!;
            return (
              <>
                <div className="IssuesPage-issues">
                  {issues.map((issue) => (
                    <Link
                      to={{
                        pathname: `/issue/${encodeURIComponent(issue.number)}`,
                        search: location.search,
                      }}
                      className="IssuesPage-issue"
                      key={issue.id}
                    >
                      <IssuesItem issue={issue} />
                    </Link>
                  ))}
                </div>
                {pageInfo.hasNextPage && !isFetching && (
                  <div
                    onClick={() => fetchMore()}
                    className="IssuesPage-loadMore"
                  >
                    load more
                  </div>
                )}
                {isFetching && (
                  <div className="IssuesPage-loading">loading...</div>
                )}
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
