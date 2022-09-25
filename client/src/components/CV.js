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
    console.log(cv);
    //get id from cv
    const id= cv.id;
    console.log(id);
    //user object
    const userData = useSelector((state) => state.user)
    console.log(userData)
    //username from user object
    const username = userData[0].username;
    //resume object
    const cvData = cv.about[0];
    console.log(cv);
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
  
   axios.post('http://localhost:9000/savecv',body )
   .then((results)=> {
       console.log(results);
   })
   .catch((err)=> {
       console.log(err.response);
   });
    
    }
    const handleChange = (e) => {
        const value = e.target.value
        setfileName(value);
    }  
    const updateData = () => {
        //get the data from the cv, and add in the filename
        let data = {...cv, fileName:cv.fileName,...cv.about[0]}
       const body = {
           resume: data
        };
        console.log(body);
        //axios request to update data, use id to cv instance
        axios.post(`http://localhost:9000/update-cv/${id}`,body)
        .then((results)=> {
            console.log(results)
        })
        .catch((error)=> {
            console.log(error)
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
    console.log(newFile);
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

