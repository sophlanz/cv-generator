import React, { Component } from 'react'
import About from "./About";
import Education from "./Education";
import Experience from "./Experience";
import Skills from './Skills';
import Projects from './Projects';
import Modal from './Modal';
import { useSelector } from 'react-redux';
import axios from 'axios';
export default function CV() {
    //get cv from state
    const cv = useSelector((state)=> state.cv);
    const userData = useSelector((state) => state.user)
    const username = userData[0].username;
    const cvData = cv.about[0];
    const saveData = () => {
   const body = {
       username:username,
       cv:cvData
   }
  
   axios.post('http://localhost:9000/savecv',body )
   .then((results)=> {
       console.log(results);
   })
   .catch((err)=> {
       console.log(err.response);
   });
        
    }
    return (
        <div className="paper">
        <Modal/>
        <About/>
        <Skills/>
        <Projects/>
        <Experience/>
        <Education/>
        <button onClick={saveData}>Save</button>
   </div>
    )
}

