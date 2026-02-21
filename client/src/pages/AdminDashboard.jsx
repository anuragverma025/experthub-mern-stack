import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [pendingExperts, setPendingExperts] = useState([]);

  const fetchPending = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/admin/pending-experts');
      setPendingExperts(res.data);
    } catch (err) {
      console.error("Error fetching pending experts");
    }
  };

  useEffect(() => { fetchPending(); }, []);

  const approveExpert = async (id) => {
    await axios.put(`http://localhost:5000/api/admin/approve-expert/${id}`);
    alert("Expert Approved!");
    fetchPending(); // Refresh the list
  };

  return (
    <div className="p-10 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-slate-800 mb-8">Admin: Expert Approvals</h1>
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-100 text-slate-600">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Specialty</th>
              <th className="p-4">Hourly Rate</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {pendingExperts.map(exp => (
              <tr key={exp._id} className="border-t hover:bg-slate-50">
                <td className="p-4 font-medium">{exp.userId?.name}</td>
                <td className="p-4">{exp.specialty}</td>
                <td className="p-4">${exp.hourlyRate}/hr</td>
                <td className="p-4">
                  <button 
                    onClick={() => approveExpert(exp._id)}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
                  >
                    Approve
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {pendingExperts.length === 0 && (
          <p className="p-10 text-center text-gray-500 italic">No experts waiting for approval.</p>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;