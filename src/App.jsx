import React, { useEffect, useState } from 'react';
import './App.css';
import { fetchTransactions, createTransaction, deleteTransaction, fetchSummary } from './services/api';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import Summary from './components/Summary';
import Charts from './components/Charts';
import { startOfMonth, endOfMonth, format } from 'date-fns';

function App() {
    const [transactions, setTransactions] = useState([]);
    const [period, setPeriod] = useState(() => format(new Date(), 'yyyy-MM')); // YYYY-MM

    const load = async () => {
        try {
        const start = format(startOfMonth(new Date(period + '-01')), 'yyyy-MM-dd');
        const end = format(endOfMonth(new Date(period + '-01')), 'yyyy-MM-dd');
        const data = await fetchTransactions(start, end + 'T23:59:59Z');
        setTransactions(data);
        } catch (err) {
        console.error(err);
        alert('Erro ao carregar transações');
        }
    };

    useEffect(() => { load(); }, [period]);

    const handleCreate = async (tx) => {
        try {
        const created = await createTransaction(tx);
        setTransactions(prev => [created, ...prev]);
        } catch (err) {
        console.error(err);
        alert('Erro ao criar transação');
        }
    };

    const handleDelete = async (id) => {
        try {
        await deleteTransaction(id);
        setTransactions(prev => prev.filter(t => t.id !== id));
        } catch (err) {
        console.error(err);
        alert('Erro ao excluir');
        }
    };

    return (
        <div className="app">
        <h1>Controle Financeiro</h1>

        <div className="controls">
            <label>Período:
            <input type="month" value={period} onChange={e => setPeriod(e.target.value)} />
            </label>
        </div>

        <TransactionForm onCreate={handleCreate} />
        <Summary transactions={transactions} />
        <Charts transactions={transactions} month={period} />
        <TransactionList transactions={transactions} onDelete={handleDelete} />
        </div>
    )
}

export default App;
