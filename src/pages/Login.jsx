import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import "./Login.css";
import HomeNavBar from "../components/HomeNavBar"
import Footer from "../components/Footer.jsx";
import { apiFetch } from "../utils/apiFetch.js";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

     useEffect(() => {

        if (searchParams.get("demo") === "true") {
            setEmail("demo@expensetracker.com");
            setPassword("Demo123!")
        }
    }, [searchParams]);

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

                <p className="forgot-password">
                    <button
                        type="button"
                        onClick={() => navigate("/forgot-password")}
    >
                        Forgot password?
                    </button>
                </p>
                </form>
            </div>
            </main>

            <Footer />
        </div>
    )
}
export default Login;