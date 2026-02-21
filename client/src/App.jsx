import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/AdminDashboard';
import ExpertDashboard from './pages/ExpertDashboard';
import UserDashboard from './pages/UserDashboard';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/expert-dashboard" element={<ExpertDashboard />} />
            <Route path="/dashboard" element={<UserDashboard />} />
          </Routes>
        </main>
        <footer className="bg-white py-6 text-center text-gray-500 border-t">
          &copy; 2026 ExpertHub Assignment - Professional MERN Implementation
        </footer>
      </div>
    </Router>
  );
}

export default App;