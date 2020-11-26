import React, { Component } from "react";
import axios from "axios";
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
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    routeChange = () =>{ 
        let path = `/Page`; 
        this.history.push(path);
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
            //Never will be executed
            console.log("response:" + JSON.stringify(response.data))
        })
        .catch(error=>{
            alert("Unauthorized attempt to reach content!");
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
            if(response.data.token != null){
                console.log("response:" + response.data.token);
                axios.get("http://localhost:51681/weatherforecast", { headers: {"Authorization" : `Bearer ${response.data.token}`} })
                .then(res => {
                    let temparr = [];
                    for(let i =0;i<res.data.length;i++){
                        temparr.push({date: res.data[i].date,temperatureC: res.data[i].temperatureC, summary: res.data[i].summary})
                    }
                this.setState({
                    weatherinfo: temparr
                });
                // if(this.state.weatherinfo != null){
                //     console.log("weatherinfo : "+ JSON.stringify(this.state.weatherinfo));
                // }
                // console.log(JSON.stringify(res.data));
            });
            }
        })
        .catch(error=>{
            this.setState({
                username: ""
              });
              this.setState({
                password: ""
              });
            alert("Invalid username or password! Please try again.");

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
                Date:<br></br>
                {JSON.stringify(this.state.weatherinfo[0].date)}<br></br>
                Temperature:<br></br>
                {this.state.weatherinfo[0].temperatureC}<br></br>
                Summary:<br></br>
                {this.state.weatherinfo[0].summary}<br></br>
            </div>
        )
    }
}