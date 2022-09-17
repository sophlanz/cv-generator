import React, { Component } from 'react'
import {Link} from "react-router-dom";

export default class Welcome extends Component {
    render() {
        return (
            <div>
                <li><Link to={'/register'}>Register</Link></li>
                <li><Link to={'/login'}>Login</Link></li>
                <li><Link to={'/create-cv'}>Start Creating </Link></li>
                <li><Link to={'/workstation'}>Work Station</Link></li>
            </div>
        )
    }
}
