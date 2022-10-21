import React, { useState, useEffect } from 'react'
import Nav from './NavWelcome';
import {Link} from 'react-router-dom';
export default function Welcome () {
    const [x, setX] = useState(null);
    const [y, setY] = useState(null);
    const [xChange,setXChange] = useState(null);
    const [yChange, setYChange] = useState(null);
    /*circle styles */
    const [left, setLeft] = useState(null);
    const [right, setRight] = useState(null);
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
   
    const setCursor = (e) => {
        const x = e.pageX;
            const y = e.pageY;
            setLeft(`${x}px`)
            console.log(left)
            setRight(`${y}px`)
            console.log(right)
    };
        return (
            <div className="gridContainer"  onMouseMove={(e)=> setCursor(e)}>
                <h1>CV Curator</h1>
                {/*navbar */}
                <Nav/>
                {/*interactive ball, give translate3d style using state*/}
                <div style={{transform:`translate3d(${xChange}%,${yChange}%, 1px)`}} className="ball" onMouseMove={(e)=> trackMouse(e)} >
                   <p><Link to={'/create-cv'}>Start Creating</Link></p> 
                </div>
                {/*circle that will follow cursor */}
                <span className="cursorCircle" style={{left:`${left}`, top:`${right}`}}></span>
            </div>
        )
    }