import React, { Component } from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';


export default class Navbar extends Component {
        constructor() {
          super();
          this.state = {
            loginstate:localStorage.getItem('Email'),
          }
        }
    render() {
      let x = null;
      if(this.state.loginstate == null)
      {
        x = (
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
      let y = null;
      if(this.state.loginstate === "admin@admin.com"){
        y= (
          <div>
          <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
            <Link to ={'/'} className="navbar-brand">Quiz App</Link>
            <Link to ={'/playquiz'} className="navbar-brand">Play Quiz</Link>
            <div className="collapse navbar-collapse" id="navbarCollapse">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                <Link to ={'/addque'} className="nav-link">Add Question</Link>
                </li>
                <li className="nav-item">
                <Link to ={'/deleteque'} className="nav-link">Delete Question</Link>
                </li>
                <li className="nav-item">
                <Link to ={'/viewuser'} className="nav-link">View Users</Link>
                </li>
                <li className="nav-item">
                <Link to ={'/deleteuser'} className="nav-link">Delete Users</Link>
                </li>
                <li className="nav-item">
                <Link to ={'/viewquiz'} className="nav-link">View & Update Quiz</Link>
                </li>
                <li className="nav-item">
                <Link to ={'/deletequiz'} className="nav-link">Delete Quiz</Link>
                </li>
                <li className="nav-item">
                <Link to ={'/leaderboard'} className="nav-link">LeaderBoard</Link>
                </li>
                </ul>
                <ul className="nav-link navbar-nav navbar-right">
               <a href="/logout" className="nav-link">Logout</a>
                </ul>
            </div>
          </nav>
        </div>
        )
      }
      let z = null;
      if(this.state.loginstate !== null && this.state.loginstate !== "admin@admin.com"){
        z=(
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
        )
      }
      return (
        <div>
          {x}
          {y}
          {z}
      </div>
      );
    }
}