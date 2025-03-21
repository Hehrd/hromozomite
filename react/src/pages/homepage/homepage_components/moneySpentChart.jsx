import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "./moneySpentChart.css";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

const MoneySpentChart = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:6969/statistics/weekly", {
          credentials: "include",
        });

        const result = await response.json();

        // Optional: sort by date so it appears in chronological order
        const sortedResult = result.sort((a, b) => new Date(a.date) - new Date(b.date));

        // Create arrays for Chart.js
        const labels = sortedResult.map((item) => item.date);
        const data = sortedResult.map((item) => item.amount);

        setChartData({
          labels,
          datasets: [
            {
              label: "Total Money Spent ($)",
              data,
              borderColor: "rgba(75, 192, 192, 1)",
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              borderWidth: 2,
              pointRadius: 5,
              pointBackgroundColor: "rgba(75, 192, 192, 1)",
              tension: 0.4, // Smooth line
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  // Show a loading indicator while data is being fetched
  if (!chartData) {
    return <div>Loading...</div>;
  }

  return (
      <div className="chart-container">
        <Line data={chartData} options={options} />
      </div>
  );
};

export default MoneySpentChart;
