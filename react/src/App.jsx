import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppProvider from './contexts/appProvider';
import Register from './pages/registerPage'; 
import Login from './pages/loginPage';
import HomePage from './pages/homePage';
import MainLayout from './components/mainLayout.jsx'; 
import TransactionPage from './pages/transactions.jsx';

function App() {
  return (
    <AppProvider> 
      <Router>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          
          <Route element={<MainLayout />}> 
            <Route path="/" element={<HomePage />} />
            <Route path="/transactions" element={<TransactionPage />} />
          </Route>

        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;
