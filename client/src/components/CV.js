import React, { Component } from 'react'
import About from "./About";
import Education from "./Education";
import Experience from "./Experience";
import Skills from './Skills';
import Projects from './Projects';
import Modal from './Modal';
export default class CV extends Component {
    render() {
        return (
            <div className="paper">
                 <Modal/>
                 <About/>
                 <Skills/>
                 <Projects/>
                 <Experience/>
                 <Education/>
            </div>
        )
    }
}
