import express from "express";
import pool from "./db.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Expense Tracker server is working!");
});
app.get("/api/transactions", async(req, res) => {
    try {
        const result = await pool.query("SELECT * FROM transactions");
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to fetch transactions",
        });
    }
});

app.post("/api/transactions", (req, res) => {
    const newTransaction = req.body;

    console.log(newTransaction);
    res.json({
        message: "Transaction added successfully",
        transaction: newTransaction,
    });
    });
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
app.get("/api/test-db", async (req, res) => {
    try {
        const result = await pool.query("SELECT NOW()");
        res.json({
            message: "Database connection successful",
            time: result.rows[0]

        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Database connection failed",
        });
    }
 });