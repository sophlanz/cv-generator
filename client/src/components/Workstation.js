import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux'
import {Link} from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { aboutSection } from '../redux/cvSlice';
import { reset } from '../redux/cvSlice';
export default function Workstation() {
    //get username from user reducer, saved in an object 
    const username = useSelector((state) => state.user[0].username)
    const userId = useSelector((state)=> state.user[0].id);
    console.log(userId);
    const [userData, setUserData] = useState(null)
   const dispatch = useDispatch();
   
  const body = {
      username:username,
      id:userId
  }
    const getCvs = () => {
        //use axios to make get request to server
        console.log(userId);
        axios.get(`http://localhost:9000/savecv/${userId}`,body)
        .then((response)=> {
            setUserData(response.data.resume);
            console.log(response.data.resume);
            
        })
        .catch((error)=> {
            console.log(error.message)
        }) 

    }
  const sendDispatchHandler=(resume)=> {
      //use resume to get values, and send to redux store
      console.log(resume);
    dispatch(
        aboutSection ({
            firstName:resume.firstName,
            lastName:resume.lastName,
            title: resume.title,
            phone:resume.phone,
            email:resume.email,
            city: resume.city,
            linkedin:resume.linkedin,
            github:resume.github
        })
    )

  }
  const handleReset = () => {
      dispatch(
          reset()
      )
  }
    //use effect, call get CV on load
    useEffect(()=> {
        getCvs();
    },[])
    return (
    <div>
        <div>
            <button><Link to={"/create-cv"} onClick={handleReset}>Create New Cv</Link></button>
            <button onClick={getCvs}>View Saved Cv's</button>
            {/*Display the response of the CV, allow to click and send the data to the CV*/}
            {/**/}
        </div>
        {/*Map through the state array and display file information */}
        { userData ?
        [...userData].map((resume,index)=> {
            let resumeData = resume;
            console.log(resumeData)
            return(
                <ul key={uuidv4()}>
                {/*On file name click open document in create-cv, pass index so we know the index of state to be accessed*/}
                    {/* <li onClick={openDocument(index)}>{resume.fileName}</li> */}
                    <Link to="/create-cv" onClick={sendDispatchHandler(resume)}>{resume.fileName}</Link>
                    <li>{resume.created_at}</li>
                    <li>{resume.updated_at}</li>
                </ul>
            )
          
        })
        : null
            
        }
      
    </div>
    )
}
