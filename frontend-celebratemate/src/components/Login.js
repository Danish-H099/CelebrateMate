import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function submit(e) {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/api/users/", {
                email,
                password,
            });

            const data = response.data;

            if (data.status === "exist") {
                // Store the name and email in local storage
                localStorage.setItem("name", data.name);
                localStorage.setItem("email", email);

                // Redirect to /home with user data
                navigate("/home");
            } else if (data.status === "notexist") {
                alert("User has not signed up");
            } else {
                alert("Wrong details");
            }
        } catch (error) {
            console.error("Error during login:", error);
            alert("An error occurred during login");
        }
    }

    return (
        <div className="login">
            <h1>Login</h1>
            <form onSubmit={submit}>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                />
                <button type="submit" className="submit">
                    Submit
                </button>
            </form>
            <br />
            <p>OR</p>
            <br />
            <Link to="/signup">Signup Page</Link>
        </div>
    );
}

export default Login;



// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate, Link } from "react-router-dom";

// function Login() {
//     const history = useNavigate();
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");

//     async function submit(e) {
//         e.preventDefault();
//         try {
//             const response = await axios.post("http://localhost:5000/api/users", {
//                 email,
//                 password,
//             });

//             const data = response.data;

//             if (data.status === "exist") {
//                 // Redirect to /home with user data
//                 history("/home", { state: { id: email, name: data.name } });
//             } else if (data.status === "notexist") {
//                 alert("User has not signed up");
//             } else {
//                 alert("Wrong details");
//             }
//         } catch (error) {
//             console.error("Error during login:", error);
//             alert("An error occurred during login");
//         }
//     }

//     return (
//         <div className="login">
//             <h1>Login</h1>
//             <form onSubmit={submit}>
//                 <input
//                     type="email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     placeholder="Email"
//                 />
//                 <input
//                     type="password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     placeholder="Password"
//                 />
//                 <button type="submit" className="submit">
//                     Submit
//                 </button>
//             </form>
//             <br />
//             <p>OR</p>
//             <br />
//             <Link to="/signup">Signup Page</Link>
//         </div>
//     );
// }

// export default Login;
