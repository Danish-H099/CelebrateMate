import React from "react"
// import {useLocation} from 'react-router-dom';
import Navbar from './Navbar.js';

function Reminder (){
    // const location=useLocation()
    return (
        <div>
            <Navbar />
            <div className="reminder">
                <h1>Reminders</h1>
            </div>
        </div>
    )
}

export default Reminder