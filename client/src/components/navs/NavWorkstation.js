import React from 'react'
import {Link, useNavigate} from "react-router-dom";
import axios from 'axios';
export default function NavWelcome() {
    const navigate = useNavigate()
    const logout = () => {
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
          
            <nav className = 'navWorkstation'>
                <h1><a href="/"><Link to={'/'}>CV CURATOR<span>.</span></Link></a></h1>
              {/*wrap each letter in a span for hover effect */}
                <h2 onClick={()=> logout()}>LOGOUT </h2>
            </nav>
        </>
    )
}
