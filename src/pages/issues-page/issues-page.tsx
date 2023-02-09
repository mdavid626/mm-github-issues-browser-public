import { useQuery, gql } from '@apollo/client';
import React from 'react';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import './issues-page.css';

const GET_LOCATIONS = gql`
  query {
    repository(owner: "octocat", name: "Hello-World") {
      issues(last: 20, states: CLOSED) {
        edges {
          node {
            title
            url
            labels(first: 5) {
              edges {
                node {
                  name
                }
              }
            }
          }
        }
      }
    }
  }
`;

const IssuesPage = () => {
  const { data } = useQuery(GET_LOCATIONS);
  return (
    <div className="IssuesPage">
      <Header />
      <div className="IssuesPage-content">{JSON.stringify(data)}</div>
      <Footer />
    </div>
  );
};

export default IssuesPage;
