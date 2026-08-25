import "./Dashboard.css";
import Sidebar from "../components/sidebar";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import { apiFetch } from "../utils/apiFetch";

function Dashboard() {
    const user = JSON.parse(localStorage.getItem("user"));
    const [transactions, setTransactions] = useState([]);

    const income = transactions
    .filter((transaction) => transaction.type === "income")
    .reduce((total, transaction) => total + Number(transaction.amount), 0);

    const expenses = transactions
    .filter((transaction) => transaction.type === "expense")
    .reduce((total, transaction) => total + Number(transaction.amount), 0);

    const balance = income - expenses;

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const token = localStorage.getItem("token");

                const response = await apiFetch("/api/transactions",
                );
                if (!response) return;

                const data = await response.json();

                if (!response.ok) {
                    console.error("Failed to fetch transactions:", data);
                    return;
                }

                setTransactions(data);
            } catch (error) {
                console.error("Could not fetch transactions:", error);
            }
        };

        fetchTransactions();
    }, []);
    return (
        <div className="dashboard-page">
            <Sidebar />
            <main className="dashboard-main">
                <div className="dashboard-header">
                    <div>
                        <h1>Dashboard</h1>
                        <p>Welcome, {user?.name || "there"}!</p>
                    </div>
                </div>

                <div className="dashboard-cards">
                    <div className="dashboard-card">
                        <h3>Balance</h3>
                        <p>${balance.toFixed(2)}</p>
                    </div>

                    <div className="dashboard-card">
                        <h3>Income</h3>
                        <p>${income.toFixed(2)}</p>
                    </div>

                    <div className="dashboard-card">
                        <h3>Expenses</h3>
                        <p>${expenses.toFixed(2)}</p>
                    </div>
                </div>

                <div className="recent-transactions">
                    <h2>Recent Transactions</h2>

                    {transactions.length === 0 ? (
                        <p className="empty-message">

                        </p>
                    ) : (
                        <div className="transactions-list">
                            {transactions.map((transaction) => (
                                <div
                                    className="transaction-row"
                                    key={transaction.id}
                                >
                                    <div>
                                        <strong>{transaction.name}</strong>
                                        <span>
                                            {new Date(transaction.date).toLocaleDateString("en-US", {
                                                year: "numeric",
                                                month: "short",
                                                day: "numeric",
                                            })}
                                        </span>
                                    </div>
                                    <p>
                                        ${Number(transaction.amount).toFixed(2)}
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}
                    </div>
            </main>
            <Footer />
        </div>
    );
}

export default Dashboard;