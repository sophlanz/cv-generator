import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addUserName } from '../redux/userSlice';
import Nav from './navs/NavLogin';

export default function Login() {
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [userId, setuserId] = useState(null);
    const[error,setError] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    //save id from response
    let id = '';
    const handleChange = (e) => {
        console.log(e.target.name)
        if(e.target.name === 'username') {
            setUsername(e.target.value)
        } else {
            setPassword(e.target.value) 
        }
    }
    const handleSubmit = async () => {
            const body = {
                username:username,
                password:password
            }
            console.log(body)
           await axios.post('http://localhost:9000/login',body)
            .then((response)=> {
                console.log(response)
                id=response.data._id
                
            })
            .then(()=> {
                 
                    navigate('/workstation')
                    
                    dispatch(
                     addUserName({
                         username: username,
                         id: id
                     })
                   )
                   
            })
            .catch((err)=> {
                console.log(err)
                setError(true)
                
            })
        }
      
    return (
        <div>
              <div className="leftContainer">
            <Nav/>
            <div className="registerContent">
                <header>
                    <p>Not a member yet? <a><Link to ={"/register"}>Sign up</Link></a></p>
                    <h1>Welcome Back<span>!</span></h1>
                    <p>Please enter your details</p>
                   
                </header>
                <form onSubmit={handleSubmit} className="loginForm">
                    <div className="formWrapper">
                        <input placeholder="  " className="loginUsername" onChange={(e)=> handleChange(e)} value={username} name="username" id="username" type="text"/>
                        <label htmlFor="username">Username</label>
                    </div>
                    <div className="formWrapper">
                        <input placeholder="  " className="loginPassword" onChange={(e)=>handleChange(e)} value={password}  name="password" id="password" type="password" autoComplete="on"/>
                        <label htmlFor="password">Password:</label>
                    </div>
                    <div className="registerButtons"> 
                        <button className="clearButton" >Clear</button>
                        <button className= "login"type="submit">Login</button>
                    </div>
                </form>
            </div>
             
            </div>
            <div className="rightContainer">

            </div>
            
        </div>
    )
}



