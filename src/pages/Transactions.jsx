import Sidebar from "../components/sidebar";
import { useState, useEffect } from "react";
import "./Transactions.css"
import Footer from "../components/Footer"
import { Pencil, Trash2 } from "lucide-react";
import { apiFetch } from "../utils/apiFetch";
import { CgEditBlackPoint } from "react-icons/cg";

function Transactions() {
    const [name, setName] = useState("");
    const [amount, setAmount] = useState("");
    const [type, setType] = useState("expense");
    const [date, setDate] = useState("");
    const [note, setNote] = useState("");  
    const [showForm, setShowForm] = useState(false);
    const [closingForm, setClosingForm] = useState(false);
    const [transactions, setTransactions] = useState([]);
    const [editingId, setEditingId] = useState(null);

    const toggleForm = () => {
    if (showForm) {
        setClosingForm(true);

        setTimeout(() => {
            setShowForm(false);
            setClosingForm(false);
        }, 200);
    } else {
        setShowForm(true);
    }
};
    const handleSubmit = async (e) => {
        e.preventDefault();

        const transaction = {
            name, amount, type, date, note
        };
        try {
            const url = editingId
                ? `http://localhost:5000/api/transactions/${editingId}`
                : "http://localhost:5000/api/transactions";

            const response = await apiFetch(url, {
                    method: editingId ? "PUT" : "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(transaction),
                });

            if (!response) return;
            
            const data = await response.json();

            if (!response.ok) {
                console.error(data);
                return;
            }

            if(editingId) {
                setTransactions((current) =>
                    current.map((transaction) =>
                        transaction.id === editingId ? data : transaction
                    )
                );
            } else {
                setTransactions((current) => [data, ...current]);
            }

            setName("");
            setAmount("");
            setType("expense");
            setDate("");
            setNote("");
            setEditingId(null);
            toggleForm();
            
        } catch (error) {
            console.error("Error saving transaction:", error);
        }
    };

    useEffect(() => {
    const fetchTransactions = async () => {
        try {
            const response = await apiFetch(
                "http://localhost:5000/api/transactions",
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

    const handleEdit = (transaction) => {
    setEditingId(transaction.id);

    setName(transaction.name);
    setAmount(transaction.amount);
    setType(transaction.type);

    setDate(transaction.date.slice(0, 10));

    setNote(transaction.note || "");

    setShowForm(true);
    };

    const handleDelete = async (id) => {
        try {
            const response = await apiFetch(
               `http://localhost:5000/api/transactions/${id}`,
               {
                method: 'DELETE',
               } 
            );
            if (!response) return;

            const data = await response.json();
            if (!response.ok) {
                console.error(data);
                return;
            }
            console.log("Transaction deleted:", data);
            setTransactions((current) =>
            current.filter((transaction) => transaction.id !== id)
            );
        } catch (error) {
            console.error("Error deleting transaction:", error);
        }
    };
    return (
        <div className="transactions-page">
            <Sidebar />
        <main className="transactions-main">
        <div className = "header-transactions">
            <div>
            <h1>Transactions</h1>
            <p>Track spending and income.</p>
            </div>
            <button
                className="new-transaction-btn"
                onClick={toggleForm}
>
                {showForm ? "− Close" : "+ New Transaction"}
            </button>
        </div>
        {showForm && (
    <div className={`transaction-card ${closingForm ? "closing" : ""}`}>
        <form onSubmit={handleSubmit}>
            <label>Name:</label>
            <input 
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />

            <label>Amount:</label>
            <input 
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
            />

            <label>Type:</label>
            <select
                value={type}
                onChange={(e) => setType(e.target.value)}
            >
                <option value="expense">Expense</option>
                <option value="income">Income</option>
            </select>

            <label>Date:</label>
            <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
            />

            <label>Notes:</label>
            <input
                type="text"
                value={note}
                onChange={(e) => setNote(e.target.value)}
            />

            <button type="submit">
                {editingId ? "Update Transaction " : "Save Transaction"}
            </button>
        </form>
    </div>
)}

<div className="transactions-list">
    {transactions.length === 0 ? (
        <p>No transactions yet.</p>
    ) : (
      transactions.map((transaction) => (
    <div className="transaction-row" key={transaction.id}>

        <div className="transaction-info">
            <strong>{transaction.name}</strong>

            <span>
                {new Date(transaction.date).toLocaleDateString(
                    "en-US",
                    {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                    }
                )}
            </span>
        </div>

        <div className="transaction-actions">
            <span>
                {transaction.type === "income"
                    ? "Income"
                    : "Expense"}
            </span>

            <strong>
                ${Number(transaction.amount).toFixed(2)}
            </strong>

            <button
                className="edit-btn"
                title="Edit transaction"
                type="button"
                onClick={() => handleEdit(transaction)}
            >
                <Pencil size={18} />
            </button>

            <button
                className="delete-btn"
                title="Delete transaction"
                type="button"
                onClick={() => handleDelete(transaction.id)}
            >
                <Trash2 size={18} />
            </button>
        </div>

    </div>
))
)}
</div>
</main>

<Footer />
</div>
    )
}
export default Transactions;