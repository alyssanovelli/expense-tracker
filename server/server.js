import "dotenv/config";

import express from "express";
import pool from "./db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cors from "cors";


const JWT_SECRET = process.env.JWT_SECRET;
const app = express();

app.use(cors({
    origin: [
            "http://localhost:5173",
            "https://expense-tracker-fe-z51v.onrender.com"
    ]
}));

app.use(express.json());

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];
    
    if (!token) {
        return res.status(401).json({
            message: "Access denied. No token provided."
        });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);

        req.user = decoded;

        next();
    } catch (error) {
        return res.status(403).json({
            message: "Invalid or expired token."
        });
    }
};

app.get("/", (req, res) => {
    res.send("Expense Tracker server is working!");
});
app.get("/api/transactions", authenticateToken, async(req, res) => {
    try {
        const result = await pool.query("SELECT * FROM transactions WHERE user_id = $1",
            [req.user.userId]
        );
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to fetch transactions",
        });
    }
});

app.post("/api/transactions", authenticateToken, async(req, res) => {
    try{
        const { name, amount, type, budget, date, note} = req.body;

        const result = await pool.query(
            'INSERT INTO transactions (user_id, name, amount, type, budget, date, note) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
            [req.user.userId, name, amount, type, budget, date, note]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to add transaction",
        });
    }
    });
    app.put("/api/transactions/:id", authenticateToken, async (req, res) => {
        try {
             const { name, amount, type, budget, date, note } = req.body;
        const transactionId = req.params.id;

        const result = await pool.query(
            `UPDATE transactions
             SET name = $1,
                 amount = $2,
                 type = $3,
                 budget = $4,
                 date = $5,
                 note = $6
             WHERE id = $7
             AND user_id = $8
             RETURNING *`,
            [
                name,
                amount,
                type,
                budget,
                date,
                note,
                transactionId,
                req.user.userId
            ]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "Transaction not found"
            });
        }

        res.json(result.rows[0]);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to update transaction"
        });
    }
});

app.delete("/api/transactions/:id", authenticateToken, async (req, res) => {
    try {
        const transactionId = req.params.id;

        const result = await pool.query(
            `DELETE FROM transactions
             WHERE id = $1
             AND user_id = $2
             RETURNING *`,
            [transactionId, req.user.userId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "Transaction not found"
            });
        }

        res.json({
            message: "Transaction deleted successfully",
            transaction: result.rows[0]
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to delete transaction"
        });
    }
});
const PORT = process.env.PORT || 5000;

app.get("/api/budgets", authenticateToken, async (req, res) => {
    try {
        const result = await pool.query(
            `SELECT *
             FROM budgets
             WHERE user_id = $1
             ORDER BY id DESC`,
             [req.user.userId]
        );
        res.json(result.rows);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to fetch budgets",
        });
    }
});

app.post("/api/budgets", authenticateToken, async (req, res) => {
    try {
        const { category, amount } = req.body;

        const result = await pool.query(
            `INSERT INTO budgets (user_id, category, amount)
             VALUES ($1, $2, $3)
             RETURNING *`,
            [
                req.user.userId,
                category,
                amount
            ]
        );

        res.status(201).json(result.rows[0]);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to create budget",
        });
    }
});


app.delete("/api/budgets/:id", authenticateToken, async (req, res) => {
    try {
        const budgetId = req.params.id;

        const result = await pool.query(
            `DELETE FROM budgets
             WHERE id = $1
             AND user_id = $2
             RETURNING *`,
            [
                budgetId,
                req.user.userId
            ]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "Budget not found",
            });
        }

        res.json({
            message: "Budget deleted successfully",
            budget: result.rows[0],
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to delete budget",
        });
    }
});

app.post("/api/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await pool.query(
            'SELECT * FROM users WHERE email = $1',
            [email]
        );
            if (existingUser.rows.length > 0) {
                return res.status(409).json({
                    message: "Email is already in use."
                });
            }
            
        const passwordHash = await bcrypt.hash(password, 10);

        const result = await pool.query(
            `INSERT INTO users (name, email, password_hash)
             VALUES ($1, $2, $3)
             RETURNING id, name, email`,
            [name, email, passwordHash]
        );

        const user = result.rows[0];

        const token = jwt.sign(
            { userId: user.id },
            JWT_SECRET,
            { expiresIn: "30d" }
        );

        res.status(201).json({
            message: "Registration successful",
            token: token,
            user: user
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to register user",
        });
    }
});

app.post("/api/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const result = await pool.query(
            'SELECT * FROM users WHERE email = $1',
            [email]
        );
        if (result.rows.length === 0) {
            return res.status(401).json({ message: "Invalid email or password" });
        }
        const user = result.rows[0];
        const passwordMatch = await bcrypt.compare(password, user.password_hash);
        if (!passwordMatch) {
            return res.status(401).json({ message: "Invalid email or password" });
        }
        const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "30d" });

        res.json({
            message: "Login successful", 
            token: token, 
            user: {
                id: user.id, 
                name: user.name,
                email: user.email,
            },
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to login" });
    }
});
app.post("/api/forgot-password", async (req, res) => {
    try {
        const { email } = req.body;

        const result = await pool.query(
            "SELECT * FROM users WHERE email = $1",
            [email]
        );

        if (result.rows.length === 0) {
            return res.json({
                message:
                    "If an account with that email exists, a password reset link has been sent."
            });
        }

        res.json({
            message:
                "If an account with that email exists, a password reset link has been sent."
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Something went wrong. Please try again."
        });
    }
});
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