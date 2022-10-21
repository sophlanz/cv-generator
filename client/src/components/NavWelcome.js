import React from 'react'
import {Link} from "react-router-dom";
export default function NavWelcome() {
    return (
        <>
              <nav className = 'navWelcome'>
              {/*wrap each letter in a span for hover effect */}
                <a><Link to={'/login'}>LOGIN</Link></a>
                <a><Link to={'/register'}>SIGNUP</Link></a>
{/*                 <li><Link to={'/create-cv'}>Start Creating </Link></li>
                    <li><Link to={'/workstation'}>Work Station</Link></li> */}
                </nav>
        </>
    )
}
