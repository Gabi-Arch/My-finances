import React from "react";

export default function TransactionList({ transactions, onDelete }) {
    if (!transactions.length) {
        return <p style={{ textAlign: "center", color: "#666" }}>No transactions found.</p>;
    }

    return (
        <div className="tx-list">
            <table>
                <thead>
                <tr>
                    <th>Data</th>
                    <th>Description</th>
                    <th>Category</th>
                    <th>Value</th>
                    <th>Type</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {transactions.map((tx) => (
                    <tr key={tx.id}>
                    <td>{new Date(tx.date).toLocaleDateString("pt-BR", { 
                        day: "2-digit", month: "2-digit", year: "numeric", 
                        hour: "2-digit", minute: "2-digit" })}</td>
                    <td>{tx.description || "-"}</td>
                    <td>{tx.category || "-"}</td>
                    <td
                        style={{
                        color: tx.type === "income" ? "green" : "red",
                        fontWeight: "bold",
                        }}
                    >
                        $ {Number(tx.amount).toFixed(2)}
                    </td>
                    <td>{tx.type === "income" ? "Profits" : "Expenses"}</td>
                    <td>
                        <button
                        onClick={() => onDelete(tx.id)}
                        style={{
                            background: "#ff4d4f",
                            color: "white",
                            border: "none",
                            padding: "6px 10px",
                            borderRadius: "4px",
                            cursor: "pointer",
                        }}
                        >
                        Delete
                        </button>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
        </div>
    );
}

