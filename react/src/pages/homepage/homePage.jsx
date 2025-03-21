import React from "react";
import PaymentForm from "./homepage_components/paymentForm.jsx";
import IndexElements from "./homepage_components/indexElements.jsx"; // Import tab element


const HomePage = () => {
  return (
    <div>
      <h1>Spestisimo</h1>
      <IndexElements />
      <PaymentForm />
    </div>
  );
};

export default HomePage;
