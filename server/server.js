require('dotenv').config(); 
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Import Routes (Make sure these paths match your folder structure!)
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const bookingRoutes = require('./routes/bookingRoutes');

const app = express();

// Add this to the bottom of server.js temporarily
const linkExpertAccount = async () => {
  try {
    const User = require('./models/User');
    const Expert = require('./models/Expert');

    // 1. Find the User account for Mark
    const markUser = await User.findOne({ email: 'mark@example.com' }); 
    
    if (markUser) {
      // 2. Update the Expert profile to include Mark's User ID
      const updatedExpert = await Expert.findOneAndUpdate(
        { name: 'Mark Zuckerberg' }, // Finds the profile by name
        { userId: markUser._id },    // Adds the missing link!
        { new: true }
      );

      if (updatedExpert) {
        console.log("✅ SUCCESS: Mark's User ID is now linked to his Expert Profile!");
      } else {
        console.log("⚠️ Could not find an Expert named 'Mark Zuckerberg' in the experts collection.");
      }
    } else {
      console.log("⚠️ Could not find a User with email 'mark@example.com'");
    }
  } catch (err) {
    console.error("❌ Error linking account:", err);
  }
};

// RUN THE FUNCTION
linkExpertAccount();

// 1. Variable Declaration
const MONGO_URI = process.env.MONGO_URI;

// 2. Debugging Log (Shows in your terminal)
console.log("-----------------------------------------");
console.log("Database Status:", MONGO_URI ? "✅ MONGO_URI Found" : "❌ MONGO_URI Missing");
console.log("-----------------------------------------");

// 3. Security/Validation Check
if (!MONGO_URI) {
  console.error("❌ ERROR: MONGO_URI is missing from .env! Stopping server...");
  process.exit(1); // Stops the server if no DB is found
}

// 4. Database Connection (Only ONE time)
mongoose.connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected Successfully"))
  .catch(err => console.error("❌ DB Connection Error:", err));

// 5. Middleware
app.use(cors());
app.use(express.json());

// 6. Routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/bookings', bookingRoutes);

// 7. Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));