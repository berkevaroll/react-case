import React, { Component } from "react";
import axios from "axios";

export default class Login extends Component{

    constructor(props){
        super(props);

        this.state = {
            weatherdata:"",
            username:"",
            password:"",
            loginErrors:""
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    
    handleChange(event){
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    handleSubmitUnathorized(event){
        axios.get("http://localhost:51681/weatherforecast"
        )
        .then(response => {
            console.log("response:" + JSON.stringify(response.data))
        })
        .catch(error=>{
            console.log(error);
        });

        event.preventDefault();
    }
    handleSubmit(event){
        const{username, password} = this.state;
        axios.post("http://localhost:51681/api/Authentication/Login",
        {
           
                username:username,
                password:password
           
        })
        .then(response => {
            console.log("response:" + response.data.token);
            axios.get("http://localhost:51681/weatherforecast", { headers: {"Authorization" : `Bearer ${response.data.token}`} })
            .then(res => {
            console.log(JSON.stringify(res.data));});
            this.setState({ weatherdata: JSON.stringify(this.res.data) });
        })
        .catch(error=>{
            console.log(error);
        });

        event.preventDefault();
    }
    render() {

        return(
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input
                        type="username"
                        name="username"
                        placeholder="Username"
                        value={this.state.username}
                        onChange={this.handleChange}
                        required/><br/>
                    <input
                         type="password"
                         name="password"
                         placeholder="Password"
                         value={this.state.password}
                         onChange={this.handleChange}
                         required/>
                    <br/>
                         <button type="submit">Login(Go to an Authorized area)</button>
                </form><button  onClick={this.handleSubmitUnathorized}>Get weatherforecast Unathorized (Code 401)</button>
                <br></br>
                {this.weatherdata}
            </div>
        )
    }
}