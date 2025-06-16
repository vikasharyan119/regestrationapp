// src/App.jsx
import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginSignupPage from './pages/LoginSignupPage';
import Header from './components/Header';

function App() {
  return (
    <Router>
      <Header />
      <div className="mt-4">
        <Routes>
          <Route path="/" element={<LoginSignupPage />} />
          <Route path="/home" element={<HomePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
