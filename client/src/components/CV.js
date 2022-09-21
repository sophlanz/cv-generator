import React, { Component, useState } from 'react'
import { useLocation } from 'react-router-dom';
import About from "./About";
import Education from "./Education";
import Experience from "./Experience";
import Skills from './Skills';
import Projects from './Projects';
import Modal from './Modal';
import { useSelector } from 'react-redux';
import axios from 'axios';
export default function CV() {

    //state for title
    const [fileName, setfileName] = useState(null);
    //get cv from state
    const cv = useSelector((state)=> state.cv);
    const userData = useSelector((state) => state.user)
    console.log(userData)
    const username = userData[0].username;
    const cvData = cv.about[0];
    const saveData = () => {
        const data = {...cvData, fileName:fileName}
        console.log(data);
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
            <label>Name your file:
                <input onChange={(e)=> handleChange(e)}/>
            </label>
            <button onClick={saveData}>Save</button>
        </div>
   </div>
    )
}
