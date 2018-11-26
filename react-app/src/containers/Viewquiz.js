import React, { Component } from "react";
import Navbar from './Navbar';
import './Viewquiz.css';
import './Viewuser.css';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import PropTypes from 'prop-types';

export default class Viewquiz extends Component {
    constructor() {
        super();
        this.state = {
          formData: {
            g:"",
            qno:"",
          },
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
          console.log(f.options[f.selectedIndex]);
          if(f.options[f.selectedIndex]===undefined){
            var quizno = 1;
          }
          else{
            // eslint-disable-next-line
            var quizno =f.options[f.selectedIndex].value;
          }
          this.state.formData.g = genrename;
          this.state.formData.qno = quizno;
          // console.log(this.state.formData.g);
          // console.log(this.state.formData.qno);
          fetch('http://127.0.0.1:8080/quiz', {
            method: 'POST',
            body: JSON.stringify(this.state.formData),
          })
            .then(response => response.json())
              .then(quiz => this.setState({quiz: quiz}),this.setState({submitted: true}));
              
      }

    update(event,id){
        console.log(id);
        this.context.router.history.push("/updateque/"+id);
      }

    render() {
      let x=null;
      if(this.state.loginstate==="admin@admin.com"){
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
          {this.state.submitted &&
            <table className="table-hover">
          <thead>
            <tr>
              <th>Q No</th>
              <th>Question</th>
              <th>Option 1</th>
              <th>Option 2</th>
              <th>Option 3</th>
              <th>Option 4</th>
              <th>Ans 1</th>
              <th>Ans 2</th>
              <th>Ans 3</th>
              <th>Ans 4</th>
              <th>Update</th>
            </tr>
          </thead>
          {console.log(this.state.quiz)}
          <tbody>{this.state.quiz.map((item, key) =>{
               return (
                  <tr key = {key}>
                      {/* {console.log(item.id)} */}
                      <td>{item.quesno}</td>
                      <td>{item.question}</td>
                      <td>{item.optiona}</td>
                      <td>{item.optionb}</td>
                      <td>{item.optionc}</td>
                      <td>{item.optiond}</td>
                      <td>{item.ansa}</td>
                      <td>{item.ansb}</td>
                      <td>{item.ansc}</td>
                      <td>{item.ansd}</td>
                      <td><button onClick={(event)=>(this.update(event,item.id))}>Update</button></td>
                  </tr>
                )
             })}
          </tbody>
       </table>
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
        <Navbar/>
        {x}
        {y} 
      </div>
    );
  }
}
