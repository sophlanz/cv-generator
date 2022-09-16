import React, { Component, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
export default function Register() {
    const [password, setPassword] = useState(null);
    const [username, setUsername] = useState(null);
    const [email, setEmail] = useState(null);
    const [error,setError] = useState(null);
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
            alert('user registered!')
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
        <div>
                <p>Please Register</p>
                <form onSubmit={SubmitRegister}>
                    <label htmlFor="email">Email:
                        <input onChange={(e)=> setEmail(e.target.value)} value={email} name="email" id="email" type="text"/>
                    </label>
                    <label htmlFor="username">Username:
                        <input onChange={(e)=> setUsername(e.target.value)} value={username} name="username" id="username" type="text"/>
                    </label>
                    <label htmlFor="password">Password:
                        <input onChange={(e)=> setPassword(e.target.value)} value={password} name="password" id="password" type="password" autoComplete="on"/>
                    </label>
                    <button type="submit">Submit</button>
                </form>
                <button onClick = {SubmitRegister}>Redirect</button>
        </div>
    )
}

