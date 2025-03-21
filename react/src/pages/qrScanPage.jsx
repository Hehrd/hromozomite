import React, { useState } from 'react';
import QrReader from 'react-qr-reader';
import './qrScanPage.css';

const QrScaner = () => {
  const [result, setResult] = useState('');
  const [scanning, setScanning] = useState(true);

  const handleScan = data => {
    if (data) {
      setResult(data);
      setScanning(false); // remove camera view on successful scan
      
      // Assume the scanned result is in the format:
      // 02854258*0278890*2025-03-20*11:56:10*3.30
      const parts = data.split('*');
      if (parts.length >= 5) {
        const date = parts[2];  // "2025-03-20"
        const amount = parts[4]; // "3.30"
        
        // Log extracted values to the console
        console.log("Date:", date);
        console.log("Price:", amount);

        // Send the extracted data to the backend
        fetch(`${import.meta.env.VITE_API_URL}/createpayment`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ date, amount })
        })
        .then(response => response.json())
        .then(data => {
          console.log("Payment created:", data);
        })
        .catch(error => {
          console.error("Error creating payment:", error);
        });
      } else {
        console.error("Unexpected QR code format.");
      }
    }
  };

  const handleError = err => {
    console.error(err);
  };

  const handleScanAgain = () => {
    setResult('');
    setScanning(true);
  };

  return (
    <div className="container">
      <h1>QR Code Scanner</h1>
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
          <p>Scanned Result: {result}</p>
          <button className="button" onClick={handleScanAgain}>
            Scan Again
          </button>
        </div>
      )}
    </div>
  );
};

export default QrScaner;
