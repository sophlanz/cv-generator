import React, { useState, useEffect } from 'react'
import Nav from './NavWelcome';
import {Link} from 'react-router-dom';
export default function Welcome () {
    const [xChange,setXChange] = useState(null);
    const [yChange, setYChange] = useState(null);
    /*circle styles */
    const [left, setLeft] = useState(null);
    const [right, setRight] = useState(null);
    const trackMouse = (e) => {
        const xChange = e.clientX  * .03;
        const yChange = e.clientY  * .03;
        setXChange(xChange);
        setYChange(yChange);
    };
   const resetCircle = () => {
       setXChange(0);
       setYChange(0);
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
                <h1>CV CURATOR.</h1>
                {/*navbar */}
                <Nav/>
                {/*interactive ball, give translate3d style using state*/}
                <div style={{transform:`translate3d(${xChange}px,${yChange}px, 0px)`}} className="ball" onMouseMove={(e)=> trackMouse(e)} onMouseOut={()=> resetCircle()} >
                   <p><Link to={'/create-cv'}>BEGIN CURATING</Link></p> 
                </div>
                {/*circle that will follow cursor */}
                <span className="cursorCircle" style={{left:`${left}`, top:`${right}`}}></span>
            </div>
        )
    }