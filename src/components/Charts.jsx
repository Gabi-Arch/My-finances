import React, { useMemo } from "react";
import "chart.js/auto";
import { Pie, Bar } from "react-chartjs-2";
import { format, parseISO } from "date-fns";

export default function Charts({ transactions, month }) {
    // Agrupamento por categoria
    const categoryData = useMemo(() => {
        const map = {};
        transactions.forEach((t) => {
        const key = t.category || "Uncategorized";
        const value = Number(t.amount) || 0;
        map[key] = (map[key] || 0) + (t.type === "expense" ? -value : value);
        });

        return {
        labels: Object.keys(map),
        data: Object.values(map).map((v) => Math.abs(v)),
        };
    }, [transactions]);

    // Fluxo diário do mês
    const daily = useMemo(() => {
        const days = {};
        transactions.forEach((t) => {
        if (!t.date) return;
        const d = format(parseISO(t.date), "yyyy-MM-dd");
        const value = Number(t.amount) || 0;
        days[d] = (days[d] || 0) + (t.type === "income" ? value : -value);
        });

        const labels = Object.keys(days).sort();
        const data = labels.map((l) => days[l]);

        return { labels, data };
    }, [transactions]);

    return (
        <div className="charts">
            <div className="chart-item">
                <h4>Distribution by category</h4>
                <Pie
                data={{
                    labels: categoryData.labels,
                    datasets: [
                    {
                        data: categoryData.data,
                        backgroundColor: [
                        "#2196f3",
                        "#ff9800",
                        "#9c27b0",
                        "#4caf50",
                        "#f44336",
                        "#00bcd4",
                        "#8bc34a",
                        ],
                    },
                    ],
                }}
                />
            </div>

            <div className="chart-item">
                <h4>Daily flow</h4>
                <Bar
                data={{
                    labels: daily.labels,
                    datasets: [
                    {
                        label: "Balance per day",
                        data: daily.data,
                        backgroundColor: daily.data.map((v) =>
                        v >= 0 ? "#4caf50" : "#f44336"
                        ),
                    },
                    ],
                }}
                />
            </div>
        </div>
    );
}
