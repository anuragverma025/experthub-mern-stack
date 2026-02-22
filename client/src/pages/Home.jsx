import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Home = () => {
  const [experts, setExperts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('All');

  // 1. Fetch Experts
  useEffect(() => {
    const fetchExperts = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/admin/approved-experts');
        setExperts(res.data);
      } catch (err) {
        console.error("Error fetching experts:", err);
      }
    };
    fetchExperts();
  }, []);

  // ⭐ NEW: Booking Logic Function
  const handleBooking = async (expertId) => {
    // Check if user is logged in by looking at localStorage
    const user = JSON.parse(localStorage.getItem('user'));

    if (!user) {
      alert("Please log in first to book an expert!");
      return;
    }

    try {
      const bookingData = {
        expertId: expertId,
        userId: user.id || user._id, // Support both ID formats
        date: new Date(), // For now, we just book for 'today'
      };

      const res = await axios.post('http://localhost:5000/api/bookings', bookingData);
      
      if (res.status === 201 || res.status === 200) {
        alert(`✅ Success! You have booked the expert.`);
      }
    } catch (err) {
      console.error("Booking failed:", err);
      alert(err.response?.data?.msg || "Failed to create booking. Make sure your backend booking route is running!");
    }
  };

  // 2. Filter logic
  const filteredExperts = experts.filter(exp => {
    const expertName = exp.name || (exp.userId && exp.userId.name) || "Unknown";
    const matchesSearch = expertName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = category === 'All' || exp.specialty === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-indigo-700 py-20 px-6 text-center text-white shadow-md">
        <h1 className="text-5xl font-extrabold mb-4">Find Your Expert</h1>
        <div className="flex flex-col md:flex-row justify-center items-center gap-4 mt-8">
          <input 
            type="text" 
            placeholder="Search by name..." 
            className="w-full md:w-96 p-3 rounded-lg text-black outline-none shadow-sm focus:ring-4 focus:ring-indigo-300"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select 
            className="p-3 rounded-lg text-black outline-none shadow-sm cursor-pointer"
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="All">All Specialties</option>
            <option value="Health">Health</option>
            <option value="Tech">Tech</option>
            <option value="Legal">Legal</option>
          </select>
        </div>
      </div>

      <div className="max-w-6xl mx-auto py-12 px-6">
        {experts.length === 0 ? (
          <div className="text-center py-20 text-gray-500 text-xl font-semibold animate-pulse">
            Searching for experts in the database...
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {filteredExperts.map(expert => {
              const expertName = expert.name || (expert.userId && expert.userId.name) || "Expert";
              return (
                <div key={expert._id} className="bg-white p-6 rounded-2xl shadow-md border border-slate-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <div className="w-16 h-16 bg-indigo-100 rounded-full mb-4 flex items-center justify-center shadow-inner">
                    <span className="text-indigo-600 font-bold text-2xl">{expertName.charAt(0)}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800">{expertName}</h3>
                  <p className="text-indigo-600 font-medium uppercase tracking-wider text-sm mt-1">{expert.specialty}</p>
                  <p className="text-slate-500 mt-3 line-clamp-3 leading-relaxed">{expert.bio}</p>
                  <div className="mt-6 flex justify-between items-center border-t border-slate-100 pt-4">
                    <p className="text-slate-800 font-bold text-xl">${expert.hourlyRate}<span className="text-sm text-slate-400 font-normal"> / hour</span></p>
                    
                    {/* ⭐ UPDATED BUTTON: Added onClick handler */}
                    <button 
                      onClick={() => handleBooking(expert._id)}
                      className="bg-indigo-600 text-white px-5 py-2 rounded-xl font-semibold hover:bg-indigo-500 transition shadow-md active:scale-95"
                    >
                      Book
                    </button>

                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;