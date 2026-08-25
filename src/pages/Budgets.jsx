import Sidebar from "../components/sidebar";
import Footer from "../components/Footer";
import { useState, useEffect } from "react";
import { Trash2 } from "lucide-react";
import { apiFetch } from "../utils/apiFetch";
import "./Budgets.css";

function Budgets() {
    const [category, setCategory] = useState("");
    const [amount, setAmount] = useState("");
    const [showForm, setShowForm] = useState(false);
    const [budgets, setBudgets] = useState([]);
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        const fetchBudgets = async () => {
            try {
                const response = await apiFetch("/api/budgets");

                if (!response) return;

                const data = await response.json();

                if (!response.ok) {
                    console.error(data);
                    return; 
                }
                    setBudgets(data);
            } catch (error) {
                console.error("Error fetching budgets:", error);
            }
        };
        fetchBudgets();

        const fetchTransactions = async () => {
    try {
        const response = await apiFetch("/api/transactions");

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

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await apiFetch("/api/budgets",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        category,
                        amount,
                    }),
                }
            );

            if (!response) return;

            const data = await response.json();

            if (!response.ok) {
                console.error(data);
                return;
            }

            setBudgets((current) => [data, ...current]);

            setCategory("");
            setAmount("");
            setShowForm(false);

        } catch (error) {
            console.error("Error creating budget:", error);
        }
    };
        const handleDelete = async (id) => {
        try {
            const response = await apiFetch(`/api/budgets/${id}`,
                {
                    method: "DELETE",
                }
            );

            if (!response) return;
             const data = await response.json();

            if (!response.ok) {
                console.error(data);
                return;
            }

            setBudgets((current) =>
                current.filter((budget) => budget.id !== id)
            );
        } catch (error) {
            console.error("Error deleting budget:", error);
        }
    };

    return (
        <div className="budgets-page">
            <Sidebar />

            <main className="budgets-main">

                <div className="budgets-header">
                    <div>
                        <h1>Budgets</h1>
                        <p>Set spending limits and stay on track.</p>
                    </div>

                    <button
                        className="new-budget-btn"
                        onClick={() => setShowForm(!showForm)}
                    >
                        {showForm ? "− Close" : "+ New Budget"}
                    </button>
                </div>

                {showForm && (
                    <div className="budget-form-card">
                        <form onSubmit={handleSubmit}>

                            <label>Category</label>

                            <input
                                type="text"
                                value={category}
                                onChange={(e) =>
                                    setCategory(e.target.value)
                                }
                            />
                            <label>Budget Amount</label>

                            <input
                                type="number"
                                step="0.01"
                                value={amount}
                                onChange={(e) =>
                                    setAmount(e.target.value)
                                }
                            />

                                <button type="submit">
                                Save Budget
                            </button>

                        </form>
                    </div>
                )}

                <div className = "budgets-list">
                    {budgets.length === 0 ? (
                        <p className="empty-message">
                            No budgets yet.
                        </p>
                    ) : (

                        budgets.map((budget) => {
    const spent = transactions
        .filter(
            (transaction) =>
                transaction.type === "expense" &&
                transaction.name.toLowerCase() ===
                    budget.category.toLowerCase()
        )
        .reduce(
            (total, transaction) =>
                total + Number(transaction.amount),
            0
        );

    const budgetAmount = Number(budget.amount);

    const percentage =
        budgetAmount > 0
            ? Math.min((spent / budgetAmount) * 100, 100)
            : 0;

    const remaining = budgetAmount - spent;

    return (
        <div
            className="budget-card"
            key={budget.id}
        >
            <div className="budget-info">

                <div className="budget-title">
                    <h2>{budget.category}</h2>

                    <span>
                        ${spent.toFixed(2)} / $
                        {budgetAmount.toFixed(2)}
                    </span>
                </div>

                <div className="budget-progress">
                    <div
                        className="budget-progress-bar"
                        style={{
                            width: `${percentage}%`,
                        }}
                    ></div>
                </div>

                <p className="budget-remaining">
                    {remaining >= 0
                        ? `$${remaining.toFixed(2)} remaining`
                        : `$${Math.abs(remaining).toFixed(2)} over budget`}
                </p>

            </div>

            <button
                className="delete-budget-btn"
                onClick={() => handleDelete(budget.id)}
                title="Delete budget"
            >
                <Trash2 size={18} />
            </button>
        </div>
             );
                })
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
}
export default Budgets;
