// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppProvider from './contexts/appProvider';
import StripeProvider from './contexts/stripeProvider';
import Register from './pages/registerPage';
import Login from './pages/loginPage';
import HomePage from './pages/homepage/homePage.jsx';
import MainLayout from './components/mainLayout.jsx';
import TransactionPage from './pages/transactions.jsx';
import PaymentPage from './pages/paymentPage';
import AboutUsPage from './pages/aboutUsPage';
import QrScaner from './pages/qrScanPage';
import AnalyticsPage from './pages/analyticsPage.jsx';
import Settings from './pages/settings.jsx';
import SubscriptionManager from './pages/subscriptionManager.jsx';
import ProtectedRoute from './contexts/protectedRoutes.jsx';
function App() {
  return (
    <AppProvider>
      <StripeProvider>
        <Router>
          <Routes>
            {/* Public routes */}
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />

            {/* Routes with a shared layout */}
            <Route element={<MainLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/transactions" element={<TransactionPage />} />
              <Route path="/payment" element={<PaymentPage />} />
              <Route path="/aboutus" element={<AboutUsPage />} />
              <Route path="/qrscan" element={<QrScaner />} />
              <Route path="/analytics" element={<AnalyticsPage />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/subscription-manager" element={<SubscriptionManager />} />
            </Route>
          </Routes>
        </Router>
      </StripeProvider>
    </AppProvider>
  );
}

export default App;
