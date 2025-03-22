import React, { useState } from "react";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import "./paymentPage.css";

function PaymentForm() {
  const stripe = useStripe();
  const elements = useElements();

  const [sum, setSum] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      setMessage("Stripe has not loaded yet. Please wait.");
      return;
    }

    // Ensure a valid amount is entered
    if (!sum) {
      setMessage("Please provide an amount.");
      return;
    }

    try {
      // 1) Create a PaymentIntent on your backend
      const amountInCents = parseInt(sum, 10) * 100;
      const intentResponse = await fetch(
        `${import.meta.env.VITE_API_URL}/stripe/create-payment-intent`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            amount: amountInCents,
            currency: "usd"
          })
        }
      );
      const { clientSecret, error } = await intentResponse.json();
      if (error) {
        setMessage(`Server error: ${error}`);
        return;
      }

      // 2) Generate a token from the card details
      const cardNumberElement = elements.getElement(CardNumberElement);
      const { token, error: tokenError } = await stripe.createToken(cardNumberElement);
      if (tokenError) {
        setMessage(`Token creation failed: ${tokenError.message}`);
        return;
      }

      // 3) Confirm the card payment
      const { paymentIntent, error: stripeError } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardNumberElement,
          billing_details: {
            name: "Test User"
          }
        }
      });

      if (stripeError) {
        setMessage(`Payment failed: ${stripeError.message}`);
      } else if (paymentIntent && paymentIntent.status === "succeeded") {
        // 4) (Optional) Send the payment data to your backend to save
        const payload = {
          amount: amountInCents,
          currency: "usd",
          tokenId: token.id
        };
        const saveResponse = await fetch(
          `${import.meta.env.VITE_API_URL}/stripe/create-payment-intent`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(payload)
          }
        );

        if (saveResponse.ok) {
          setMessage("Payment succeeded and data saved!");
          setSum("");
        } else {
          setMessage("Payment succeeded but saving data failed.");
        }
      }
    } catch (err) {
      setMessage(`Unexpected error: ${err.message}`);
    }
  };

  return (
    <div className="payment-container">
      <h2>Payment with Stripe</h2>
      <form autoComplete="off" onSubmit={handleSubmit}>
        <input
          type="number"
          value={sum}
          onChange={(e) => setSum(e.target.value)}
          placeholder="Amount (USD)"
          required
        />

        {/* Split fields for Card Number, Expiry, CVC */}
        <div className="split-card-element">
          <div className="form-group">
            <label>Card Number</label>
            <CardNumberElement className="stripe-input" />
          </div>
          <div className="form-group">
            <label>Expiry</label>
            <CardExpiryElement className="stripe-input" />
          </div>
          <div className="form-group">
            <label>CVC</label>
            <CardCvcElement className="stripe-input" />
          </div>
        </div>

        <button type="submit" disabled={!stripe}>
          Submit Payment
        </button>
      </form>

      {message && <div className="payment-message">{message}</div>}
    </div>
  );
}

export default PaymentForm;
