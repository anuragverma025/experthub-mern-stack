import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  
  // 1. Check if a user is saved in the browser's memory
  const user = JSON.parse(localStorage.getItem('user'));

  // 2. Create a Logout function
  const handleLogout = () => {
    localStorage.removeItem('user'); // Delete the memory
    window.location.href = '/login'; // Kick them back to the login screen
  };

  return (
    <nav className="bg-white shadow-sm border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        
        {/* Logo */}
        <Link to="/" className="text-2xl font-extrabold text-indigo-700 tracking-tight">
          Expert<span className="text-slate-800">Hub</span>
        </Link>

        {/* Smart Navigation Links */}
        <div className="flex items-center space-x-6">
          
          {user ? (
            /* IF LOGGED IN: Show this */
            <>
              <span className="text-slate-500 font-medium">Hello, <span className="font-bold text-slate-800">{user.name}</span></span>
              <Link to="/dashboard" className="text-slate-600 font-semibold hover:text-indigo-600 transition">
                Dashboard
              </Link>
              <button onClick={handleLogout} className="bg-red-500 text-white px-5 py-2 rounded-xl font-semibold shadow-md hover:bg-red-600 transition hover:-translate-y-0.5">
                Logout
              </button>
            </>
          ) : (
            /* IF NOT LOGGED IN: Show this */
            <>
              <Link to="/login" className="text-slate-600 font-semibold hover:text-indigo-600 transition">
                Login
              </Link>
              <Link to="/register" className="bg-indigo-600 text-white px-5 py-2 rounded-xl font-semibold shadow-md hover:bg-indigo-500 transition hover:-translate-y-0.5">
                Register
              </Link>
            </>
          )}

        </div>
      </div>
    </nav>
  );
};

export default Navbar;