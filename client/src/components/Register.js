import React, { Component, useState } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
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
            <div className="registerContent">
                <header>
                    <p>START FOR FREE</p>
                    <h1>Create new account<span>.</span></h1>
                    <p>Already a member? <a><Link to ={"/login"}>Login</Link></a></p>
                </header>
                <form onSubmit={SubmitRegister}>
                    <div className="nameUserContainer">
                        <label htmlFor="firstName">First name:
                            <input onChange={(e)=> setUsername(e.target.value)} value={firstName} name="firstName" id="firstName" type="text"/>
                        </label>
                        <label htmlFor="username">Username:
                            <input onChange={(e)=> setUsername(e.target.value)} value={username} name="username" id="username" type="text"/>
                        </label>
                    </div>
                    <label htmlFor="email">Email
                        <input onChange={(e)=> setEmail(e.target.value)} value={email} name="email" id="email" type="text"/>
                    </label>
                    <label htmlFor="password">Password:
                        <input onChange={(e)=> setPassword(e.target.value)} value={password} name="password" id="password" type="password" autoComplete="on"/>
                    </label>
                    <div className="registerButtons"> 
                        <button onClick = {SubmitRegister}>clear</button>
                        <button type="submit">Create Account</button>
                    </div>
                    
                </form>
            </div>
          
             
            </div>
            <div className="rightContainer">

            </div>
              
        </>
    )
}

