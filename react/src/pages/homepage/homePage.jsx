import React from "react";
import IndexElements from "./homepage_components/indexElements.jsx"; // Import tab element
import "./homePage.css";

const HomePage = () => {
  return (
    <div className="homepage-parent-div">
      <IndexElements />
    </div>
  );
};

export default HomePage;
