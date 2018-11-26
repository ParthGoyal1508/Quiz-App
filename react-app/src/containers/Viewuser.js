import React, { Component } from 'react';
import './Viewuser.css';
import Navbar from './Navbar';
import PropTypes from 'prop-types';


class Viewuser extends Component {
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
    const request = new Request('http://127.0.0.1:8080/viewuser');
    fetch(request)
      .then(response => response.json())
        .then(data => this.setState({data: data}));
  }

  render() {
    let x=null;
    if(this.state.loginstate==="admin@admin.com"){
      x=(
        <div className="App">
        <header className="App-header">
          <h1 className="App-title">View All People</h1>
        </header>

        <table className="table-hover">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>{this.state.data.map((item, key) =>{
               return (
                  <tr key = {key}>
                      <td>{item.name}</td>
                      <td>{item.email}</td>
                  </tr>
                )
             })}
          </tbody>
       </table>
      </div>
      )
    }
    let y=null;
    if(this.state.loginstate!=="admin@admin.com"){
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
        <Navbar/>
        {x}
        {y}
      </div>
    );
  }
}

export default Viewuser;
