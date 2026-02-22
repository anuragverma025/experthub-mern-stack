import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ExpertDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExpertBookings = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        const userId = user.id || user._id;

        // Note: You'll need a backend route for this (Step 2 below)
        const res = await axios.get(`http://localhost:5000/api/bookings/expert/${userId}`);
        setBookings(res.data);
      } catch (err) {
        console.error("Error fetching expert bookings:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchExpertBookings();
  }, []);

  const handleStatusUpdate = async (bookingId, newStatus) => {
    try {
      await axios.patch(`http://localhost:5000/api/bookings/${bookingId}/status`, {
        status: newStatus
      });
      // Update local state so UI changes immediately
      setBookings(bookings.map(b => b._id === bookingId ? { ...b, status: newStatus } : b));
    } catch (err) {
      alert("Failed to update status");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <h1 className="text-3xl font-bold mb-6">Expert Management Portal</h1>
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-indigo-600 text-white">
            <tr>
              <th className="p-4">Client Name</th>
              <th className="p-4">Date</th>
              <th className="p-4">Status</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map(booking => (
              <tr key={booking._id} className="border-b">
                <td className="p-4 font-medium">{booking.user?.name || "Client"}</td>
                <td className="p-4">{new Date(booking.appointmentDate).toLocaleDateString()}</td>
                <td className="p-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                    booking.status === 'confirmed' ? 'bg-green-100 text-green-700' : 
                    booking.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {booking.status}
                  </span>
                </td>
                <td className="p-4 flex gap-2">
                  {booking.status === 'pending' && (
                    <>
                      <button onClick={() => handleStatusUpdate(booking._id, 'confirmed')} className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition">Approve</button>
                      <button onClick={() => handleStatusUpdate(booking._id, 'cancelled')} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition">Reject</button>
                    </>
                  )}
                  {booking.status === 'confirmed' && (
                    <button onClick={() => handleStatusUpdate(booking._id, 'completed')} className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition">Mark Completed</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ExpertDashboard;