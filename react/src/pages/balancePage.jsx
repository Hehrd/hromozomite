import React, { useState } from 'react';
import './balancePage.css';

const BalancePage = () => {
  // Example state for saved money
  const [currentMonthSavings, setCurrentMonthSavings] = useState(600); // Example: $600 saved this month
  const [lastMonthSavings, setLastMonthSavings] = useState(400); // Updated: $400 saved last month

  return (
    <div className="balance-page-container">
      <h1 className="balance-title">Savings Comparison</h1>
      <div className="savings-comparison">
        {/* Current Month Savings Box */}
        <div className="savings-box">
          <h2 className="savings-box-title">This Month</h2>
          <p className="savings-amount">
            ${typeof currentMonthSavings === "number" ? currentMonthSavings.toFixed(2) : "0.00"}
          </p>
        </div>

        {/* Last Month Savings Box */}
        <div className="savings-box">
          <h2 className="savings-box-title">Last Month</h2>
          <p className="savings-amount">
            ${typeof lastMonthSavings === "number" ? lastMonthSavings.toFixed(2) : "0.00"}
          </p>
        </div>
      </div>

      {/* Comparison Message */}
      <div className="comparison-message">
        {typeof currentMonthSavings === 'number' && typeof lastMonthSavings === 'number' ? (
          currentMonthSavings > lastMonthSavings ? (
            <p>
              You saved <strong>${(currentMonthSavings - lastMonthSavings).toFixed(2)}</strong> more this month compared to last month!
            </p>
          ) : currentMonthSavings < lastMonthSavings ? (
            <p>
              You saved <strong>${(lastMonthSavings - currentMonthSavings).toFixed(2)}</strong> less this month compared to last month.
            </p>
          ) : (
            <p>Your savings are the same as last month!</p>
          )
        ) : (
          <p>Loading savings data...</p>
        )}
      </div>
    </div>
  );
};

export default BalancePage;