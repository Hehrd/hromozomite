import React from "react";
import PaymentForm from "./PaymentForm";
import IndexElements from "./indexElements"; // Import tab element

const HomePage = () => {
  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <IndexElements />
      <PaymentForm />
    </div>
  );
};

export default HomePage;
