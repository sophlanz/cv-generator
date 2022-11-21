import React, { useContext } from 'react'
import {Link, useNavigate} from "react-router-dom";
import axios from 'axios';
import HamburgerNav from './HamburgerNavWorkstation'
import HamburgerNavWorkstation from './HamburgerNavWorkstation';
import { UserContext } from '../../context/UserContext';
export default function NavWelcome() {
    const navigate = useNavigate()
    const [userContext, setUserContext] = useContext(UserContext);
    console.log(userContext);
    console.log(userContext.token)
    const logout = () => {
        console.log('hey')
        const config = {
            headers: {
                "Content-Type": "application/json",
                'Accept' : 'application/json',
                "Authorization":`Bearer ${userContext.token}`
            } ,
            withCredentials:true
        };
           const headers= {
            headers: {
                "Content-Type": "application/json",
                "Authorization":`Bearer ${userContext.token}`
            }   
           }
        const url = process.env.NODE_ENV === 'production' ? 'https://cv-curator.up.railway.app' : 'http://localhost:9000' 
        axios.get(`${url}/logout` ,config)
        .then((response)=> {
            console.log('response')
            if(response.status === 200) {
                setUserContext(oldValues => {
                    return{ ...oldValues,details:undefined,token:null }
                })
                navigate("/login");
                console.log(response)
            }
        })
        .catch((err)=> {
            console.log(err)
            
        })
    }
    return (
        <>
          
            <nav className = 'navWorkstation'>
                <h1><a href="/"><Link to={'/'}>CV CURATOR<span>.</span></Link></a></h1>
              {/*wrap each letter in a span for hover effect */}
                <h2 onClick={logout}>LOGOUT </h2>
            </nav>
              {/*hamburger nav for mobile view */}
            <HamburgerNavWorkstation/>
        </>
    )
}
