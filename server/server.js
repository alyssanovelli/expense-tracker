import express from "express";
import pool from "./db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = "my-secret-key";
const app = express();

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
        const result = await pool.query("SELECT * FROM transactions");
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to fetch transactions",
        });
    }
});

app.post("/api/transactions", async(req, res) => {
    try{
        const { user_id, name, amount, type, date, note} = req.body;

        const result = await pool.query(
            'INSERT INTO transactions (user_id, name, amount, type, date, note) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [user_id, name, amount, type, date, note]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to add transaction",
        });
    }
    });
const PORT = 5000;
app.post("/api/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const passwordHash = await bcrypt.hash(password, 10);

        const result = await pool.query(
            'INSERT INTO users (name, email, password_hash) VALUES ($1, $2, $3) RETURNING id, name, email',
            [name, email, passwordHash]
        );
        res.status(201).json(result.rows[0]);
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
        const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "1h" });

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