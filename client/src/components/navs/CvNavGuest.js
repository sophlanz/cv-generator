import React from 'react'
import {Link} from "react-router-dom";

export default function NavWelcome() {
    return (
        <>
            <nav className = 'navCV'>
                <h1><a href="/"><Link to={'/'}>CV CURATOR<span>.</span></Link></a></h1>
            </nav>
        </>
    )
}
