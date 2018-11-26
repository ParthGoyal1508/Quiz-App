import React, { Component } from 'react';
import './Addque.css';
import Navbar from './Navbar';

class Updateque extends Component {
  constructor() {
    super();
    this.state = {
      formData: {
        id:"",
        genre:"",
        quizno:"",
        type:"",
        quesno:"",
        question:"",
        optiona:"",
        optionb:"",
        optionc:"",
        optiond:"",
        ansa:"",
        ansb:"",
        ansc:"",
        ansd:"",
      },
      data:[],
      submitted: false,
      loginstate:localStorage.getItem('Email'),
    }
    this.handlegChange = this.handlegChange.bind(this);
    this.handleqChange = this.handleqChange.bind(this);
    this.handletChange = this.handletChange.bind(this);
    this.handleqnoChange = this.handleqnoChange.bind(this);
    this.handlequeChange = this.handlequeChange.bind(this);
    this.handleoaChange = this.handleoaChange.bind(this);
    this.handleobChange = this.handleobChange.bind(this);
    this.handleocChange = this.handleocChange.bind(this);
    this.handleodChange = this.handleodChange.bind(this);
    this.handleaaChange = this.handleaaChange.bind(this);
    this.handleabChange = this.handleabChange.bind(this);
    this.handleacChange = this.handleacChange.bind(this);
    this.handleadChange = this.handleadChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(){
    //   console.log(this.props)
      var qid = this.props.match.params.id;
    //   console.log(qid);
      const request = new Request('http://127.0.0.1:8080/viewuser/'+qid);
    fetch(request)
      .then(response => response.json())
        .then(formData => this.setState({formData: formData}));
  }

  handleSubmit (event) {
    event.preventDefault();
    console.log(this.state.formData)
    fetch('http://localhost:8080/updateque', {
     method: 'POST',
     body: JSON.stringify(this.state.formData),
   })
      .then(response => {
        if(response.status >= 200 && response.status < 300)
          this.setState({submitted: true});
      });
  }

  handlegChange(event) {
    // this.state.formData.genre = event.target.value;
    this.state.formData.genre = event.target.value;

  }
  handleqChange(event) {
    this.state.formData.quizno = event.target.value;
  }
  handletChange(event) {
    this.state.formData.type = event.target.value;
  }
  handleqnoChange(event) {
    this.state.formData.quesno = event.target.value;
    // this.state.data.quesno = event.target.value;

  }
  handlequeChange(event) {
    this.state.formData.question = event.target.value;
  }
  handleoaChange(event) {
    this.state.formData.optiona = event.target.value;
  }
  handleobChange(event) {
    this.state.formData.optionb = event.target.value;
  }
  handleocChange(event) {
    this.state.formData.optionc = event.target.value;
  }
  handleodChange(event) {
    this.state.formData.optiond = event.target.value;
  }
  handleaaChange(event) {
    this.state.formData.ansa = event.target.value;
  }
  handleabChange(event) {
    this.state.formData.ansb = event.target.value;
  }
  handleacChange(event) {
    this.state.formData.ansc = event.target.value;
  }
  handleadChange(event) {
    this.state.formData.ansd = event.target.value;
  }
  
  

  render() {
    let x=null;
    if(this.state.loginstate==="admin@admin.com"){
      x=(
        <div className="App">
          <header className="App-header">
            <h1 className="App-title">Update the Question</h1>
          </header>
          <br/><br/>
          <div className="formContainer">
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                  <label>Genre</label>
                  <input id="genre" type="text" className="form-control" placeholder={this.state.formData.genre} value={this.state.genre}  onChange={this.handlegChange}/>
              </div>
              <div className="form-group">
                  <label>Quiz No</label>
                  <input type="text" className="form-control" placeholder={this.state.formData.quizno} value={this.state.quizno} onChange={this.handleqChange}/>
              </div>
              <div className="form-group">
                  <label>Type: 1 for Single Choice & 2 for Multiple Choice</label>
                  <input type="text" className="form-control" placeholder={this.state.formData.type} value={this.state.type} onChange={this.handletChange}/>
              </div>
              <div className="form-group">
                  <label>Question No</label>
                  <input type="text" className="form-control" placeholder={this.state.formData.quesno} value={this.state.quesno} onChange={this.handleqnoChange}/>
              </div>
              <div className="form-group">
                  <label>Question</label>
                  <input type="text" className="form-control" placeholder={this.state.formData.question} value={this.state.question} onChange={this.handlequeChange}/>
              </div>
              <div className="form-group">
                  <label>Option 1</label>
                  <input type="text" className="form-control" placeholder={this.state.formData.optiona} value={this.state.optiona} onChange={this.handleoaChange}/>
              </div>
              <div className="form-group">
                  <label>Option 2</label>
                  <input type="text" className="form-control" placeholder={this.state.formData.optionb} value={this.state.optionb} onChange={this.handleobChange}/>
              </div>
              <div className="form-group">
                  <label>Option 3</label>
                  <input type="text" className="form-control" placeholder={this.state.formData.optionc} value={this.state.optionc} onChange={this.handleocChange}/>
              </div>
              <div className="form-group">
                  <label>Option 4</label>
                  <input type="text" className="form-control" placeholder={this.state.formData.optiond} value={this.state.optiond} onChange={this.handleodChange}/>
              </div>
              <div className="form-group">
                  <label>Answer 1: Type 1 if Option1 in correct or 0 if it is Incorrect. </label>
                  <input type="text" className="form-control" placeholder={this.state.formData.ansa} value={this.state.ansa} onChange={this.handleaaChange}/>
              </div>
              <div className="form-group">
                  <label>Answer 2: Type 1 if Option2 in correct or 0 if it is Incorrect. </label>
                  <input type="text" className="form-control" placeholder={this.state.formData.ansb} value={this.state.ansb} onChange={this.handleabChange}/>
              </div>
              <div className="form-group">
                  <label>Answer 3: Type 1 if Option3 in correct or 0 if it is Incorrect. </label>
                  <input type="text" className="form-control" placeholder={this.state.formData.ansc} value={this.state.ansc} onChange={this.handleacChange}/>
              </div>
              <div className="form-group">
                  <label>Answer 4: Type 1 if Option4 in correct or 0 if it is Incorrect. </label>
                  <input type="text" className="form-control" placeholder={this.state.formData.ansd} value={this.state.ansd} onChange={this.handleadChange}/>
              </div>
                  <button type="submit" className="btn btn-default">Submit</button>
            </form>
            </div>
            {this.state.submitted &&
            <div className="App">
              <h1>Question Updated Successfully!</h1>
            </div>
            }
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

export default Updateque;
