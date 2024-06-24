import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Signup() {
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function submit(e) {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/api/users/signup", {
                name, email, password
            });

            if (response.data === "exist") {
                alert("User already exists");
            } else if (response.data === "notexist") {
                // Store the email locally
                localStorage.setItem('email', email);
                localStorage.setItem('name', name);

                // Navigate to the home page
                navigate("/home", { state: { id: email, name: name } });
            }
        } catch (error) {
            alert("Wrong details");
            console.log(error);
        }
    }

    return (
        <div className="signup">
            <h1>Signup</h1>
            <form onSubmit={submit}>
                <input type="text" onChange={(e) => setName(e.target.value)} placeholder="Name" required />
                <input type="email" onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
                <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
                <button type="submit">Signup</button>
            </form>
            <br />
            <p>OR</p>
            <br />
            <Link to="/">Login Page</Link>
        </div>
    );
}

export default Signup;

