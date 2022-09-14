import React, { Component } from 'react'

export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state = { apiResponse: "" };
    }
    
    callAPI() {
        fetch("http://localhost:9000/register")
            .then(res => res.text())
            .then(res => this.setState({ apiResponse: res }));
    }
    
    componentWillMount() {
        this.callAPI();
    }
    render() {
        return (
            <div>
                <p>{this.state.apiResponse}</p>
                <form method="POST" action='/register'>
                    <label for="username">Username:
                        <input name="username" id="username" type="text"/>
                    </label>
                    <label for="password">Password:
                        <input name="password" id="password" type="password"/>
                    </label>
                    <button type="submit">Submit</button>
                </form>
            </div>
        )
    }
};
