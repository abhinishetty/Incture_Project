import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts";
import "./index.css";

const Reports = () => {
  const [reports, setReports] = useState([]);
  const COLORS = ["#0088FE", "#FFBB28", "#FF8042"];

  useEffect(() => {
    const mockReports = [
      { id: 1, title: "Project A", status: "Completed" },
      { id: 2, title: "Project B", status: "In Progress" },
      { id: 3, title: "Project C", status: "Pending" },
      { id: 4, title: "Project D", status: "Completed" },
      { id: 5, title: "Project E", status: "In Progress" },
    ];
    setReports(mockReports);
  }, []);

  const statusCounts = reports.reduce((acc, r) => {
    acc[r.status] = (acc[r.status] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.keys(statusCounts).map((key) => ({
    name: key,
    value: statusCounts[key],
  }));

  return (
    <div className="reports-container">
      <h2>Reports & Analytics</h2>

      {reports.length === 0 ? (
        <p>No reports available.</p>
      ) : (
        <>
          <ul>
            {reports.map((r) => (
              <li key={r.id}>
                <span>{r.title}</span>
                <span style={{ fontWeight: 600, color: "#6366f1" }}>{r.status}</span>
              </li>
            ))}
          </ul>

          <h3>Project Status Chart</h3>
          <div className="chart-wrapper">
            <PieChart width={400} height={300}>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                label
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </div>
        </>
      )}
    </div>
  );
};

export default Reports;
