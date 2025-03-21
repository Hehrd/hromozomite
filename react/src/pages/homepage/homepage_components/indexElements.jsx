import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import "./indexElements.css";
import MoneySpentChart from "./moneySpentChart.jsx"; // Import the chart component

const IndexElements = () => {
  const [balance, setBalance] = useState(0); // State to store the balance
  const [transactions, setTransactions] = useState([
    { description: "Groceries", amount: 25.99 },
    { description: "Utilities", amount: 45.0 },
    { description: "Entertainment", amount: 15.5 },
  ]);
  
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

    const fetchTransactions = async () => {
      try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/last-3-transactions`, {
        method: "GET",
        headers: {
        "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await response.json();
      setTransactions(data.transactions);
      } catch (error) {
      console.error("Error fetching transactions:", error);
      }
    };
    fetchTransactions();

  }, []);
  return (
    <div className="tabs-container">
      {/* Money Spent - Link to analyticsPage */}
      <div className="tab-box">
        <Link to="/analytics" className="tab-link">
          <h2 id="money-spent-h2">Money Spent</h2>
          <MoneySpentChart /> {/* Line chart inside */}
        </Link>
      </div>

      {/* Transactions today - Link to transactionsPage */}
      <div className="tab-box" id="transactions-box">
  <Link to="/transactions" className="tab-link">
    <h2>Last 3 transactions</h2>
    {transactions.length > 0 ? (
      <ul>
        {transactions.map((tx, index) => (
          <li key={index}>
            {tx.description} - ${tx.amount}
          </li>
        ))}
      </ul>
    ) : (
      <p>No transactions found.</p>
    )}
  </Link>
</div>


      {/* Money Saved - Placeholder content with Balance */}
      <div className="tab-box balance-box">
        <Link to="/balance" className="tab-link">
          <h2>Money Saved This Month</h2>
          <p>Balance: </p> {/* Display balance here */}
          <p className="balance-p">${balance.toFixed(2)}</p>
        </Link>
      </div>
    </div>
  );
};

export default IndexElements;
