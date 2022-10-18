import React, { useState } from 'react'
import Nav from './NavWelcome';
import {Link} from 'react-router-dom';
export default function Welcome () {
    const [x, setX] = useState(null);
    const [y, setY] = useState(null);
    const [xChange,setXChange] = useState(null);
    const [yChange, setYChange] = useState(null);
    const [style, setStyle] = useState(null);
    const trackMouse = (e) => {
        //get x
        setX(e.clientX);
        //get y
        setY(e.clientY);
        const xChange = e.clientX  * 0.01;
        const yChange = e.clientY  * 0.01;
        setXChange(xChange);
        setYChange(yChange);
    
    };
    
        return (
            <div className="gridContainer">
                <h1>CV Curator</h1>
                {/*navbar */}
                <Nav/>
                {/*interactive ball, give translate3d style using state*/}
                <div style={{transform:`translate3d(${xChange}%,${yChange}%, 1px)`}} className="ball" onMouseMove={(e)=> trackMouse(e)} >
                   <p><Link to={'/create-cv'}>Start Creating</Link></p> 
                </div>
                <p>{x},{y}</p>
            </div>
            
        )
    }

