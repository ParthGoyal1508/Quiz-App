import React, { Component } from "react";
import "./Home.css";
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import bg_img from './../bg2.png';
import Navbar from './Navbar';


export default class Logout extends Component {
    constructor() {
        super();
        this.state = {
        loginstate:localStorage.getItem('Email'),
        }
    }
    render() {
        return (
            <div>
                  <Navbar />
                    <div className="bgimg">
                            <img src={bg_img} width="1900" height="965" alt="Background"/>
                    </div>
                    {localStorage.removeItem("Email")}
            </div>
            )
    }
}