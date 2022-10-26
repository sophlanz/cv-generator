import React from 'react'
import {Link} from "react-router-dom";
export default function NavWelcome() {
    return (
        <>
          
            <nav className = 'navWorkstation'>
                <h1><a href="homepage"><Link to={'/'}>CV CURATOR<span>.</span></Link></a></h1>
              {/*wrap each letter in a span for hover effect */}
                <a href="logout"><Link to={'/logout'}>LOGOUT</Link></a>      
            </nav>
        </>
    )
}
