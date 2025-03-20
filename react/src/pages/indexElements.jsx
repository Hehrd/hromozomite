import React from "react";
import "./indexElements.css";
import MoneySpentChart from "./moneySpentChart.jsx";

const IndexElements = () => {
  return (
    <div className="tabs-container">
      {/* Money Spent */}
      <div className="tab-box">
        <h2>Money Spent</h2>
        <MoneySpentChart /> {/* Line chart inside */}
      </div>

      {/* Friends Leaderboard */}
      <div className="tab-box">
        <h2>Transactions today</h2>
        <p>Coming Soon...</p>
      </div>

      {/* Money Saved */}
      <div className="tab-box">
        <h2>Money Saved This Month</h2>
        <p>Coming Soon...</p>
      </div>
    </div>
  );
};

export default IndexElements;
