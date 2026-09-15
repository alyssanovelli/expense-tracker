import Sidebar from "../components/sidebar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Settings.css";

function Settings() {
    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user"));

    const [currency, setCurrency] = useState(
        localStorage.getItem("currency") || "USD"
    );

    const handleCurrencyChange = (e) => {
        const newCurrency = e.target.value;
        setCurrency(newCurrency);
        localStorage.setItem("currency", newCurrency);
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/login");
    };

    return (
        <div className="settings-page">
            <Sidebar />

            <main className="settings-main">

                <div className="settings-header">
                    <h1>Settings</h1>
                    <p>Manage your account and preferences.</p>
                </div>

                <section className="settings-card">
                    <h2>Account Information</h2>

                    <div className="settings-field">
                        <label>Name</label>
                        <div className="settings-value">
                            {user?.name || "Not available"}
                        </div>
                    </div>

                    <div className="settings-field">
                        <label>Email</label>
                        <div className="settings-value">
                            {user?.email || "Not available"}
                        </div>
                    </div>
                </section>

                <section className="settings-card">
                    <h2>Preferences</h2>

                    <div className="settings-field">
                        <label htmlFor="currency">Currency</label>
                        <select
                            id="currency"
                            value={currency}
                            onChange={handleCurrencyChange}
                        >
                            <option value="USD">USD - United States Dollar</option>
                            <option value="EUR">EUR - Euro</option>
                            <option value="GBP">GBP - British Pound</option>
                            <option value="CAD">CAD - Canadian Dollar</option>
                        </select>
                    </div>
                </section>

                <section className="settings-card">
                    <h2>Account</h2>

                    <p className="settings-description">
                        Sign out of your Expense Tracker account on this device.
                    </p>

                    <button
                        className="logout-button"
                        onClick={handleLogout}
                    >
                        Log Out
                    </button>
                </section>

            </main>

            <Footer />
        </div>
    );
}

export default Settings;