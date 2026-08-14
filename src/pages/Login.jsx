import { useState } from "react";
import "./Login.css";
import HomeNavBar from "../components/HomeNavBar"
import Footer from "../components/Footer.jsx";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch("http://localhost:5000/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email, 
                password, 
            }),
        });

        const data = await response.json();

        if(!response.ok) {
            console.error(data);
            return;
        }

        console.log("Logged in:", data);
        localStorage.setItem("token", data.token);
    };
    return (
        <div className="login-page">
            <HomeNavBar />

            <main className="login-content">
            <div className="login-card">
                <h1>Welcome Back</h1>
                <p>Log in to your Expense Tracker.</p>

                <form onSubmit={handleSubmit}>
                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        />
                    <label>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <button type="submit">
                            Log In
                        </button>
                </form>
            </div>
            </main>

            <Footer />
        </div>
    )
}
export default Login;