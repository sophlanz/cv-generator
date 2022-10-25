import React, { Component, useState } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Nav from './navs/NavLogin';
export default function Register() {
    const [password, setPassword] = useState(null);
    const [username, setUsername] = useState(null);
    const [email, setEmail] = useState(null);
    const [error,setError] = useState(null);
    const [firstName, setFirstName] = useState(null);
    const navigate = useNavigate();
    const SubmitRegister = () => {
        
        //create body with values saved to state
        const body = {
            password: password,
            username:username,
            email:email
        }
        //send  request, then redirect
        axios.post('http://localhost:9000/register',body)
        .then(()=> {
            
        })
          .catch((err) => {
              setError(true)
          });
          //if there wasn't an error redirect
          if(error !== true) {
            navigate('/login');
          }
        
    };
    return (
        <>
        
            <div className="leftContainer">
            <Nav/>
            <div className="registerContent">
                <header>
                    <p>START FOR FREE</p>
                    <h1>Create new account<span>.</span></h1>
                    <p>Already a member? <a><Link to ={"/login"}>Login</Link></a></p>
                </header>
                <form onSubmit={SubmitRegister} className="registerForm">
                    <div className="nameUserContainer">
                        <div className="formWrapper">
                                <input placeholder="  " onChange={(e)=> setUsername(e.target.value)} value={firstName} name="firstName" id="firstName" type="text"/>
                                <label htmlFor="firstName">First name </label>
                        </div>
                        <div className="formWrapper">
                            <input placeholder="  " onChange={(e)=> setUsername(e.target.value)} value={username} name="username" id="username" type="text"/>
                            <label htmlFor="username">Username</label>
                        </div>
                    </div>
                    <div className="formWrapper">
                        <input placeholder="  " className="registerEmail"onChange={(e)=> setEmail(e.target.value)} value={email} name="email" id="email" type="text"/>
                        <label htmlFor="email">Email</label>
                    </div>
                    <div className="formWrapper">
                        <input placeholder="  " className="registerPassword" onChange={(e)=> setPassword(e.target.value)} value={password} name="password" id="password" type="password" autoComplete="on"/>
                        <label htmlFor="password">Password:</label>
                    </div>
                    <div className="registerButtons"> 
                        <button className="clearButton" onClick = {SubmitRegister}>Clear</button>
                        <button className="createAccount" type="submit">Create Account</button>
                    </div>
                </form>
            </div>
          
             
            </div>
            <div className="rightContainer">

            </div>
              
        </>
    )
}

