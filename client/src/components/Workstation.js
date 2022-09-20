import React, { useState } from 'react'
import axios from 'axios';
import { useSelector } from 'react-redux'
import {Link} from 'react-router-dom';
export default function Workstation() {
    //get username from user reducer, saved in an object 
    const username = useSelector((state) => state.user[0].username)
    const userId = useSelector((state)=> state.user[0].id);
    console.log(userId);
    const [userData, setUserData] = useState(null)
  
   
  const body= {
      username:username,
      id:userId
  }
    const getCvs = () => {
        //use axios to make get request to server
        console.log(userId);
        axios.get(`http://localhost:9000/savecv/${userId}`,body)
        .then((response)=> {
            setUserData(response.data);
            console.log(response.data.resume[0]);
            
        })
        .catch((error)=> {
            console.log(error.message)
        }) 

    }
    return (
        <div>
            <button><Link to={"/create-cv"}>Create New Cv</Link></button>
            <button onClick={getCvs}>View Saved Cv's</button>
            {/*Display the response of the CV, allow to click and send the data to the CV*/}
            {/**/}
        </div>
    )
}
