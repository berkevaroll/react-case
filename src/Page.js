import React, { Component } from "react";
import axios from "axios";
import { Redirect } from 'react-router-dom';

export default class Login extends Component{

    constructor(props){
        super(props);

        this.state = {
            weatherinfo:[{
                date:"",
                temperatureC:"",
                summary:"",
            }],
            username:"",
            password:"",
            loginErrors:"",
            isAuth:false
        };
    }
    
    
    render() {

        return(
            <div>Other Page</div>
        )
    }
}