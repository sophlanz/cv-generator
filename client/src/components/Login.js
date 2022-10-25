import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addUserName } from '../redux/userSlice';

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
        if(e.target.name === 'username') {
            setUsername(e.target.value)
        } else {
            setPassword(e.target.value) 
        }
       
      
    }
    const handleSubmit = async () => {
        try{
            const body = {
                username:username,
                password:password
            }
           await axios.post('http://localhost:9000/login',body)
            .then((response)=> {
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
                setError(true)
                
            })
           
        } catch(err) {
            
        }
  
        }
      
    return (
        <div>
             <form onSubmit={handleSubmit}>
                    <label htmlFor="username">Username:
                        <input name="username" id="username" type="text" onChange={(e)=> handleChange(e)}/>
                    </label>
                    <label htmlFor="password">Password:
                        <input name="password" id="password" type="password" autoComplete="on"onChange={(e)=>handleChange(e)}/>
                    </label>
                    <button type="submit">Login</button>
                </form>
        </div>
    )
}



