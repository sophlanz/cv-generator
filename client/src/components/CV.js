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
    console.log(cvData);
    const saveData = () => {
       console.log(cvData);
        
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

