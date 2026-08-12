import express from "express";
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Expense Tracker server is working!");
});
app.get("/api/transactions", (req, res) => {
    const transactions = [
        {
            name: "Coffee",
            amount: 6.40,
            type: "expense",
        },
        {
            name: "Salary",
            amount: 2000,
            type: "income",
        },
    ];
    res.json(transactions);
});
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});