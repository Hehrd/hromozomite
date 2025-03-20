import React from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import "./indexElements.css";
import MoneySpentChart from "./moneySpentChart.jsx"; // Import the chart component

const IndexElements = () => {
  return (
    <div className="tabs-container">
      {/* Money Spent - Link to analyticsPage */}
      <div className="tab-box">
        <Link to="/analyticsPage" className="tab-link">
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

      {/* Money Saved - Placeholder content */}
      <div className="tab-box">
        <h2>Money Saved This Month</h2>
        <p>Coming Soon...</p>
      </div>
    </div>
  );
};

export default IndexElements;
