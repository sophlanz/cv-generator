import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
export default function Login() {
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const[error,setError] = useState(null);
    const navigate = useNavigate();
    const handleSubmit =()=> {
        const body = {
            username:username,
            password:password
        }
        axios.post('http://localhost:9000/login',body)
        .then(()=> {
            alert('Successfully logged in!')
        })
        .catch((err)=> {
            setError(true)
            console.log(err)
        })
        if(error !== true) {
           navigate('/create-cv')
        }

    }
    return (
        <div>
             <form onSubmit={handleSubmit}>
                    <label htmlFor="username">Username:
                        <input name="username" id="username" type="text"/>
                    </label>
                    <label htmlFor="password">Password:
                        <input name="password" id="password" type="password" autoComplete="on"/>
                    </label>
                    <button type="submit">Login</button>
                </form>
        </div>
    )
}



