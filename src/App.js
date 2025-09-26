import { useEffect, useState, useCallback } from "react";
import {
  fetchTransactions,
  createTransaction,
  deleteTransaction,
  fetchSummary,
} from "./services/api";
import TransactionForm from "./components/TransactionForm";
import Summary from "./components/Summary";
import TransactionList from "./components/TransactionList";
import Charts from "./components/Charts";
import './App.css';

export default function App() {
  const [transactions, setTransactions] = useState([]);
  const [summary, setSummary] = useState([]);
  const [period] = useState("2025-01");

  const loadData = useCallback(async () => {
    try {
      const start = `${period}-01`;
      const end = `${period}-31`;
      const data = await fetchTransactions(start, end);
      setTransactions(data);
    } catch (err) {
      console.error("Error loading transactions", err);
    }
  }, [period]);

  const loadSummary = useCallback(async () => {
    try {
      const data = await fetchSummary(period);
      setSummary(data);
    } catch (err) {
      console.error("Error loading summary", err);
    }
  }, [period]);

  useEffect(() => {
    loadData();
    loadSummary();
  }, [loadData, loadSummary]);


  const addTransaction = async (tx) => {
    try {
      const newTx = await createTransaction(tx);
      setTransactions((prev) => [newTx, ...prev]);
      loadSummary();
    } catch (err) {
      console.error("Error creating transaction", err);
    }
  };

  const removeTransaction = async (id) => {
    try {
      await deleteTransaction(id);
      setTransactions(prev => prev.filter((t) => t.id !== id));
      loadSummary();
    } catch (err) {
      console.error("Error deleting transaction", err);
    }
  };

  return (
    <div className="app">
      <h1>MY FINANCES</h1>
      <h2>Insert new transaction</h2>
      <TransactionForm onCreate={addTransaction} />
      <h2>Dashboard</h2>
      <div className="dashboard">
        <Summary summary={summary} />
        <Charts transactions={transactions} month={period} />
      </div>
      <h2>Transactions</h2>
      <TransactionList transactions={transactions} onDelete={removeTransaction} />
      

    </div>
  );
}

