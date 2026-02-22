import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchMyBookings = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const userId = user.id || user._id;

      // 🔍 DEBUG: Check this in your browser console
      console.log("Fetching bookings for Client ID:", userId);

      const res = await axios.get(`http://localhost:5000/api/bookings/user/${userId}`);
      console.log("Bookings found:", res.data);
      setBookings(res.data);
    } catch (err) {
      console.error("Error fetching my bookings:", err);
    } finally {
      setLoading(false);
    }
  };
  fetchMyBookings();
}, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">User Dashboard</h1>
        <p className="text-gray-600 mb-8">Manage your appointments and booking status.</p>

        {loading ? (
          <div className="text-center py-10">Loading your bookings...</div>
        ) : bookings.length === 0 ? (
          <div className="bg-white p-10 rounded-xl shadow-sm text-center border border-dashed border-gray-300">
            <p className="text-gray-500">You haven't made any bookings yet.</p>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
            <table className="w-full text-left">
              <thead className="bg-gray-100 border-b">
                <tr>
                  <th className="px-6 py-4 font-semibold text-gray-700">Expert</th>
                  <th className="px-6 py-4 font-semibold text-gray-700">Specialty</th>
                  <th className="px-6 py-4 font-semibold text-gray-700">Date</th>
                  <th className="px-6 py-4 font-semibold text-gray-700">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {bookings.map((booking) => (
                  <tr key={booking._id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {booking.expert?.name || "Deleted Expert"}
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {booking.expert?.specialty || "N/A"}
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {new Date(booking.appointmentDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                        booking.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                        booking.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                        booking.status === 'completed' ? 'bg-blue-100 text-blue-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {booking.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;