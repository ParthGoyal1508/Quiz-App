import React, { Component } from 'react';
import './Viewuser.css';
import Navbar from './Navbar';
import PropTypes from 'prop-types';


class Leaderboard extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      loginstate:localStorage.getItem('Email'),
    }
  }

  static contextTypes = {
    router: PropTypes.object,
  }
  
  componentDidMount() {
    const request = new Request('http://127.0.0.1:8080/leaderboard');
    fetch(request)
      .then(response => response.json())
        .then(data => this.setState({data: data}));
  }

  render() {
    let x=null;
    if(this.state.loginstate!=null){
      x=(
        <div className="App">
       <div className="leaderboard">
        <h1>Leaderboard</h1>
       </div>
        <table className="table-hover">
          <thead>
            <tr>
              <th>Name</th>
              <th>Cricket Score</th>
              <th>Movies Score</th>
              <th>Harry-Potter Score</th>
              <th>Total Score</th>
            </tr>
          </thead>
          <tbody>{this.state.data.map((item, key) =>{
               return (
                  <tr key = {key}>
                      <td>{item.name}</td>
                      <td>{item.cricketscore}</td>
                      <td>{item.moviescore}</td>
                      <td>{item.harrypotterscore}</td>
                      <td>{item.cricketscore+item.moviescore+item.harrypotterscore}</td>
                  </tr>
                )
             })}
          </tbody>
       </table>
      </div>
      )
    } 
    let y=null;
    if(this.state.loginstate==null){
      y=(
        <div>
        <div className="error">
            <h1>
              You Don't Have Access to this Page!
            </h1>
        </div>
        </div>
      )
    }
    return (
      <div>
        <Navbar />
        {x}
        {y}
       </div>
    )
  }
}
export default Leaderboard;
