import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import HomeNavBar from "../components/HomeNavBar"
import Footer from "../components/Footer.jsx";
import { apiFetch } from "../utils/apiFetch.js";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleDemoLogin = async () => {
    try {
        const response = await apiFetch("/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: "demo@expensetracker.com",
                password: "Demo123!",
            }),
        });

        if (!response) return;

        const data = await response.json();

        if (!response.ok) {
            console.error(data);
            return;
        }

        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        navigate("/dashboard");
    } catch (error) {
        console.error("Demo login error:", error);
    }
};

    const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const response = await apiFetch("/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                password,
            }),
        });

        if (!response) return;

        const data = await response.json();

        if (!response.ok) {
            console.error(data);
            return;
        }

        console.log("Logged in:", data);

        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        navigate("/dashboard");
    } catch (error) {
        console.error("Login error:", error);
    }
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

                        <button
                        type="button"
                        className="demo-login-btn"
                        onClick={handleDemoLogin}
                        >
                        Try Demo Account
                        </button>
                </form>
            </div>
            </main>

            <Footer />
        </div>
    )
}
export default Login;