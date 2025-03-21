// components/PaymentForm.js
import React, { useState, useContext } from "react";
import { StripeContext } from "../contexts/StripeContext"; // Import Stripe context
import { CardElement } from "@stripe/react-stripe-js"; // Stripe's card input element

const PaymentForm = () => {
  const [paymentData, setPaymentData] = useState({
    date: new Date().toISOString().split("T")[0], // Default to today
    payments: {}, // Payments stored as a dictionary (Map equivalent)
    currency: "USD",
  });

  const [sum, setSum] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Food");
  const [paymentsList, setPaymentsList] = useState([]);

  const { stripe, elements } = useContext(StripeContext); // Access stripe and elements from context

  const categories = [
    "Food",
    "Entertainment",
    "Transport",
    "Health",
    "Shopping",
    "Utilities",
    "Education",
    "Rent",
    "Travel",
    "Others",
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!sum || !description || !stripe || !elements) {
      alert("Please fill in all required fields and ensure Stripe is ready.");
      return;
    }

    // Get the card details from the CardElement
    const cardElement = elements.getElement(CardElement);

    // Create a token from the card element
    stripe.createToken(cardElement).then(({ token, error }) => {
      if (error) {
        alert(`Error: ${error.message}`);
        return;
      }

      const newPaymentKey = `${paymentData.date}_${description}_${category}`;
      const newPayments = {
        ...paymentData.payments,
        [newPaymentKey]: parseFloat(sum), // Map-like dictionary
      };

      const updatedPaymentData = {
        ...paymentData,
        payments: newPayments,
      };

      setPaymentsList([
        ...paymentsList,
        { date: paymentData.date, sum, description, category },
      ]);
      setPaymentData(updatedPaymentData);
      setSum("");
      setDescription("");
      setCategory("Food");

      // Send JSON data to the backend along with the Stripe token
      console.log("TOKEN ID: ", token.id);
      fetch("http://localhost:6969/stripe/chargeCard", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Include cookies (SESSION_STRING)
        body: JSON.stringify({
          ...updatedPaymentData,
          stripeToken: token.id, // Send the token to your backend
        }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to send payment data.");
          }
          return response.json(); // Parse JSON if the response is successful
        })
        .then((data) => {
          console.log("Payment sent successfully!", data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    });
  };

  return (
    <div className="payment-container">
      <form onSubmit={handleSubmit} className="payment-inputs">
        {/* Larger input for description */}
        <input
          type="text"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          required
          className="description-input"
        />

        {/* Smaller inputs for date, sum, and category */}
        <input
          type="date"
          name="date"
          value={paymentData.date}
          onChange={(e) => setPaymentData({ ...paymentData, date: e.target.value })}
          required
          className="small-input"
        />

        <input
          type="number"
          name="sum"
          value={sum}
          onChange={(e) => setSum(e.target.value)}
          placeholder="Amount"
          required
          className="small-input"
        />

        <select
          name="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
          className="small-input"
        >
          {categories.map((cat, index) => (
            <option key={index} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        {/* Stripe CardElement for card details */}
        <div className="stripe-card-element">
          <CardElement />
        </div>

        <button type="submit" disabled={!stripe}>Add Payment</button>
      </form>
    </div>
  );
};

export default PaymentForm;
