const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');

// Route for customer to book an expert
router.post('/book', async (req, res) => {
  try {
    const { customerId, expertId, date, timeSlot } = req.body;

    // Check if slot is already taken (Professional touch)
    const existingBooking = await Booking.findOne({ expertId, date, timeSlot });
    if (existingBooking) {
      return res.status(400).json({ msg: "This time slot is already booked!" });
    }

    const newBooking = new Booking({
      customerId,
      expertId,
      date,
      timeSlot,
      status: 'confirmed'
    });

    await newBooking.save();
    res.status(201).json({ msg: "Booking successful!", booking: newBooking });
  } catch (err) {
    res.status(500).json({ msg: "Server error during booking" });
  }
});

module.exports = router;