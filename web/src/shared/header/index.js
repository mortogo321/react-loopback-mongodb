import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import logo from '../../assets/images/logo.svg';

class Header extends Component {
  render() {
    return (
      <div className="py-5 text-center">
        <img className="logo mx-auto mb-4" src={logo} alt="" />
        <h2>The Demo</h2>
        <p className="lead">
          React + Loopback + MongoDB
        </p>

        <Link to="/" className="btn btn-outline-secondary btn-lg mr-2">
          <i className="fas fa-home"></i>
        </Link>

        <a href="https://github.com/sekseason/react-loopback-mongodb" role="button" className="btn btn-secondary btn-lg" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-github"></i>
          View Source
        </a>
      </div>
    )
  }
}

export default Header;