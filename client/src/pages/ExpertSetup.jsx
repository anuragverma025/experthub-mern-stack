import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ExpertSetup = () => {
  const [formData, setFormData] = useState({
    specialty: '',
    bio: '',
    hourlyRate: ''
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      await axios.post('http://localhost:5000/api/admin/setup-profile', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("Profile updated! Waiting for Admin approval.");
      navigate('/expert-dashboard');
    } catch (err) {
      alert("Error updating profile");
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-8 bg-white rounded-2xl shadow-lg border">
      <h2 className="text-2xl font-bold mb-6 text-slate-800">Complete Your Expert Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Specialty</label>
          <input 
            type="text" 
            placeholder="e.g. Legal Consultant, Tech Mentor"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            onChange={(e) => setFormData({...formData, specialty: e.target.value})}
            required 
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Hourly Rate ($)</label>
          <input 
            type="number" 
            placeholder="50"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            onChange={(e) => setFormData({...formData, hourlyRate: e.target.value})}
            required 
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Brief Bio</label>
          <textarea 
            rows="4"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            onChange={(e) => setFormData({...formData, bio: e.target.value})}
            required 
          />
        </div>
        <button type="submit" className="w-full bg-indigo-600 text-white p-3 rounded-lg font-bold hover:bg-indigo-700 transition">
          Save Profile
        </button>
      </form>
    </div>
  );
};

export default ExpertSetup;