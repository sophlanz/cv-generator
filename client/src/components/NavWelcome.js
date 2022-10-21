import React from 'react'
import {Link} from "react-router-dom";
export default function NavWelcome() {
    return (
        <>
              <nav className = 'navWelcome'>
              {/*wrap each letter in a span for hover effect */}
                <a><Link to={'/login'}>
                <span>L</span>
                <span>O</span>
                <span>G</span>
                <span>I</span>
                <span>N</span>
                </Link></a>
                <a><Link to={'/register'}>Signup</Link></a>
{/*                 <li><Link to={'/create-cv'}>Start Creating </Link></li>
                    <li><Link to={'/workstation'}>Work Station</Link></li> */}
                </nav>
        </>
    )
}
