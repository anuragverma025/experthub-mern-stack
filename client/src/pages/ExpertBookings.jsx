import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ExpertBookings = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      const token = localStorage.getItem('token');
      // This API call reaches the route we created in Phase 2
      const res = await axios.get('http://localhost:5000/api/bookings/expert-list', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAppointments(res.data);
    };
    fetchAppointments();
  }, []);

  return (
    <div className="p-10 bg-slate-50 min-h-screen">
      <h1 className="text-3xl font-bold text-slate-800 mb-8">Client Appointments</h1>
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-100 border-b border-slate-200 text-slate-600 uppercase text-xs">
            <tr>
              <th className="p-4">Customer Name</th>
              <th className="p-4">Date</th>
              <th className="p-4">Time Slot</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((app) => (
              <tr key={app._id} className="border-b last:border-0 hover:bg-slate-50 transition">
                <td className="p-4 font-semibold text-slate-700">{app.customerId?.name}</td>
                <td className="p-4 text-slate-600">{app.date}</td>
                <td className="p-4 text-slate-600">{app.timeSlot}</td>
                <td className="p-4">
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold uppercase">
                    {app.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {appointments.length === 0 && (
          <div className="p-20 text-center text-slate-400 italic">
            No bookings found yet.
          </div>
        )}
      </div>
    </div>
  );
};

export default ExpertBookings;