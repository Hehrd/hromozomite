import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import "./indexElements.css";
import MoneySpentChart from "./moneySpentChart.jsx"; // Import the chart component

const IndexElements = () => {
  const [balance, setBalance] = useState(0); // State to store the balance

  // Fetch balance from the backend
  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/useraccount/balance`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        const data = await response.json();
        setBalance(data.balance); // Assuming the backend sends { balance: <amount> }
      } catch (error) {
        console.error("Error fetching balance:", error);
      }
    };

    fetchBalance();
  }, []);

  return (
    <div className="tabs-container">
      {/* Money Spent - Link to analyticsPage */}
      <div className="tab-box">
        <Link to="/analytics" className="tab-link">
          <h2>Money Spent</h2>
          <MoneySpentChart /> {/* Line chart inside */}
        </Link>
      </div>

      {/* Transactions today - Link to transactionsPage */}
      <div className="tab-box">
        <Link to="/transactions" className="tab-link">
          <h2>Transactions today</h2>
          <p>Coming Soon...</p>
        </Link>
      </div>

      {/* Money Saved - Placeholder content with Balance */}
      <div className="tab-box balance-box">
        <h2>Money Saved This Month</h2>
        <p>Balance: ${balance.toFixed(2)}</p> {/* Display balance here */}
      </div>
    </div>
  );
};

export default IndexElements;
