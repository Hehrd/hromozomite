import React from "react";
import "./indexElements.css"; // Import CSS

const IndexElements = () => {
  return (
    <div className="tabs-container">
      <div className="tab-box">Money Spent</div>
      <div className="tab-box">Friends Leaderboard</div>
      <div className="tab-box">Money Saved This Month</div>
    </div>
  );
};

export default IndexElements;
