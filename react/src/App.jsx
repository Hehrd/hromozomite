// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppProvider from './contexts/appProvider';
import StripeProvider from './contexts/stripeProvider';  // Import the StripeProvider
import Register from './pages/registerPage'; 
import Login from './pages/loginPage';
import HomePage from './pages/homepage/homePage.jsx';
import MainLayout from './components/mainLayout.jsx'; 
import TransactionPage from './pages/transactions.jsx';
import PaymentPage from './pages/paymentPage'; // Your payment page
import AboutUsPage from './pages/aboutUsPage';
import QrScaner from './pages/qrScanPage'; // Your QR code scanner page
import AnalyticsPage from './pages/analyticsPage.jsx';
function App() {
  return (
    <AppProvider>
      {/* Wrap the entire app with StripeProvider to provide access to stripe */}
      <StripeProvider>
        <Router>
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />

            <Route element={<MainLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/transactions" element={<TransactionPage />} />
              <Route path="/payment" element={<PaymentPage />} />
              <Route path="/aboutus" element={<AboutUsPage />} />
              <Route path="/qrscan" element={<QrScaner />} />
            </Route>
          </Routes>
        </Router>
      </StripeProvider>
    </AppProvider>
  );
}

export default App;
