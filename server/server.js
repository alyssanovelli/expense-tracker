import express from "express";
const app = express();

app.use(express.json());
app.get("/", (req, res) => {
    res.send("Expense Tracker server is working!");
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});