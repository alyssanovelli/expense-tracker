import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import HomeNavBar from "../components/HomeNavBar";
import Footer from "../components/Footer";
import { apiFetch } from "../utils/apiFetch";
import "./ResetPassword.css";

function ResetPassword() {
    const { token } = useParams();
    const navigate = useNavigate();

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setMessage("Passwords do not match.");
            return;
        }

        try {
            const response = await apiFetch("/api/reset-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    token,
                    password,
                }),
            });

            const data = await response.json();

            setMessage(data.message);

            if (response.ok) {
                setTimeout(() => {
                    navigate("/login");
                }, 2000);
            }

        } catch (error) {
            console.error("Reset password error:", error);
            setMessage("Something went wrong. Please try again.");
        }
    };

    return (
        <div className="reset-password-page">
            <HomeNavBar />

            <main className="reset-password-content">
                <div className="reset-password-card">
                    <h1>Reset Password</h1>

                    <p>Enter your new password below.</p>

                    <form onSubmit={handleSubmit}>
                        <label>New Password</label>

                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />

                        <label>Confirm Password</label>

                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) =>
                                setConfirmPassword(e.target.value)
                            }
                            required
                        />

                        {message && (
                            <p className="reset-password-message">
                                {message}
                            </p>
                        )}

                        <button type="submit">
                            Reset Password
                        </button>
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

export default ResetPassword;