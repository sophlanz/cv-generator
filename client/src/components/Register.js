import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Nav from './navs/NavLogin';
export default function Register() {
    const [password, setPassword] = useState(null);
    const [username, setUsername] = useState(null);
    const [email, setEmail] = useState(null);
    const[firstName,setFirstName]=useState(null);
    const [error,setError] = useState(null);
    const navigate = useNavigate();
    const SubmitRegister = () => {
        
        //create body with values saved to state
        const body = {
            password: password,
            username:username,
            email:email
        }
        const url = process.env.NODE_ENV === 'production' ? 'https://cv-curator.up.railway.app' : 'http://localhost:9000' 
        //send  request, then redirect
        axios.post(`${url}/register`,body)
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
    const handleClear = () => {
        //clear state of password, username, email, and firstName
        setUsername("");
        setPassword("");
        setEmail('');
        setFirstName("");
    }
    return (
        <>
        
            <div className="leftContainer">
            <Nav/>
            <div className="registerContent">
                <header>
                    <p>START FOR FREE</p>
                    <h1>Create new account<span>.</span></h1>
                    <p>Been here before? <Link to ={"/login"}>Login</Link></p>
                </header>
                <form onSubmit={SubmitRegister} className="registerForm">
                    <div className="nameUserContainer">
                        <div className="formWrapper">
                                <input placeholder="  "  onChange={(e)=> setFirstName(e.target.value)} value={firstName} name="firstName" id="firstName" type="text"/>
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
                     {/*get rid of default submit value */}
                        <button className="clearButton" type="button" onClick={handleClear}>Clear</button>
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

