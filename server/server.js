import "dotenv/config";

import express from "express";
import pool from "./db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cors from "cors";
import crypto from "crypto";
import { Resend } from "resend";


const JWT_SECRET = process.env.JWT_SECRET;
const resend = new Resend(process.env.RESEND_API_KEY);
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
            "SELECT id FROM users WHERE email = $1",
            [email]
        );

        const message =
            "If an account with that email exists, a password reset link has been sent.";

        if (result.rows.length === 0) {
            return res.json({ message });
        }

        const userId = result.rows[0].id;

        const resetToken = crypto
            .randomBytes(32)
            .toString("hex");

        const tokenHash = crypto
            .createHash("sha256")
            .update(resetToken)
            .digest("hex");

        const expiresAt = new Date(
            Date.now() + 30 * 60 * 1000
        );

        await pool.query(
            "DELETE FROM password_resets WHERE user_id = $1",
            [userId]
        );

        await pool.query(
            `INSERT INTO password_resets
             (user_id, token_hash, expires_at)
             VALUES ($1, $2, $3)`,
            [userId, tokenHash, expiresAt]
        );

        const resetUrl =
            `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

        const { error } = await resend.emails.send({
            from: "Expense Tracker <onboarding@resend.dev>",
            to: [email],
            subject: "Reset your Expense Tracker password",
            html: `
                <h2>Reset your password</h2>

                <p>
                    We received a request to reset your Expense Tracker password.
                </p>

                <p>
                    Click the button below to choose a new password.
                </p>

                <p>
                    <a
                        href="${resetUrl}"
                        style="
                            display: inline-block;
                            padding: 12px 20px;
                            background-color: #3565a8;
                            color: white;
                            text-decoration: none;
                            border-radius: 8px;
                        "
                    >
                        Reset Password
                    </a>
                </p>

                <p>
                    This link will expire in 30 minutes.
                </p>

                <p>
                    If you did not request a password reset, you can safely ignore this email.
                </p>
            `
        });

        if (error) {
            console.error("Resend error:", error);

            return res.status(500).json({
                message: "Something went wrong. Please try again."
            });
        }

        res.json({ message });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Something went wrong. Please try again."
        });
    }
});
app.post("/api/reset-password", async (req, res) => {
    try {
        const { token, password } = req.body;

        if (!token || !password) {
            return res.status(400).json({
                message: "Token and password are required."
            });
        }

        const tokenHash = crypto
            .createHash("sha256")
            .update(token)
            .digest("hex");
        
        const result = await pool.query(
            `SELECT *
             FROM password_resets
             WHERE token_hash = $1
             AND expires_at > NOW()`,
            [tokenHash]
        );

        if (result.rows.length === 0) {
            return res.status(400).json({
                message: "Invalid or expired reset link."
            });
        }
        const reset = result.rows[0];

        const passwordHash = await bcrypt.hash(password, 10);

        await pool.query(
            `UPDATE users
            SET password_hash = $1
            WHERE id = $2`,
            [passwordHash, reset.user_id]
        );

        await pool.query(
            `UPDATE password_resets
             SET used = TRUE
             WHERE id = $1`,
            [reset.id]
        );
        res.json({
            message: "Password reset successful. You can now log in with your new password."
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