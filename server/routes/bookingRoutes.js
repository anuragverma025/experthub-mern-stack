const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const Expert = require('../models/Expert');

// 1. GET USER BOOKINGS (For the Client/User Dashboard)
// This fixes the 404 error you saw in the console!
router.get('/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const bookings = await Booking.find({ user: userId })
      .populate('expert') // Get expert details (name, specialty)
      .sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) {
    console.error("User bookings error:", err);
    res.status(500).json({ msg: "Server error fetching user bookings" });
  }
});

router.get('/expert/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    console.log("1. Incoming request for Expert User ID:", userId);
    
    // Step 1: Find the Expert Profile
    const expertProfile = await Expert.findOne({ userId: userId });
    
    if (!expertProfile) {
      console.log("2. ❌ ERROR: No Expert Profile linked to this User ID. Did you link them in MongoDB?");
      return res.json([]); 
    }

    console.log("3. ✅ Found Expert Profile ID:", expertProfile._id);

    // Step 2: Find Bookings
    const bookings = await Booking.find({ expert: expertProfile._id })
      .populate('user', 'name email')
      .sort({ createdAt: -1 });

    console.log(`4. 📊 Found ${bookings.length} bookings for this expert.`);
    
    res.json(bookings);
  } catch (err) {
    console.error("🔥 Server Error:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

// 3. CREATE A BOOKING
// Changed path to '/book' to match your frontend call
router.post('/book', async (req, res) => {
  try {
    const { userId, expertId, date, timeSlot } = req.body;

    if (!userId || !expertId) {
       return res.status(400).json({ msg: "Missing User ID or Expert ID" });
    }

    const newBooking = new Booking({
      user: userId,       
      expert: expertId,   
      appointmentDate: date,
      timeSlot: timeSlot,
      status: 'pending'   
    });

    await newBooking.save();
    res.status(201).json({ msg: "Booking request sent!", booking: newBooking });

  } catch (err) {
    console.error("Booking Error:", err.message);
    res.status(500).json({ msg: "Server error during booking" });
  }
});

// 4. UPDATE STATUS (Approve/Reject)
router.patch('/:bookingId/status', async (req, res) => {
  try {
    const { status } = req.body; 
    const { bookingId } = req.params;

    const updatedBooking = await Booking.findByIdAndUpdate(
      bookingId,
      { status: status },
      { new: true } 
    );

    res.json({ msg: `Booking status updated to ${status}`, updatedBooking });
  } catch (err) {
    res.status(500).json({ msg: "Server error updating status" });
  }
});

module.exports = router;