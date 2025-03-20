import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './pages/registerPage';
import Login from './pages/loginPage';
import HomePage from './pages/homePage';
import MainLayout from './components/mainLayout.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        
        <Route element={<MainLayout />} > 
          <Route path="/" element={<HomePage />} />

        </Route>

      </Routes>
    </Router>
  );
}

export default App;
