import React, { Component } from "react";
import Navbar from './Navbar';
import img from './image.jpg';
import audio from './audio.mp3';
import ReactAudioPlayer from 'react-audio-player';
import './Viewquiz.css';
import './Viewuser.css';
import './Playquiz.css'
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import PropTypes from 'prop-types';

export default class Startquiz extends Component {
    constructor() {
        super();
        this.state = {
          formData: {
            g:"",
            qno:"",
          },
          userans:[[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]],
          quiz:[],
          submitted: false,
          loginstate:localStorage.getItem('Email'),
          score:0,
          quizcomplete: false,
          scoreData:{
            user:"",
            genre:"",
            score:"",
          },
          updatescore: false,
        }
      this.handleValAchange = this.handleValAchange.bind(this);
      this.handleValBchange = this.handleValBchange.bind(this);
      this.handleValCchange = this.handleValCchange.bind(this);
      this.handleValDchange = this.handleValDchange.bind(this);
      this.anscheck = this.anscheck.bind(this);
      }
      
      static contextTypes = {
        router: PropTypes.object,
      }
      
  componentDidMount() {
    var genre = this.props.match.params.genrename;
    var quizno = this.props.match.params.quizno;
    this.state.formData.g=genre;
    this.state.formData.qno=quizno;
    fetch('http://127.0.0.1:8080/quiz', {
        method: 'POST',
        body: JSON.stringify(this.state.formData),
      })
        .then(response => response.json())
          .then(quiz => this.setState({quiz: quiz}),this.setState({submitted: true}));
  }

    handleValAchange(event,qno){
        // console.log(qno);
        let index =qno-1;
        let val =(this.state.userans[index][0]+1)%2;
        this.state.userans[index][0]=val;
        // console.log(this.state.userans[index][0]);
        // this.setState({userans[index][0]: val});
        // console.log(this.state.userans);
        // console.log(this.state.userans[index][0]);
        // console.log(val);
    }
    handleValBchange(event,qno){
        let index =qno-1;
        let val =(this.state.userans[index][1]+1)%2;
        this.state.userans[index][1]=val;
    }
    handleValCchange(event,qno){
        let index =qno-1;
        let val =(this.state.userans[index][2]+1)%2;
        this.state.userans[index][2]=val;
    }
    handleValDchange(event,qno){
        let index =qno-1;
        let val =(this.state.userans[index][3]+1)%2;
        this.state.userans[index][3]=val;
    }

    anscheck(event){
        event.preventDefault();
        console.log(this.state.quiz);
        console.log(this.state.userans);
        var total=this.state.quiz.length;
        var i;
        for(i=0;i<total;i++){
            if(this.state.quiz[i].ansa === this.state.userans[i][0] && this.state.quiz[i].ansb === this.state.userans[i][1] && this.state.quiz[i].ansc === this.state.userans[i][2] && this.state.quiz[i].ansd === this.state.userans[i][3]){
                this.state.score+=1;
            }
        }
        this.setState({quizcomplete: true});
        this.state.scoreData.user=this.state.loginstate;
        this.state.scoreData.genre=this.state.quiz[0].genre;
        this.state.scoreData.score=this.state.score;
        // console.log(this.state.scoreData.user);
        // console.log(this.state.scoreData.genre);
        // console.log(this.state.scoreData.score);
        fetch('http://localhost:8080/score', {
					method: 'POST',
					body: JSON.stringify(this.state.scoreData),
				})
					 .then(response => {
						 if(response.status >= 200 && response.status < 300){
                            this.setState({updatescore: true });
                        }
						 else{
                            this.setState({updatescore: false });
						 }
					 });
    }

    render() {
    return (
      <div>
            <Navbar/>
        {this.state.loginstate!=null &&
			<div>
            {this.state.submitted &&
            <div className="quizplay">
            <div className="headin">
                {this.state.quiz[0]!==undefined ? <h1>{this.state.quiz[0].genre} QUIZ {this.state.quiz[0].quizno} </h1>: <h1> </h1>}
            </div>
            <table className="table-hover">
            <tbody>{this.state.quiz.map((item, key) =>{
                return (
                    <div>
                       <header className="App-header">
                        <h1 >Question {item.quesno}</h1>
                        </header>
                        <div className="qtype">
                        {item.type== 2?<h4>Multiple Correct</h4>:<h4>Single Correct</h4>}
                        <h5>{item.question}</h5>
                        <div>
                            {item.question==="Identify the Character ?"?<img src={img} alt="Harry Potter" />:""}
                        </div>
                        <div>
                            {item.question==="Identify the Movie Name by Song?"?<ReactAudioPlayer src={audio} controls />:""}
                        </div>
                        <div className="checkbox c-checkbox">
                            <label>
                            <input type="checkbox" onChange={ (e)=>{this.handleValAchange(e,item.quesno) } }/>
                            <span className="fa fa-check"></span>
                            {item.optiona}
                            </label>
                        </div>
                        <div className="checkbox c-checkbox">
                            <label>
                            <input type="checkbox" onChange={ (e)=>{this.handleValBchange(e,item.quesno) } }/>
                            <span className="fa fa-check"></span>
                            {item.optionb}
                            </label>
                        </div>
                        <div className="checkbox c-checkbox">
                            <label>
                            <input type="checkbox" onChange={ (e)=>{this.handleValCchange(e,item.quesno) } }/>
                            <span className="fa fa-check"></span>
                            {item.optionc}
                            </label>
                        </div>
                        <div className="checkbox c-checkbox">
                            <label>
                            <input type="checkbox" onChange={ (e)=>{this.handleValDchange(e,item.quesno) } }/>
                            <span className="fa fa-check"></span>
                            {item.optiond}
                            </label>
                        </div>
                        </div> 
                    </div>
                );
                })}
            </tbody>
        </table>
        <div className="sbtbtn">
                <button type="button" className="btn btn-primary btn-block" onClick={(e)=>{this.anscheck(e)}}>
                Submit
                </button>
        </div>
        {this.state.quizcomplete=== true &&
        <div className="score">
           <h1> YOUR SCORE IS {this.state.score}</h1>
        </div>
        }
       </div>
          }
            </div>
        }
          {this.state.loginstate==null &&
          <div>
        <div className="error">
            <h1>
              You Don't Have Access to this Page!
            </h1>
        </div>
        </div>
    }
          </div>
    );
  }
}
