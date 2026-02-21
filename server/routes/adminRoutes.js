const express = require('express');
const router = express.Router();
const Expert = require('../models/Expert');

// The crash-proof route
router.get('/approved-experts', async (req, res) => {
  try {
    // We removed the .populate() command that was likely causing the 500 error
    const experts = await Expert.find({ isApproved: true });
    res.json(experts);
  } catch (err) {
    console.error("🔥 BACKEND CRASH DETAILS:", err); // This prints the exact error in your terminal!
    res.status(500).json({ msg: "Server Error" });
  }
});

// Admin approves an expert (From our earlier steps)
router.put('/approve-expert/:id', async (req, res) => {
    try {
        await Expert.findByIdAndUpdate(req.params.id, { isApproved: true });
        res.json({ msg: "Expert approved successfully!" });
    } catch (err) {
        res.status(500).json({ msg: "Approval failed" });
    }
});

module.exports = router;