import React from 'react'
import {Link} from "react-router-dom";
export default function NavLogin() {
    return (
        <nav className="navLoginRegister">
            <h1><Link to={'/'}>CV CURATOR<span>.</span></Link></h1>
        </nav>
    )
}