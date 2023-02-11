import React from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import IssueItem from '../../components/issue-item/issue-item';
import PageLoader from '../../components/page-loader/page-loader';
import { useIssue, useIssueNumber } from '../../hooks/issue-hooks/issue-hooks';
import './issue-page.css';

const IssuePage = () => {
  const issueNumber = useIssueNumber();
  const [queryResult, isFetching, queryError, fetchMoreComments] =
    useIssue(issueNumber);
  const navigate = useNavigate();
  return (
    <div className="IssuePage">
      <Header />
      <PageLoader isLoading={!queryResult} errorMessage={queryError?.message}>
        {() => (
          <div className="IssuePage-content">
            <div onClick={() => navigate(-1)} className="IssuePage-back">
              Back to issues
            </div>
            <IssueItem
              issue={queryResult!.repository.issue}
              fetchMoreComments={fetchMoreComments}
              isFetching={isFetching}
            />
          </div>
        )}
      </PageLoader>
      <Footer />
    </div>
  );
};

export default IssuePage;
