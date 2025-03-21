import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const categories = [
  "Food", "Entertainment", "Transport", "Health",
  "Shopping", "Utilities", "Education", "Rent",
  "Travel", "Others"
];

function PaymentForm() {
  const stripe = useStripe();
  const elements = useElements();

  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [sum, setSum] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Food");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      setMessage("Stripe has not loaded yet. Please wait.");
      return;
    }
    if (!sum || !description) {
      setMessage("Please provide an amount and description.");
      return;
    }

    try {
      // Step 1: Create a PaymentIntent on your backend
      const amountInCents = parseInt(sum, 10) * 100;
      const intentResponse = await fetch("http://localhost:6969/stripe/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          amount: amountInCents,
          currency: "usd"
        }),
      });
      const { clientSecret, error } = await intentResponse.json();
      if (error) {
        setMessage(`Server error: ${error}`);
        return;
      }

      // Step 2: Generate a token from the card details
      const cardElement = elements.getElement(CardElement);
      const { token, error: tokenError } = await stripe.createToken(cardElement);
      if (tokenError) {
        setMessage(`Token creation failed: ${tokenError.message}`);
        return;
      }
      
      // Step 3: Confirm the card payment
      const { paymentIntent, error: stripeError } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: "Test User",
          },
        },
      });

      if (stripeError) {
        setMessage(`Payment failed: ${stripeError.message}`);
      } else if (paymentIntent && paymentIntent.status === "succeeded") {
        // Step 4: Prepare the payload according to SinglePaymentDTO
        const payload = {
          amount: amountInCents,      // long, in cents
          currency: "usd",            // string currency code
          date: date,                 // date in YYYY-MM-DD format
          tokenId: token.id           // the token generated above
        };

        // Send the payment data to your backend
        const saveResponse = await fetch("http://localhost:6969/stripe/create-payment-intent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (saveResponse.ok) {
          setMessage("Payment succeeded and data saved! Thank you for your purchase.");
          // Reset form fields if needed
          setSum("");
          setDescription("");
          setCategory("Food");
        } else {
          setMessage("Payment succeeded but failed to save payment data.");
        }
      }
    } catch (err) {
      setMessage(`Unexpected error: ${err.message}`);
    }
  };

  return (
    <div className="payment-container">
      <h2>Payment with Stripe PaymentIntents</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          required
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <input
          type="number"
          value={sum}
          onChange={(e) => setSum(e.target.value)}
          placeholder="Amount (USD)"
          required
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
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
