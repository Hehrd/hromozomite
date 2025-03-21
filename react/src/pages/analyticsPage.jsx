import React from "react";
import { Line, Pie } from "react-chartjs-2"; // Import Pie chart
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement, // Required for Pie chart
} from "chart.js";
import "./analyticsPage.css";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement);

const AnalyticsPage = () => {
  // Sample data for the line chart
  const lineData = {
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

  // Sample data for the pie chart
  const pieData = {
    labels: ["Food", "Transport", "Entertainment", "Other"], // Categories
    datasets: [
      {
        label: "Spending Categories",
        data: [300, 150, 100, 50], // Values for each category
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)", // Red
          "rgba(54, 162, 235, 0.6)", // Blue
          "rgba(255, 206, 86, 0.6)", // Yellow
          "rgba(75, 192, 192, 0.6)", // Green
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
        ],
        borderWidth: 1,
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

  const pieOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "right", // Position the legend on the right
      },
      title: {
        display: true,
        text: "Spending Categories",
      },
    },
  };

  return (
    <div className="analytics-container">
      <h1 className="analytics-title">Analytics</h1>
      <div className="chart-container">
        <Line data={lineData} options={options} />
      </div>
      <div className="pie-chart-container">
        <Pie data={pieData} options={pieOptions} />
      </div>
    </div>
  );
};

export default AnalyticsPage;