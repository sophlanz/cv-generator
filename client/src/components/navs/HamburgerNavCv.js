import React, { useState} from 'react'
import { Sling as Hamburger } from 'hamburger-react'
import {Link, useNavigate} from "react-router-dom";
import axios from 'axios';
export default function HamburgerNavCv() {
    const [isOpen, setOpen] = useState(false);
    const navigate = useNavigate()
    const logout = () => {
        console.log('hey')
        const url = process.env.NODE_ENV === 'production' ? 'https://cv-curator.up.railway.app' : 'http://localhost:9000' 
        axios.post(`${url}/logout`)
        .then((response)=> {
            if(response.status === 200) {
                navigate("/login");
                console.log(response)
            }
        }).catch((err)=> {
            console.log(err)
            
        })
    }
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
                    <h3><a href="/"><Link to={'/workstation'}>WORKSTATION</Link></a></h3>
                    <h2 onClick={()=> logout()}>LOGOUT </h2>
                    </div>
                    :
                    <h1><Link to={'/'}>CV CURATOR<span>.</span></Link></h1>
                }
                
                    
                </nav>
        </>
    )
}