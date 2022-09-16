import React, { Component } from 'react'
import About from "./About";
import Education from "./Education";
import Experience from "./Experience";
import Skills from './Skills';
import Projects from './Projects';
import Modal from './Modal';
import { useSelector } from 'react-redux';

export default function CV() {
    //get cv from state
    const cvData = useSelector((state)=> state.cv)
    const userData = useSelector((state) => state.user)
    const data = useSelector((state)=> state);
    console.log(cvData);
    const saveData = () => {
     console.log(cvData)
    console.log(userData)
    console.log(data);
        
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

