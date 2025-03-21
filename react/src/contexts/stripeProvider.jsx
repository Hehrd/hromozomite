// contexts/StripeProvider.js
import { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { StripeContext } from './StripeContext';

// Add your Stripe publishable key here
const STRIPE_PUBLISHABLE_KEY = ''; // Replace with your actual Stripe publishable key

const StripeProvider = ({ children }) => {
  const [stripe, setStripe] = useState(null);
  const [elements, setElements] = useState(null);

  useEffect(() => {
    const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY); // Initialize Stripe with your public key
    stripePromise.then((stripeObj) => {
      setStripe(stripeObj); // Set stripe instance
      setElements(stripeObj.elements()); // Set elements instance
    });
  }, []); // Only run once on mount

  return (
    <StripeContext.Provider value={{ stripe, elements }}>
      {stripe && elements ? (
        <Elements stripe={stripe}>{children}</Elements>
      ) : (
        <div>Loading Stripe...</div>
      )}
    </StripeContext.Provider>
  );
};

export default StripeProvider;
