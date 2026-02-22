import React, { useState } from 'react';
import BookingModal from './BookingModal';

const handleBook = async () => {
  try {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) return alert("Please login first");

        // Inside your handleBook function
    const bookingData = {
      userId: currentUser.id, // The person logged in (Client)
      expertId: expert._id,    // The ID of the Expert Profile document
      date: selectedDate,
      timeSlot: selectedTime
    };

    const res = await axios.post('http://localhost:5000/api/bookings/book', bookingData);
    alert("✅ Booking Successful!");
    window.location.href = '/dashboard'; // Redirect to see the result
  } catch (err) {
    alert("❌ Booking failed: " + err.response.data.msg);
  }
};

const ExpertCard = ({ expert }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
      <h3 className="text-xl font-bold text-gray-800">{expert.userId?.name}</h3>
      <p className="text-indigo-600 font-medium">{expert.specialty}</p>
      <div className="flex justify-between items-center mt-4">
        <span className="text-lg font-bold">${expert.hourlyRate}/hr</span>
        <button 
          onClick={() => setShowModal(true)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
        >
          Book Now
        </button>
      </div>
      {showModal && <BookingModal expert={expert} onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default ExpertCard;