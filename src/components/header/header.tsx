import classnames from 'classnames';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './header.css';

const links = [
  { path: '/', title: 'GitHub Issues' },
  { path: '/about', title: 'About' },
];

const Header: React.FC = () => {
  const location = useLocation();
  return (
    <div className="Header">
      <div className="Header-title">MediaMarkt Interview Task</div>
      <div className="Header-navigation">
        <Link
          to="/"
          className={classnames('Header-link', {
            'Header-selectedLink':
              location.pathname === '/' ||
              location.pathname.startsWith('/issue'),
          })}
        >
          React GitHub Issues
        </Link>
        <Link
          to="/about"
          className={classnames('Header-link', {
            'Header-selectedLink': location.pathname === '/about',
          })}
        >
          About
        </Link>
      </div>
    </div>
  );
};

export default Header;
