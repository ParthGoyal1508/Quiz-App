import React, { Component } from 'react';
import './Addque.css';
import Navbar from './Navbar';

class Deleteque extends Component {
  constructor() {
    super();
    this.state = {
      formData: {
        g:"",
        qno:"",
      },
      submitted: false,
      loginstate:localStorage.getItem('Email'),
      
    }
    this.handlegChange = this.handlegChange.bind(this);
    this.handleqChange = this.handleqChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit (event) {
    event.preventDefault();
    fetch('http://localhost:8080/deletequiz', {
     method: 'POST',
     body: JSON.stringify(this.state.formData),
   })
      .then(response => {
        if(response.status >= 200 && response.status < 300)
          this.setState({submitted: true});
      });
  }

  handlegChange(event) {
    this.state.formData.g = event.target.value;
  }
  handleqChange(event) {
    this.state.formData.qno = event.target.value;
  }
 
  render() {
    let x=null;
    if(this.state.loginstate==="admin@admin.com"){
      x=(
        <div className="App">
        <header className="App-header">
          <h1 className="App-title">Delete a Quiz</h1>
        </header>
        <br/><br/>
        <div className="formContainer">
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
                <label>Genre</label>
                <input type="text" className="form-control" value={this.state.g} onChange={this.handlegChange}/>
            </div>
            <div className="form-group">
                <label>Quiz No</label>
                <input type="text" className="form-control" value={this.state.qno} onChange={this.handleqChange}/>
            </div>
                <button type="submit" className="btn btn-default">Submit</button>
          </form>
        </div>
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
      <Navbar />
        {x}
        {y}
    </div>
    );
  }
}

export default Deleteque;
