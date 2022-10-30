import React from 'react'
import {Link, useNavigate} from "react-router-dom";
import axios from 'axios';
export default function NavWelcome() {
    const navigate = useNavigate()
    const logout = () => {
        axios.post('http://localhost:9000/logout')
        .then((response)=> {
            if(response.status === 200) {
                navigate("/login");
            }
        }).catch((err)=> {
            console.log(err)
            
        })
    }
    return (
        <>
            <nav className = 'navCV'>
                <h1><a href="/"><Link to={'/'}>CV CURATOR<span>.</span></Link></a></h1>about
            </nav>
        </>
    )
}
