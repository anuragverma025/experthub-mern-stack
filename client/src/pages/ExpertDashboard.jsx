import React from 'react';

const ExpertDashboard = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <div className="p-10 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">Expert Control Panel</h1>
        <p className="text-slate-500 mb-8">Welcome back, {user?.name || 'Expert'}</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <h3 className="font-bold text-lg text-indigo-600">Pending Requests</h3>
            <p className="text-3xl font-bold mt-2">0</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <h3 className="font-bold text-lg text-emerald-600">Total Earnings</h3>
            <p className="text-3xl font-bold mt-2">$0.00</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpertDashboard;