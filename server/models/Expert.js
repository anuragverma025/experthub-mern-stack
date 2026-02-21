const mongoose = require('mongoose');

const ExpertSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true },
  specialty: { type: String, required: true }, // e.g., "Lawyer", "Tech"
  bio: String,
  hourlyRate: Number,
  rating: { type: Number, default: 4.5 },
  isApproved: { type: Boolean, default: false }, // For Admin Module
  availability: [{
    day: String, // e.g., "Monday"
    slots: [String] // e.g., ["10:00 AM", "2:00 PM"]
  }]
});

module.exports = mongoose.model('Expert', ExpertSchema);