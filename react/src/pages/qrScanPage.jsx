// QrScaner.jsx
import React, { useState } from 'react';
import QrReader from 'react-qr-reader';
import './qrScanPage.css';

const QrScaner = () => {
  // Get today's date in YYYY-MM-DD format
  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0]; // Extract only the date part
  };

  // Toggle scanning view & store raw scan result
  const [scanning, setScanning] = useState(true);
  const [scanResult, setScanResult] = useState('');

  // Manual form fields (auto-filled from QR when available)
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(getTodayDate()); // Default to today's date
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Food');

  // Handle incoming QR scans
  const handleScan = (data) => {
    if (data) {
      setScanResult(data);
      setScanning(false);

      // Example format: 02854258*0278890*2025-03-20*11:56:10*3.30
      const parts = data.split('*');
      if (parts.length >= 5) {
        const scannedDate = parts[2]; // e.g. "2025-03-20"
        const scannedAmount = parts[4]; // e.g. "3.30"

        // Populate form fields
        setDate(scannedDate);
        setAmount(scannedAmount);
      } else {
        console.error('Unexpected QR code format.');
      }
    }
  };

  // Log errors (e.g. camera permission)
  const handleError = (err) => {
    console.error(err);
  };

  // Reset to scan again
  const handleScanAgain = () => {
    setScanResult('');
    setScanning(true);
  };

  // Submit data to backend
  const handleAddPayment = () => {
    const paymentData = {
      description,
      date,
      amount: Number(amount) * 100,
      category,
    };

    fetch(`${import.meta.env.VITE_API_URL}/userData/createpayment`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(paymentData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Payment created:', data);
      })
      .catch((error) => {
        console.error('Error creating payment:', error);
      });
  };

  return (
    <div className="container">
      <h1>QR Code Scanner</h1>

      {/* Scanner or result display */}
      {scanning ? (
        <div className="qr-reader">
          <QrReader
            delay={300}
            onError={handleError}
            onScan={handleScan}
            style={{ width: '100%' }}
          />
        </div>
      ) : (
        <div className="result">
          <button className="button" onClick={handleScanAgain}>
            Scan Again
          </button>
        </div>
      )}

      {/* Manual form: inputs on one row, button on next row */}
      <div className="payment-form">
        {/* Inputs row */}
        <div className="payment-inputs">
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <input
            type="date"
            placeholder="Date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />

          <input
            className="amount-field"
            type="number"
            step="0.01"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="Food">Food</option>
            <option value="Travel">Travel</option>
            <option value="Shopping">Shopping</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Button on a new line */}
        <div className="payment-button">
          <button className="button" onClick={handleAddPayment}>
            Add Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default QrScaner;
