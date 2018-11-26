import React, { Component } from "react";
import Navbar from './Navbar';
import './Viewquiz.css';
import './Viewuser.css';
import './Playquiz.css'
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import PropTypes from 'prop-types';

export default class Playquiz extends Component {
    constructor() {
        super();
        this.state = {
          formData: {
            g:"",
            qno:"",
          },
          userans:[[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]],
          genre: [],
          quizname: [],
          quiz:[],
          submitted: false,
          loginstate:localStorage.getItem('Email'),
        }
      this.getquiz = this.getquiz.bind(this);
      this.getquizno = this.getquizno.bind(this);
      }
      
      static contextTypes = {
        router: PropTypes.object,
      }
      
  componentDidMount() {
    const request = new Request('http://127.0.0.1:8080/genre');
    fetch(request)
      .then(response => response.json())
        .then(genre => this.setState({genre: genre}));
  }

  getquizno(event){
    event.preventDefault();
    var e = document.getElementById("genrev") ;
    var strUser =e.options[e.selectedIndex].value;
    console.log(strUser);
    const request = new Request('http://127.0.0.1:8080/genre/'+strUser);
    fetch(request)
      .then(response => response.json())
        .then(quizname => this.setState({quizname: quizname}));
    console.log(this.state.quizname);
  }

  getquiz(event){
          event.preventDefault();
          var e = document.getElementById("genrev") ;
          var genrename =e.options[e.selectedIndex].value;
          var f = document.getElementById("quizno") ;
          if(f.options[f.selectedIndex]===undefined){
            var quizno = 1;
          }
          else{
            // eslint-disable-next-line
            var quizno =f.options[f.selectedIndex].value;
          }
          this.state.formData.g = genrename;
          this.state.formData.qno = quizno;
          this.context.router.history.push('/playquiz/'+genrename+'/'+quizno)
      }
    render() {
      let x=null;
      if(this.state.loginstate!=null){
        x=(
          <div>
          <form className ="quiz" onSubmit={this.getquiz}>
          <select id="genrev" onChange={this.getquizno}>
          {this.state.genre.map(function(item, key) {
              return (
                  <option value={item}>{item}</option>
              )
          })}
          </select>
          <select id="quizno">
          {this.state.quizname.map(function(item, key) {
              return (
                  <option value={item}>QUIZ {item}</option>
              )
          })}
          </select>
          <br/>
          <br/>
          <button type="submit" className="btn btn-primary btn-block" >
          Submit
          </button>
          </form>
          }
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
            <Navbar/>
            {x}
            {y}
          </div>
    );
  }
}
