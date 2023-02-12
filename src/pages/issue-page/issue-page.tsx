import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import IssueDetail from '../../components/issue-detail/issue-detail';
import PageLoader from '../../components/page-loader/page-loader';
import { useIssue, useIssueNumber } from '../../hooks/issue-hooks/issue-hooks';
import './issue-page.css';

const IssuePage = () => {
  const issueNumber = useIssueNumber();
  const [queryResult, queryError] = useIssue(issueNumber);
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <div className="IssuePage">
      <Header />
      <PageLoader isLoading={!queryResult} errorMessage={queryError?.message}>
        {() => (
          <div className="IssuePage-content">
            <div
              onClick={() =>
                navigate({ pathname: '/', search: location.search })
              }
              className="IssuePage-back"
            >
              « back to issues
            </div>
            <IssueDetail issue={queryResult!.repository.issue} />
          </div>
        )}
      </PageLoader>
      <Footer />
    </div>
  );
};

export default IssuePage;
