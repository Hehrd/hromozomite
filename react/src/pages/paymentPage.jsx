import React, { useState, useContext } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

// Example categories
const categories = [
  "Food", "Entertainment", "Transport", "Health",
  "Shopping", "Utilities", "Education", "Rent",
  "Travel", "Others"
];

function PaymentForm() {
  const stripe = useStripe();
  const elements = useElements();

  // Payment-related state
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [sum, setSum] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Food");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!stripe || !elements) {
      setMessage("Stripe has not loaded yet. Please wait.");
      return;
    }
    if (!sum || !description) {
      setMessage("Please provide an amount and description.");
      return;
    }

    try {
      // 1) Create a PaymentIntent on the backend
      const amountInCents = parseInt(sum, 10) * 100; // e.g. $10 => 1000
      const response = await fetch("http://localhost:6969/stripe/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // if your backend requires cookies, else remove
        body: JSON.stringify({
          amount: amountInCents,
          currency: "usd"
        }),
      });

      const { clientSecret, error } = await response.json();
      if (error) {
        setMessage(`Server error: ${error}`);
        return;
      }

      // 2) Confirm the card payment with the returned clientSecret
      const cardElement = elements.getElement(CardElement);
      const { paymentIntent, error: stripeError } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            // You can add more info like name, email, address, etc.
            name: "Test User",
          },
        },
      });

      if (stripeError) {
        setMessage(`Payment failed: ${stripeError.message}`);
      } else if (paymentIntent && paymentIntent.status === "succeeded") {
        setMessage("Payment succeeded! Thank you for your purchase.");
        
        // (Optional) Send your purchase data to your server for record-keeping
        // For example:
        // await fetch("http://localhost:6969/myapp/save-payment-data", {
        //    method: "POST",
        //    headers: { "Content-Type": "application/json" },
        //    body: JSON.stringify({ date, sum, description, category }),
        // });
        
        // Reset form
        setSum("");
        setDescription("");
        setCategory("Food");
      }
    } catch (err) {
      setMessage(`Unexpected error: ${err.message}`);
    }
  };

  return (
    <div className="payment-container">
      <h2>Payment with Stripe PaymentIntents</h2>
      <form onSubmit={handleSubmit}>
        {/* Description field */}
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          required
        />

        {/* Date field */}
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />

        {/* Amount field */}
        <input
          type="number"
          value={sum}
          onChange={(e) => setSum(e.target.value)}
          placeholder="Amount (USD)"
          required
        />

        {/* Category dropdown */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        {/* Stripe Card Element */}
        <div style={{ margin: "20px 0" }}>
          <CardElement />
        </div>

        <button type="submit" disabled={!stripe}>
          Submit Payment
        </button>
      </form>

      {message && <div style={{ marginTop: "20px" }}>{message}</div>}
    </div>
  );
}

export default PaymentForm;
