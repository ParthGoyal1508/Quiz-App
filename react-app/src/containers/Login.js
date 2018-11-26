import React, { Component } from "react";
import "./Login.css";
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import img from './images2.jpg';
import PropTypes from 'prop-types';
import Navbar from "./Navbar";

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      formData: {
        email: "",
        password: "",
      },
		 loggedin: false,
		 initial: true,
		 loginstate:localStorage.getItem('Email'),
    }
    this.handleEChange = this.handleEChange.bind(this);
		this.handlePChange = this.handlePChange.bind(this);
  }

	static contextTypes = {
		router: PropTypes.object,
	}

  handleEChange(event) {
    this.state.formData.email = event.target.value;
  }
  handlePChange(event) {
    this.state.formData.password = event.target.value;
  }

  handleSubmit = event => {
    event.preventDefault();
    fetch('http://localhost:8080/login', {
					method: 'POST',
					body: JSON.stringify(this.state.formData),
				})
					 .then(response => {
						 if(response.status >= 200 && response.status < 300){
							 this.setState({loggedin: true });
							 localStorage.setItem("Email",this.state.formData.email);
							 this.context.router.history.push('/');
						 }
						 else{
							 this.setState({initial: false});
						 }
					 });
  }

  render() {
		let x=null;
		if(this.state.loginstate==null){
			x=(
				<div>
					<section className="my-login-page">
					<div className="container h-100">
						<div className="row justify-content-md-center h-150">
							<div className="card-wrapper">
								<div className="brand">
									<img src={img} alt="image_img" />
								</div>
								<div className="card fat">
									<div className="card-body">
										<h4 className="card-title">Login</h4>
										<form onSubmit={this.handleSubmit}>
											<div className="form-group">
												<label for="email">E-Mail Address</label>
												<input id="email" type="email" className="form-control" name="email" value={this.state.email} onChange={this.handleEChange} required/>
											</div>
											<div className="form-group">
												<label for="password">Password
												</label>
												<input id="password" type="password" className="form-control" name="password" value={this.state.password} onChange={this.handlePChange} required/>
											</div>
											<div className="form-group no-margin">
												<button type="submit" className="btn btn-primary btn-block">
													Login
												</button>
											</div>
										</form>
										{this.state.initial===false &&
										<div>
											<div className="sucessfull">
											<h2>
												Invalid Credentials!
											</h2>
										</div>
										</div>
										}
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>
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
    return (
			<div>
      <Navbar />
			{x}
			{y}
	</div>
    );
  }
}
