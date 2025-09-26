import axios from "axios";

const API = process.env.REACT_APP_API_URL || "http://localhost:4000";

// Buscar transações com intervalo de datas
export const fetchTransactions = (start, end) =>
    axios
    .get(`${API}/transactions`, { params: { start, end } })
    .then((r) => r.data);

// Criar transação
export const createTransaction = (tx) =>
    axios.post(`${API}/transactions`, tx).then((r) => r.data);

// Excluir transação
export const deleteTransaction = (id) =>
    axios.delete(`${API}/transactions/${id}`).then((r) => r.data);

// Buscar resumo mensal
export const fetchSummary = (month) =>
    axios.get(`${API}/summary`, { params: { month } }).then((r) => r.data);

console.log("API URL:", API);
