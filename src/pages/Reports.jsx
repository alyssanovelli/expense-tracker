import Sidebar from "../components/sidebar";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import { apiFetch } from "../utils/apiFetch";
import "./Reports.css";

function Reports() {
    const [transactions, setTransactions] = useState([]);
        useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const response = await apiFetch(
                    "/api/transactions"
                );

                if (!response) return;

                const data = await response.json();

                if (!response.ok) {
                    console.error(data);
                    return;
                }

                setTransactions(data);
            } catch (error) {
                console.error("Error fetching transactions:", error);
            }
        };

        fetchTransactions();
    }, []);

    const income = transactions
        .filter((transaction) => transaction.type === "income")
        .reduce(
            (total, transaction) => total + Number(transaction.amount),
            0
        );

    const expenses = transactions
        .filter((transaction) => transaction.type === "expense")
        .reduce(
            (total, transaction) => total + Number(transaction.amount),
            0
        );

    const balance = income - expenses;

    const expenseTransactions = transactions.filter(
        (transaction) => transaction.type === "expense"
    );

    const categoryTotals = {};

    expenseTransactions.forEach((transaction) => {
        const category = transaction.name;

        categoryTotals[category] =
            (categoryTotals[category] || 0) +
            Number(transaction.amount);
    });

    const categories = Object.entries(categoryTotals).sort(
        (a, b) => b[1] - a[1]
    );

    return (
        <div className="reports-page">
            <Sidebar />

            <main className="reports-main">
                <div className="reports-header">
                    <div>
                        <h1>Reports</h1>
                        <p>Understand where your money is going.</p>
                    </div>
                </div>
            <div className="report-summary">
                    <div className="report-card">
                        <h3>Income</h3>
                        <strong>${income.toFixed(2)}</strong>
                    </div>

                    <div className="report-card">
                        <h3>Expenses</h3>
                        <strong>${expenses.toFixed(2)}</strong>
                    </div>

                    <div className="report-card">
                        <h3>Net Balance</h3>
                        <strong>${balance.toFixed(2)}</strong>
                    </div>
                </div>
                <section className="expense-report">
                    <h2>Expense Breakdown</h2>

                    {categories.length === 0 ? (
                        <p className="empty-message">
                            No expense data yet.
                        </p>
                    ) : (
                        <div className="category-list">
                            {categories.map(([category, total]) => {
                                const percentage =
                                    expenses > 0
                                        ? (total / expenses) * 100
                                        : 0;

                                return (
                                    <div
                                        className="category-row"
                                        key={category}
                                    >
                                        <div className="category-info">
                                            <strong>{category}</strong>

                                            <span>
                                                ${total.toFixed(2)}
                                            </span>
                                        </div>

                                        <div className="category-bar">
                                            <div
                                                className="category-bar-fill"
                                                style={{
                                                    width: `${percentage}%`,
                                                }}
                                            ></div>
                                        </div>

                                        <span className="category-percentage">
                                            {percentage.toFixed(0)}%
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </section>
                <section className="monthly-report">
                    <h2>Transaction Summary</h2>

                    <div className="summary-row">
                        <span>Total Transactions</span>
                        <strong>{transactions.length}</strong>
                    </div>

                    <div className="summary-row">
                        <span>Income Transactions</span>
                        <strong>
                            {
                                transactions.filter(
                                    (transaction) =>
                                        transaction.type === "income"
                                ).length
                            }
                        </strong>
                    </div>

                    <div className="summary-row">
                        <span>Expense Transactions</span>
                        <strong>{expenseTransactions.length}</strong>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}

export default Reports;
