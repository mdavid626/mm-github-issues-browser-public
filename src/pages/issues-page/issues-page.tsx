import React from 'react';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import './issues-page.css';

const IssuesPage = () => {
  return (
    <div className="IssuesPage">
      <Header />
      <div className="IssuesPage-content">content</div>
      <Footer />
    </div>
  );
};

export default IssuesPage;
