import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";

function Login() {
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    async function login(event) {
        event.preventDefault();
        try {
            const res = await axios.post("http://localhost:8090/api/v1/players/login", {
                username: username,
                password: password
            });
            console.log(res.data);

            if (res.data === "Invalid username or password") {
                alert("Invalid username or password");
            } else if (res.data.startsWith("Welcome back!")) {
                alert("Login successful!");
                // Reset the form after successful login
                setUserName("");
                setPassword("");
                navigate("/home");
            } else {
                alert("An error occurred while logging in");
            }
        } catch (err) {
            console.error(err);
            alert("An error occurred while logging in");
        }
    }

    return (
        <div className="container">
            <h2 className="text-center">COOL CAT GAMES</h2>
            <div className="row outer-row">
                <div className="col-sm-6">
                    <form>
                        <div className="form-group">
                            <label>NICKNAME</label>
                            <input
                                type="text"
                                className="form-control"
                                id="username"
                                placeholder="Enter UserName"
                                value={username}
                                onChange={(event) => {
                                    setUserName(event.target.value);
                                }}
                            />
                        </div>
                        <div className="form-group">
                            <label>PASSWORD</label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                placeholder="Enter password"
                                value={password}
                                onChange={(event) => {
                                    setPassword(event.target.value);
                                }}
                            />
                        </div>
                        <button
                            type="submit"
                            className="btn btn-primary"
                            onClick={login}
                        >
                            Login
                        </button>
                    </form>
                    <div className="pt-4">
                        <Link to="/PlayerRegistration" className="text-blue-400">
                            I do not have an Account? Signup here
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
