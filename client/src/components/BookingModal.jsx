import React, { useState } from 'react';
import axios from 'axios';

const BookingModal = ({ expert, onClose }) => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const handleBooking = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) return alert("Please login to book!");

    try {
      await axios.post('http://localhost:5000/api/bookings/book', {
        customerId: user.id,
        expertId: expert._id,
        date,
        timeSlot: time
      });
      alert("Booking Confirmed!");
      onClose();
    } catch (err) {
      alert("Booking failed. Try again.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">Book {expert.userId?.name}</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Select Date</label>
            <input type="date" className="w-full p-2 border rounded mt-1" onChange={(e)=>setDate(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Select Time</label>
            <select className="w-full p-2 border rounded mt-1" onChange={(e)=>setTime(e.target.value)}>
              <option value="">Choose a slot</option>
              <option value="10:00 AM">10:00 AM</option>
              <option value="02:00 PM">02:00 PM</option>
              <option value="04:00 PM">04:00 PM</option>
            </select>
          </div>
        </div>
        <div className="flex gap-3 mt-6">
          <button onClick={handleBooking} className="flex-1 bg-indigo-600 text-white py-2 rounded-lg font-bold hover:bg-indigo-700">Confirm Booking</button>
          <button onClick={onClose} className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-lg font-bold hover:bg-gray-300">Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;