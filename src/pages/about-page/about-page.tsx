import React from 'react';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import './about-page.css';

const AboutPage: React.FC = () => (
  <div className="AboutPage">
    <Header />
    <div className="AboutPage-content">
      <div className="AboutPage-description">
        Simple React app to browser GitHub Issues
      </div>
      <div>
        Created by: <a href="https://mdavid626.com">Dávid Molnár</a>
      </div>
      <a href="https://github.com/mdavid626/mm-github-issues-browser">
        Source Code
      </a>
    </div>
    <Footer />
  </div>
);

export default AboutPage;
