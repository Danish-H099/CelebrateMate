import React, { useEffect, useState } from "react";
import Navbar from "./Navbar.js";

function Home() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        const storedName = localStorage.getItem('name');
        const storedEmail = localStorage.getItem('email');
        if (storedName && storedEmail) {
            setName(storedName);
            setEmail(storedEmail);
        }
    }, []); // Empty dependency array means this effect runs once on component mount

    return (
        <div>
            <Navbar />
            <div className="homepage">
                <h1>Welcome to Your Dashboard</h1>
                <img
                    src="https://thumbs.dreamstime.com/b/user-profile-my-account-avatar-login-icon-man-male-face-smile-symbol-flat-vector-human-person-member-sign-user-profile-182815734.jpg"
                    alt="Avatar"
                />
                <h2>{name}</h2>
                <p>{email}</p>
            </div>
        </div>
    );
}

export default Home;
