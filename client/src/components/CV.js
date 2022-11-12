import React, { useState, useEffect } from 'react';
import About from "./About";
import Education from "./Education";
import Experience from "./Experience";
import Skills from './Skills';
import Projects from './Projects';
import Modal from './Modal';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { addFileName } from '../redux/cvSlice';
import Nav from '../components/navs/CvNav';
import NavGuest from '../components/navs/CvNavGuest';
export default function CV() {
    const dispatch = useDispatch();
    //saved file or new file
    const [newFile, setNewFile] = useState(null);
    //state for title
    const [fileName, setfileName] = useState(null);
    //store username in state, to check if it's a guest later, an
    const [guest, setGuest] = useState(null);
    //get cv from state
    const cv = useSelector((state)=> state.cv);
    
    //get id from cv
    const id= cv.id;
    
    //user object
    const userData = useSelector((state) => state.user)
    console.log(userData);
    //username from user object, if length is 0, then it's a guest
    let username = null;
    if(userData.length === 0 ) {
        username = "guest"
    } else {
        username= userData[0].username
    }

  /*   //resume object
    const cvData = cv.about[0]; */
    
    //send data to db, for new file
    const saveData = () => {
        const data = {...cv, fileName:fileName}
        console.log(data);
        //send filename to store
        dispatch(
            addFileName({
                fileName:fileName
            })
        )
   const body = {
       username:username,
       resume:data,
   }
   const url = process.env.NODE_ENV === 'production' ? 'https://cv-curator.up.railway.app' : 'http://localhost:9000' 
  
   axios.post(`${url}/savecv`,body )
   .then((results)=> {
        console.log(results);
        alert('CV saved!')
   })
   .catch((err)=> {
       console.log(err)
       alert('CV unable to save')
   });
    
    }
    const handleChange = (e) => {
        const value = e.target.value
        setfileName(value);
    }  
    //send data to db for old file
    const updateData = () => {
        //get the data from the cv, and add in the filename
        let data = {...cv, fileName:cv.fileName,...cv.about[0]}
       const body = {
           resume: data
        };
        console.log(data);
        const url = process.env.NODE_ENV === 'production' ? 'https://cv-curator.up.railway.app' : 'http://localhost:9000'
        //axios request to update data, use id to cv instance
        axios.post(`${url}/update-cv/${id}`,body)
        .then((results)=> {
            console.log(results)
        })
        .catch((error)=> {
            console.log(error);
        })
    }
    //use effect to check and see on page load if cv in redux store is empty. If empty set state newCV to true
    useEffect(()=> {
        
        if(cv.fileName === "" && userData.length === 0) {
            //if no filename, it's a new file
            setNewFile(true)
            setGuest(true)
        } else if (cv.fileName === "") { 
            setNewFile(true);
            setGuest(false)
        }else {
            setNewFile(false)
            setGuest(false)
        }
        //eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    
    return (
        <div className="paper">
        <Modal />
        <About/>
        {/* guest nav vs logged in nav*/}
        {
            guest === true ? 
            <NavGuest/>
            :
            <Nav/>
        }
        <Skills/>
        <Projects/>
        <Experience/>
        <Education/>
        {/*onClick pop */}
        <div className="cvButtons">
         {/*if it's a new file, allow for a file name, otherwise save and update */}
        {  
            newFile === true && guest === false ?
            <div className="formWrapper">
                <input onChange={(e)=> handleChange(e)} id="nameFile" placeholder="  "/>
                <label htmlFor="nameFile">Name your file:</label>
            </div>
            
            :
           null
        }
        {/*check state and if its a guest: no save button. If it's a new file: saveData. If it's an old file: update data*/}
          {  guest === false ? 
          <button className="save" onClick={()=> newFile === true ? saveData() : updateData()}>Save</button> 
          :
          null

          } 
          <button className="printButton" onClick={()=> window.print()}>Print</button>
        </div>
   </div>
   
    )
}

