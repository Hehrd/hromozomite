import React, { useState, useEffect } from "react";
import { Line, Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import "./analyticsPage.css";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const AnalyticsPage = () => {
  const [pieData, setPieData] = useState(null);

  // Sample static data for the line chart
  const lineData = {
    labels: ["2025-03-01", "2025-03-02", "2025-03-03", "2025-03-04", "2025-03-05"],
    datasets: [
      {
        label: "Transaction Amounts",
        data: [50, 75, 100, 150, 200],
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        tension: 0.4,
      },
    ],
  };

  // Sample static data for the bar chart
  const barData = {
    labels: ["January", "February", "March", "April", "May"],
    datasets: [
      {
        label: "Monthly Spending",
        data: [500, 700, 800, 600, 900],
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
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
        labels: { font: { size: 16 } },
      },
      title: {
        display: true,
        text: "Transaction Trends",
        font: { size: 24 },
      },
      tooltip: { bodyFont: { size: 14 } },
    },
  };

  const pieOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "right",
        labels: { font: { size: 16 } },
      },
      title: {
        display: true,
        text: "Spending Categories",
        font: { size: 24 },
      },
      tooltip: { bodyFont: { size: 14 } },
    },
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: { font: { size: 16 } },
      },
      title: {
        display: true,
        text: "Monthly Spending",
        font: { size: 24 },
      },
      tooltip: { bodyFont: { size: 14 } },
    },
  };

  // Fetch the pie chart data on component mount
  useEffect(() => {
    fetch("http://localhost:6969/loadData/transactions")
      .then((response) => response.json())
      .then((data) => {
        // Assuming the response is a list of JSON objects, for example:
        // [ { category: "Food", amount: 300 }, { category: "Transport", amount: 150 }, ... ]
        const labels = data.map((item) => item.category);
        const amounts = data.map((item) => item.amount);
        setPieData({
          labels,
          datasets: [
            {
              label: "Spending Categories",
              data: amounts,
              backgroundColor: [
                "rgba(255, 99, 132, 0.6)",
                "rgba(54, 162, 235, 0.6)",
                "rgba(255, 206, 86, 0.6)",
                "rgba(75, 192, 192, 0.6)",
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
        });
      })
      .catch((err) => console.error("Error fetching pie chart data:", err));
  }, []);

  return (
    <div className="analytics-container">
      <h1 className="analytics-title">Analytics</h1>
      <div className="charts-grid">
        {/* First Column */}
        <div className="column">
          <div className="chart-container">
            <Line data={lineData} options={options} />
          </div>
        </div>

        {/* Second Column */}
        <div className="column">
          <div className="chart-container">
            {pieData ? (
              <Pie data={pieData} options={pieOptions} />
            ) : (
              <p>Loading pie chart data...</p>
            )}
          </div>
        </div>

        {/* Third Column */}
        <div className="column">
          <div className="chart-container">
            <Bar data={barData} options={barOptions} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
