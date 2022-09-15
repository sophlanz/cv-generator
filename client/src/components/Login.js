import React, { Component } from 'react'

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = { apiResponse: "" };
    }
    
    callAPI() {
        fetch('http://localhost:9000/login' , {
         method: "POST",
        headers: {
        'Content-type': 'application/json'
        } 
    }       
)}
    
    componentDidMount() {
        this.callAPI();
    }
    render() {
        return (
            <div>
                <form method="POST" action='http://localhost:9000/login'>
                    <label htmlFor="username">Username:
                        <input name="username" id="username" type="text"/>
                    </label>
                    <label htmlFor="password">Password:
                        <input name="password" id="password" type="password" autoComplete="on"/>
                    </label>
                </form>
            </div>
        )
    }
}
