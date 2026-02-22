import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', formData);
      
      const loggedInUser = res.data.user;
      
      // Save full user object (including role) to storage
      localStorage.setItem('user', JSON.stringify(loggedInUser)); 
      
      // Redirect based on role
      if (loggedInUser.role === 'expert') {
        window.location.href = '/expert-dashboard';
      } else {
        window.location.href = '/dashboard';
      }
      
    } catch (err) {
      setError(err.response?.data?.msg || "Login failed. Check your email/password.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-slate-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-xl w-96 border border-slate-200">
        <h2 className="text-3xl font-bold mb-6 text-center text-indigo-700">ExpertHub Login</h2>
        
        {error && <div className="bg-red-100 text-red-600 p-3 rounded-lg mb-4 text-sm font-medium">{error}</div>}

        <div className="mb-4">
          <label className="block text-slate-700 text-sm font-bold mb-2">Email</label>
          <input 
            type="email" 
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            required 
          />
        </div>
        <div className="mb-6">
          <label className="block text-slate-700 text-sm font-bold mb-2">Password</label>
          <input 
            type="password" 
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            required 
          />
        </div>
        <button type="submit" className="w-full bg-indigo-600 text-white p-3 rounded-lg font-bold hover:bg-indigo-700 transition shadow-lg">
          Sign In
        </button>
      </form>
    </div>
  );
};

export default Login;