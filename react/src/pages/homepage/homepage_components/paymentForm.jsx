import React, { useState } from "react";
import "./paymentForm.css"; // Import CSS

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!sum || !description) {
      alert("Please fill in all required fields.");
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

    setPaymentsList([...paymentsList, { date: paymentData.date, sum, description, category }]);
    setPaymentData(updatedPaymentData);
    setSum("");
    setDescription("");
    setCategory("Food");

    // Send JSON data to Spring Boot backend
    try {
      const response = await fetch("http://localhost:8080/userData/payments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Include cookies (SESSION_STRING)
        body: JSON.stringify(updatedPaymentData),
      });

      if (!response.ok) {
        throw new Error("Failed to send payment data.");
      }

      console.log("Payment sent successfully!");
    } catch (error) {
      console.error("Error:", error);
    }
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

        <select name="category" value={category} onChange={(e) => setCategory(e.target.value)} required className="small-input">
          {categories.map((cat, index) => (
            <option key={index} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <button type="submit">Add Payment</button>
      </form>
    </div>
  );
};

export default PaymentForm;
