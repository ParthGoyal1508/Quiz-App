import React, { Component } from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

export default class UserNav extends Component {
    render() {
      return (
          <div>
            <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
              <Link to ={'/'} className="navbar-brand">Quiz App</Link>
              <div className="collapse navbar-collapse" id="navbarCollapse">
                  <ul className="navbar-nav mr-auto">
                  <li className="nav-item">
                    <Link to ={'/playquiz'} className="navbar-brand">Play Quiz</Link>
                  </li>
                  <li className="nav-item">
                      <Link to ={'/leaderboard'} className="navbar-brand">LeaderBoard</Link>
                  </li>
                  </ul>
                  <ul className="nav-link navbar-nav navbar-right">
                  <a href="/logout" className="nav-link">Logout</a>
                  </ul>
              </div>
            </nav>
          </div>
      );
    }
}