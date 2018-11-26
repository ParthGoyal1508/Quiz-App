import React, { Component } from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';


export default class Nav extends Component {
    render() {
      return (
          <div>
            <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
              <Link to ={'/'} className="navbar-brand">Quiz App</Link>
              <div className="collapse navbar-collapse" id="navbarCollapse">
                  <ul className="navbar-nav mr-auto">
                  </ul>
                  <ul className="nav-link navbar-nav navbar-right">
                  <Link to ={'signup'} className="nav-link">Register</Link>
                  <Link to ={'login'} className="nav-link">Login</Link>
                  </ul>
              </div>
            </nav>
          </div>
      );
    }
}