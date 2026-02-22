import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  return (
    <nav className="bg-white shadow-sm border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-extrabold text-indigo-700 tracking-tight">
          Expert<span className="text-slate-800">Hub</span>
        </Link>

        <div className="flex items-center space-x-6">
          {user ? (
            <>
              <span className="text-slate-500 font-medium">
                Hello, <span className="font-bold text-slate-800">{user.name}</span>
              </span>
              
              {/* 1. Dashboard Link (Always show this for any logged-in user) */}
              <Link to="/dashboard" className="text-slate-600 font-semibold hover:text-indigo-600">
                My Bookings
              </Link>

              {/* 2. Expert Portal Link (Show ONLY if the user is an expert) */}
              {user.role === 'expert' && (
                <Link to="/expert-dashboard" className="text-indigo-600 font-bold hover:underline decoration-2 underline-offset-4">
                  Expert Portal
                </Link>
              )}

              <button onClick={handleLogout} className="bg-red-500 text-white px-5 py-2 rounded-xl font-semibold hover:bg-red-600 transition">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-slate-600 font-semibold hover:text-indigo-600">Login</Link>
              <Link to="/register" className="bg-indigo-600 text-white px-5 py-2 rounded-xl font-semibold shadow-md hover:bg-indigo-500 transition">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;