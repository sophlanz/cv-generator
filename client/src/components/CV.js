import React, { Component, useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import About from "./About";
import Education from "./Education";
import Experience from "./Experience";
import Skills from './Skills';
import Projects from './Projects';
import Modal from './Modal';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { addFileName } from '../redux/cvSlice';
export default function CV() {
    const dispatch = useDispatch();
    //saved file or new file
    const [newFile, setNewFile] = useState(null);
    //state for title
    const [fileName, setfileName] = useState(null);
    //get cv from state
    const cv = useSelector((state)=> state.cv);
    
    //get id from cv
    const id= cv.id;
    
    //user object
    const userData = useSelector((state) => state.user)
    
    //username from user object
    const username = userData[0].username;
    //resume object
    const cvData = cv.about[0];
    
    //send data to db, for new file
    const saveData = () => {
        const data = {...cv, fileName:fileName}
        
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
  
   axios.post('http://localhost:9000/savecv',body )
   .then((results)=> {
       
   })
   .catch((err)=> {
       
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
        
        //axios request to update data, use id to cv instance
        axios.post(`http://localhost:9000/update-cv/${id}`,body)
        .then((results)=> {
            
        })
        .catch((error)=> {
            
        })
    }
    //use effect to check and see on page load if cv in redux store is empty. If empty set state newCV to true
    useEffect(()=> {
        if(cv.fileName === "") {
            //if no filename, it's a new file
            setNewFile(true)
        } else {
            setNewFile(false)
        }
    },[])
    
    return (
        <div className="paper">
        <Modal />
        <About/>
        <Skills/>
        <Projects/>
        <Experience/>
        <Education/>
        {/*onClick pop */}
        <div>
         {/*if it's a new file, allow for a file name, otherwise save and update */}
        {  
            newFile ===true ?
            <label>Name your file:
            <input onChange={(e)=> handleChange(e)}/>
            </label>
            :
           null
        }
        {/*check state and if its a new file, saveData, if it's an old file, update data */}
           <button onClick={()=> newFile === true ? saveData() : updateData()}>Save</button> 
        </div>
   </div>
    )
}

