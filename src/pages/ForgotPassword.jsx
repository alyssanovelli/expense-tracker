import { useState } from "react";
import { useNavigate } from "react-router-dom";
import HomeNavBar from "../components/HomeNavBar";
import Footer from "../components/Footer";
import { apiFetch } from "../utils/apiFetch";
import "./ForgotPassword.css";

function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const navigate = useNavigate();

   const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");

    try {
        const response = await apiFetch("/api/forgot-password", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
            }),
        });

        console.log("Response:", response);

        if (!response) {
            console.log("No response received from server.");
            setMessage("Could not connect to server.");
            return;
        }

        const data = await response.json();

        console.log("Response data:", data);

        setMessage(data.message);

    } catch (error) {
        console.error("Forgot password error:", error);
        setMessage("Something went wrong. Please try again.");
    }
};
    return (
        <div className="forgot-password-page">
            <HomeNavBar />
            <main className="forgot-password-content">
                <div className="forgot-password-card">
                    <h1>Forgot Password</h1>
                    <p>Enter your email address to reset your password.</p>
                    <form onSubmit={handleSubmit}>
                        <label>Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />

                        {message &&
                            <p className="forgot-password-message">{message}</p>
                        }

                        <button type="submit">Reset Password</button>
                    </form>

                    <button
                        type="button"
                        className="back-to-login"
                        onClick={() => navigate("/login")}
                    >
                        Back to Login
                    </button>
                </div>
            </main>
            <Footer />
        </div>
);
}

export default ForgotPassword;