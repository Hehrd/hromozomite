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
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    fetch("/statistics/weekly")
      .then((res) => res.json())
      .then((data) => {
        const labels = data.map((entry) =>
          new Date(entry.date).toLocaleDateString("en-US", { weekday: "short" })
        );

        const amounts = data.map((entry) => entry.amount);

        setChartData({
          labels,
          datasets: [
            {
              label: "Total Money Spent ($)",
              data: amounts,
              borderColor: "rgba(75, 192, 192, 1)",
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              borderWidth: 2,
              pointRadius: 5,
              pointBackgroundColor: "rgba(75, 192, 192, 1)",
              tension: 0.4,
            },
          ],
        });
      })
      .catch((err) => console.error("Failed to load weekly stats:", err));
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

  return (
    <div className="chart-container">
      <Line data={chartData} options={options} />
    </div>
  );
};

export default MoneySpentChart;
