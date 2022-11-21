import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addUserName } from '../redux/userSlice';
import Nav from './navs/NavLogin';

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

 
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
    const handleSubmit =  (e) => {
            e.preventDefault();
            const body = {
                username:username,
                password:password
            }
            
           /*  const url =  || 'http://localhost:9000' */
           console.log(process.env.NODE_ENV);
           const url = process.env.NODE_ENV === 'production' ? 'https://cv-curator.up.railway.app' : 'http://localhost:9000' 
            console.log(body)
            console.log(url)
            axios.post(`${url}/login`,body)
            .then((response)=> {
                console.log("hi")
                console.log("loginResponse",response)
                id=response.data.user._id
                console.log(id)
                
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
          
                
            })
        }
    const handleClear = () => {
        //clear state of password and username
        setUsername("");
        setPassword("");
    }
    return (
        <div>
              <div className="leftContainer">
            <Nav/>
            <div className="registerContent">
                <header>
                    <p>Not a member yet? <Link to ={"/register"}>Sign up</Link></p>
                    <h1>Welcome Back<span>!</span></h1>
                    <p>Please enter your details</p>
                   
                </header>
                <form onSubmit={(e)=> handleSubmit(e)} className="loginForm">
                    <div className="formWrapper">
                        <input placeholder="  " className="loginUsername" onChange={(e)=> handleChange(e)} value={username} name="username" id="username" type="text"/>
                        <label htmlFor="username">Username</label>
                    </div>
                    <div className="formWrapper">
                        <input placeholder="  " className="loginPassword" onChange={(e)=>handleChange(e)} value={password}  name="password" id="password" type="password" autoComplete="on"/>
                        <label htmlFor="password">Password:</label>
                    </div>
                    <div className="registerButtons"> 
                        {/*get rid of default submit value */}
                        <button className="clearButton" type="button" onClick={handleClear} >Clear</button>
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



