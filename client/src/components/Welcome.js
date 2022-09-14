import React, { Component } from 'react'
import {Link} from "react-router-dom";

export default class Welcome extends Component {
    render() {
        return (
            <div>
                <li><Link to={'/register'}>Register</Link></li>
                <li><Link to={'/signin'}>Signin</Link></li>
                <li><Link to={'/create-cv'}>Start Creating </Link></li>
            </div>
        )
    }
}
