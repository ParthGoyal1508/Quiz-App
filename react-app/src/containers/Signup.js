import React, { Component } from "react";
import { Link } from 'react-router-dom';
import "./Login.css";
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import img from './images2.jpg';
import Navbar from "./Navbar";



export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
          formData: {
						email: "",
						password: "",
						name: "",
					},
					submitted: false,
					initial: true,
          loginstate:localStorage.getItem('Email'),

				}
				this.handleEChange = this.handleEChange.bind(this);
				this.handlePChange = this.handlePChange.bind(this);
				this.handleNChange = this.handleNChange.bind(this);
				this.handleSubmit = this.handleSubmit.bind(this);
      }


      handleSubmit = event => {
				event.preventDefault();
				fetch('http://localhost:8080/signup', {
					method: 'POST',
					body: JSON.stringify(this.state.formData),
				})
					 .then(response => {
						 if(response.status >= 200 && response.status < 300){
							 this.setState({submitted: true });
							 this.setState({initial: false });
						 }
						 else{
							this.setState({submitted: false});
							this.setState({initial: false });

						 }
					 });
			}
			
			handleEChange(event) {
				this.state.formData.email = event.target.value;
			}
			handlePChange(event) {
				this.state.formData.password = event.target.value;
			}
			handleNChange(event) {
				this.state.formData.name = event.target.value;
			}

  render() {
	  let x= null;
	  if(this.state.loginstate==null){
		  x=(
			<div>
			<body className="my-login-page">
			<section className="h-100">
				<div className="container h-100">
					<div className="row justify-content-md-center h-100">
						<div className="card-wrapper">
							<div className="brand">
								<img src={img} alt="image_image" />
							</div>
							<div className="card fat">
								<div className="card-body">
									<h4 className="card-title">Register</h4>
									<form onSubmit={this.handleSubmit}>
										<div className="form-group">
											<label for="name">Name</label>
											<input id="name" type="text" className="form-control" name="name" 
											value={this.state.name} onChange={this.handleNChange} required autofocus />
										</div>

										<div className="form-group">
											<label for="email">E-Mail Address</label>
											<input id="email" type="email" className="form-control" name="email"
											value={this.state.email} onChange={this.handleEChange} required />
										</div>

										<div className="form-group">
											<label for="password">Password</label>
											<input id="password" type="password" className="form-control" name="password" value={this.state.password} onChange={this.handlePChange} required />
										</div>

										<div className="form-group no-margin">
											<button type="submit" className="btn btn-primary btn-block">
												Register
											</button>
										</div>
										<div className="margin-top20 text-center">
											Already have an account? 
											<Link to ={'login'}>Login</Link>
										</div>
									</form>
								</div>
							</div>
						</div>
					</div>
				</div>
						{this.state.submitted ===true && this.state.initial ===false && 
										<div className="sucessfull">
											<h2>
												Successfully Registered!
											</h2>
										</div>
						}
						{this.state.submitted === false && this.state.initial ===false && 
										<div className="sucessfull">
										<h2>
											User Already Exists!
										</h2>
									</div>
						}
			</section>
			</body>
			</div>
		  )
	  }
	  let y=null;
	  if(this.state.loginstate!=null){
		  y=(
			<div>
			<div className="error">
				<h1>
				  Already Login!
				</h1>
			</div>
			</div>
		  )
	  }
      return(
		<div>
			<Navbar />
			{x}
			{y}
		</div>
      );
  }
}
