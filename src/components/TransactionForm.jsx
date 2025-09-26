// TransactionForm.jsx
import React, { useState } from "react";

export default function TransactionForm({ onCreate }) {
    const [description, setDescription] = useState("");
    const [amount, setAmount] = useState("");
    const [category, setCategory] = useState("");
    const [type, setType] = useState("income");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!description || !amount) {
        alert("Please fill all required fields.");
        return;
        }
        const newTransaction = {
        description,
        amount: parseFloat(amount),
        category,
        type,
        date: new Date().toISOString(),
        };
        await onCreate(newTransaction);
        setDescription("");
        setAmount("");
        setCategory("");
        setType("income");
    };

    return (
        <form className="tx-form" onSubmit={handleSubmit}>
        <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
        />
        <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
        </select>
        <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
        />
        <input
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
        />
        <button type="submit">Add</button>
        </form>
    );
}



