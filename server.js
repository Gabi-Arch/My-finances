import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pool from "./db.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Health check
app.get("/", (req, res) => {
    res.send("API funcionando 🚀");
});

// Listar transações (opcionalmente com filtro de data)
app.get("/transactions", async (req, res) => {
    const { start, end } = req.query;
    try {
        let query = "SELECT * FROM transactions WHERE 1=1";
        const params = [];

        if (start) {
        params.push(start);
        query += ` AND date >= $${params.length}`;
        }
        if (end) {
        params.push(end);
        query += ` AND date <= $${params.length}`;
        }

        query += " ORDER BY date DESC";

        const result = await pool.query(query, params);
        res.json(result.rows);
    } catch (err) {
        console.error("Erro ao buscar transações:", err);
        res.status(500).json({ error: "Erro ao buscar transações" });
    }
});

// Criar transação
app.post("/transactions", async (req, res) => {
    const { description, amount, type, category, date } = req.body;
    try {
        const result = await pool.query(
        `INSERT INTO transactions (description, amount, type, category, date)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *`,
        [description, amount, type, category, date || new Date()]
        );
        res.json(result.rows[0]);
    } catch (err) {
        console.error("Erro ao adicionar transação:", err);
        res.status(500).json({ error: "Erro ao adicionar transação" });
    }
});

// Excluir transação
app.delete("/transactions/:id", async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query("DELETE FROM transactions WHERE id = $1", [id]);
        res.json({ success: true });
    } catch (err) {
        console.error("Erro ao excluir transação:", err);
        res.status(500).json({ error: "Erro ao excluir transação" });
    }
});

// Resumo por mês
app.get("/summary", async (req, res) => {
    const { month } = req.query; // formato esperado: YYYY-MM
    if (!month) return res.status(400).json({ error: "Mês é obrigatório" });

    try {
        const result = await pool.query(
        `SELECT type, SUM(amount) as total
        FROM transactions
        WHERE to_char(date, 'YYYY-MM') = $1
        GROUP BY type`,
        [month]
        );
        res.json(result.rows);
    } catch (err) {
        console.error("Erro ao gerar resumo:", err);
        res.status(500).json({ error: "Erro ao gerar resumo" });
    }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
