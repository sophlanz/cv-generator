import React from 'react'
import {Link} from "react-router-dom";
export default function NavWelcome() {
    return (
        <>
              <nav className = 'navWelcome'>
                <a><Link to={'/login'}>Login</Link></a>
                <a><Link to={'/register'}>Signup</Link></a>
{/*                 <li><Link to={'/create-cv'}>Start Creating </Link></li>
                    <li><Link to={'/workstation'}>Work Station</Link></li> */}
                </nav>
        </>
    )
}
