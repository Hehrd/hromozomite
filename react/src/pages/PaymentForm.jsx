import React, { useState } from "react";

const PaymentForm = () => {
  const [paymentData, setPaymentData] = useState({
    date: new Date().toISOString().split("T")[0], // Defaults to today
    sum: "",
    description: "",
    category: "Others", // Default category
  });

  const [payments, setPayments] = useState([]);

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

  const handleChange = (e) => {
    setPaymentData({ ...paymentData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!paymentData.sum || !paymentData.description) {
      alert("Please fill in all required fields.");
      return;
    }

    const newPayment = {
      date: paymentData.date,
      sum: parseFloat(paymentData.sum),
      description: paymentData.description,
      category: paymentData.category,
    };

    setPayments([...payments, newPayment]);
    setPaymentData({
      date: new Date().toISOString().split("T")[0], // Reset to today
      sum: "",
      description: "",
      category: "Others", // Reset to default category
    });
  };

  return (
    <div style={{ padding: "20px", maxWidth: "500px", margin: "auto" }}>
      <h2>Enter Payment</h2>
      <form onSubmit={handleSubmit}>
        <label>Date:</label>
        <input
          type="date"
          name="date"
          value={paymentData.date}
          onChange={handleChange}
          required
          style={{ padding: "10px", width: "100%", marginBottom: "10px" }}
        />

        <label>Sum ($):</label>
        <input
          type="number"
          name="sum"
          value={paymentData.sum}
          onChange={handleChange}
          placeholder="Enter sum"
          required
          style={{ padding: "10px", width: "100%", marginBottom: "10px" }}
        />

        <label>Description:</label>
        <input
          type="text"
          name="description"
          value={paymentData.description}
          onChange={handleChange}
          placeholder="Enter description"
          required
          style={{ padding: "10px", width: "100%", marginBottom: "10px" }}
        />

        <label>Category:</label>
        <select
          name="category"
          value={paymentData.category}
          onChange={handleChange}
          required
          style={{ padding: "10px", width: "100%", marginBottom: "10px" }}
        >
          {categories.map((cat, index) => (
            <option key={index} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <button type="submit" style={{ padding: "10px", width: "100%" }}>
          Submit
        </button>
      </form>

      {payments.length > 0 && (
        <div>
          <h3>Payment History</h3>
          <ul>
            {payments.map((payment, index) => (
              <li key={index}>
                <strong>Date:</strong> {payment.date} | <strong>Sum:</strong> $
                {payment.sum.toFixed(2)} | <strong>Description:</strong>{" "}
                {payment.description} | <strong>Category:</strong>{" "}
                {payment.category}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PaymentForm;
