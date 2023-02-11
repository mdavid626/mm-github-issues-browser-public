import React from 'react';
import { useMatches, useNavigate } from 'react-router-dom';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import IssueItem from '../../components/issue-item/issue-item';
import PageLoader from '../../components/page-loader/page-loader';
import { useIssue, useIssueNumber } from '../../hooks/issue-hooks/issue-hooks';
import './issue-page.css';

const IssuePage = () => {
  const issueNumber = useIssueNumber();
  const [issue, isIssueFetching, issueError, fetchMore] = useIssue(issueNumber);
  const navigate = useNavigate();
  return (
    <div className="IssuePage">
      <Header />
      <PageLoader
        isLoading={isIssueFetching}
        errorMessage={issueError?.message}
      >
        <div className="IssuePage-content">
          <div onClick={() => navigate(-1)} className="IssuePage-back">
            Back to issues
          </div>
          {issue && (
            <IssueItem issue={issue.repository.issue} fetchMore={fetchMore} />
          )}
        </div>
      </PageLoader>
      <Footer />
    </div>
  );
};

export default IssuePage;
