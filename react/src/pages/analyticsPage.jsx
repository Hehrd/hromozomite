import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "./analyticsPage.css";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const AnalyticsPage = () => {
  // Sample data for the chart
  const data = {
    labels: ["2025-03-01", "2025-03-02", "2025-03-03", "2025-03-04", "2025-03-05"], // X-axis labels
    datasets: [
      {
        label: "Transaction Amounts",
        data: [50, 75, 100, 150, 200], // Y-axis data
        borderColor: "rgba(75, 192, 192, 1)", // Line color
        backgroundColor: "rgba(75, 192, 192, 0.2)", // Fill color under the line
        tension: 0.4, // Smoothness of the line
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Transaction Trends",
      },
    },
  };

  return (
    <div className="analytics-container">
      <h1 className="analytics-title">Analytics</h1>
      <div className="chart-container">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default AnalyticsPage;