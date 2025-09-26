export default function Summary({ summary }) {
  // summary vem do backend no formato: [{ type: 'income', total: "1000.00" }, { type: 'expense', total: "500.00" }]
    const income =
        summary.find((s) => s.type === "income")?.total || 0;
    const expense =
        summary.find((s) => s.type === "expense")?.total || 0;
    const balance = income - expense;

    return (
        <div className="summary">
            <h2>Monthly Summary</h2>

            <div className="summary-card">
                <h3>Profits:</h3>
                <p>
                <strong style={{ color: "green" }}>
                    $ {parseFloat(income).toFixed(2)}
                </strong>
                </p>
            </div>

            <div className="summary-card">
                <h3>Expenses:</h3>
                <p>
                <strong style={{ color: "red" }}>
                    $ {parseFloat(expense).toFixed(2)}
                </strong>
                </p>
            </div>

            <div className="summary-card">
                <h3>Balance:</h3>
                <p>
                <strong style={{ color: "blue" }}>
                    $ {parseFloat(balance).toFixed(2)}
                </strong>
                </p>
            </div>
        </div>
    );
}

