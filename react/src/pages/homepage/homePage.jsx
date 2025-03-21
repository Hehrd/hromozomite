import React from "react";
import PaymentForm from "./homepage_components/paymentForm.jsx";
import IndexElements from "./homepage_components/indexElements.jsx"; // Import tab element
import "./homePage.css";

const HomePage = () => {
  return (
    <div className="homepage-parent-div">
      <IndexElements />
      <PaymentForm />
    </div>
  );
};

export default HomePage;
