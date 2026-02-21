const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Makes sure it can talk to your User database

// The Registration Route
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // 1. Check if a user with this email already exists
    let existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "A user with this email already exists!" });
    }

    // 2. Create the new user
    const newUser = new User({
      name,
      email,
      password, // Note: For a real app, we would encrypt this password first!
      role
    });

    // 3. Save to MongoDB
    await newUser.save();
    
    // 4. Send success message back to the frontend
    res.status(201).json({ msg: "User registered successfully!" });

  } catch (err) {
    console.error("🔥 REGISTRATION CRASH DETAILS:", err);
    res.status(500).json({ msg: "Server Error during registration" });
  }
});

// --- 2. THE NEW LOGIN ROUTE ---
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Check if the user exists in the database
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "Invalid email or password" });
    }

    // 2. Check if the password matches 
    // (Note: In a production app, we would use bcrypt to compare hashed passwords!)
    if (user.password !== password) {
      return res.status(400).json({ msg: "Invalid email or password" });
    }

    // 3. Success! Send the user data back to the frontend
    res.json({ 
        msg: "Login successful!", 
        user: { id: user._id, name: user.name, role: user.role, email: user.email } 
    });

  } catch (err) {
    console.error("🔥 LOGIN CRASH DETAILS:", err);
    res.status(500).json({ msg: "Server Error during login" });
  }
});

module.exports = router;