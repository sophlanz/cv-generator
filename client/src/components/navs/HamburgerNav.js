import React, { useState} from 'react'
import {Link} from "react-router-dom";
import { Sling as Hamburger } from 'hamburger-react'
export default function HamburgerNav() {
    const [isOpen, setOpen] = useState(false);
    return (
        <>
            
            {/*if hamburger is not open we don't want a background color. not open:black, open:white */}
              <nav className="hamburger" style={{backgroundColor: isOpen ? "black" : "inherit" ,
                                                    color: isOpen ? "white": "black",
                                                    /*move hamburger to the right */
                                                    position:"absolute",
                                                    right:"0px" ,
                                                    }}>
           
            
              {/*wrap each letter in a span for hover effect */}
              
                <Hamburger rounded label="Show Menu" distance="lg" easing="ease-in" toggled={isOpen} toggle={setOpen} direction="right" style={{position:"absolute", right:"0px"}}/>
                {
                    isOpen ? 
                    <div className="hamburgerLinks">
                    <h1><Link to={'/'}>CV CURATOR<span>.</span></Link></h1>
                    <a href="/login"><Link to={'/login'}>LOGIN</Link></a>
                     <a href="/register"><Link to={'/register'}>SIGN UP</Link></a> 
                    </div>
                    :
                    <h1><Link to={'/'}>CV CURATOR<span>.</span></Link></h1>
                }
                
                    
                </nav>
        </>
    )
}