import React from "react"
import {Link} from 'react-router-dom';
export default function Navbar(){
    return (
        <div className="Navbar">
            <ul>
                <li><Link exact to="/home">DashBoard</Link></li>
                <li><Link exact to="/contacts">Contacts</Link></li>
                <li><Link exact to="/reminders">Reminders</Link></li>
                {/* <li><Link exact to="/reminders">Reminders</Link></li> */}
                <li><Link exact to="/">Sign Out</Link></li>
            </ul>
        </div>
    )
}