import { apiFetch } from "../utils/apiFetch";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import HomeNavBar from "../components/HomeNavBar";
import Footer from "../components/Footer";
import { Eye, EyeOff } from "lucide-react";
import "./Register.css";

function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");

    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");

    try {
        const response = await apiFetch("/api/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name,
                email,
                password,
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            setError(data.message);
            return;
        }

        console.log("Registered:", data);

        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        navigate("/dashboard");

    } catch (error) {
        console.error("Could not connect to server:", error);
        setError("Could not connect to server");
    }
};
    return (
        <div className="register-page">
            <HomeNavBar />

            <main className="register-content">
                <div className="register-card">
                    <h1>Create an Account</h1>
                    <p>Start tracking your expenses.</p>

                    <form onSubmit={handleSubmit}>
                        <label>Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />

                        <label>Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <label>Password</label>
                        <div className="password-input-container">
                            <input
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            />
                            <button
                            type="button"
                            className="password-toggle"
                            onClick={() => setShowPassword(!showPassword)}
                            >
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                        {error && <p className="error">{error}</p>}

                        <button type="submit">
                            Create Account
                        </button>
                    </form>
                </div>
            </main>
            <Footer />
        </div>
    )
}

export default Register;