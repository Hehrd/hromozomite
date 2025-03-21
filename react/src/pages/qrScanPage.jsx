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
      
      // Use the scanned data directly
      const price = data.split('*').pop();
      console.log(price);
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
