const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  // We use 'user' and 'expert' to match our logic
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  expert: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Expert', 
    required: true 
  },
  appointmentDate: { 
    type: Date, 
    default: Date.now 
  },
  status: { 
    type: String, 
    enum: ['pending', 'confirmed', 'completed', 'cancelled'],
    default: 'pending' 
  }
}, { timestamps: true });

module.exports = mongoose.model('Booking', BookingSchema);


