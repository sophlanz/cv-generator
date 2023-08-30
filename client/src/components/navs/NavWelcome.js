import React from 'react'
import {Link} from "react-router-dom"
import HamburgerNav from './HamburgerNav';

export default function NavWelcome() {

    return (
        <>
            
              <nav className = 'navWelcome'>
             {/*  <h1><Link to={'/'}>CV CURATOR<span>.</span></Link></h1> */}
              {/*wrap each letter in a span for hover effect */}
                <a href="/login"><Link to={'/login'}>LOGIN</Link></a>
                <a href="/register"><Link to={'/register'}>SIGN UP</Link></a> 
                </nav>
               
                {/*hamburger nav for mobile view */}
                <HamburgerNav />
               
        </>
    )
}
