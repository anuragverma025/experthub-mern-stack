require('dotenv').config();

const mongoose = require('mongoose');
const User = require('./models/User'); // Assuming this model exists
const Expert = require('./models/Expert'); // Assuming this model exists

// ⚠️ PASTE YOUR ACTUAL MONGODB URI HERE
// const MONGO_URI = "mongodb+srv://Anurag-Verma:Anshu025@cluster0.mkjyfsw.mongodb.net/expert_booking_db?appName=Cluster0&retryWrites=true&w=majority";

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to Database");

    // Clear existing data just in case
    await Expert.deleteMany({});
    await User.deleteMany({});

    // 1. Create a dummy User who acts as the Expert
    const dummyUser = await User.create({
      name: "Dr. Sarah Jenkins",
      email: "sarah@example.com",
      password: "password123", // In a real app, we'd hash this
      role: "expert"
    });

    const dummyUser2 = await User.create({
        name: "Mark Zuckerberg",
        email: "mark@example.com",
        password: "password123",
        role: "expert"
      });

    // 2. Create the Expert profiles and link them to the users
    await Expert.create([
      {
        userId: dummyUser._id,
        name: "Dr. Sarah Jenkins",
        email: "sarah@example.com",
        specialty: "Health",
        bio: "Senior medical consultant with 15 years of experience.",
        hourlyRate: 150,
        isApproved: true // <--- TRUE so they show up on the home page!
      },
      {
        userId: dummyUser2._id,
        name: "Mark Zuckerberg",
        email: "mark@example.com",
        specialty: "Tech",
        bio: "Software engineering leader and system architect.",
        hourlyRate: 200,
        isApproved: true
      }
    ]);

    console.log("🌱 Database seeded successfully! Dummy experts created.");
    process.exit();
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  }
};

seedDatabase();