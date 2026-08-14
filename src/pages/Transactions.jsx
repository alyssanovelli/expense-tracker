import Sidebar from "../components/sidebar";
import { useState } from "react";
import "./Transactions.css"
import Footer from "../components/Footer"

function Transactions() {
    const [name, setName] = useState("");
    const [amount, setAmount] = useState("");
    const [type, setType] = useState("expense");
    const [date, setDate] = useState("");
    const [note, setNote] = useState("");  
    const [showForm, setShowForm] = useState(false);
    const [closingForm, setClosingForm] = useState(false);

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
            const response = await fetch("http://localhost:5000/api/transactions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify(transaction)
            });
            const data = await response.json();

            if (!response.ok) {
                console.error(data);
                return;
            }
            console.log("Transaction saved:", data);

            setName("");
            setAmount("");
            setType("expense");
            setDate("");
            setNote("");
            
            toggleForm();
            
        } catch (error) {
            console.error("Error saving transaction:", error);
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
                    onChange={(e) => setName (e.target.value)}
                    />

                    <label>Amount:</label>
                    <input 
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount (e.target.value)}
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
                    <button type="submit">Save Transaction</button>
                </form>
            </div>
        )}
        </main>

        <Footer />
        </div>
        
        
    )
}
export default Transactions;