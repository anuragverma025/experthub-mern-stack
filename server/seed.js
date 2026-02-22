require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User'); 
const Expert = require('./models/Expert'); 

// 1. Grab the URI from your .env file
const MONGO_URI = process.env.MONGO_URI;

const seedDatabase = async () => {
  try {
    // 2. Safety check: stop if the secret link is missing
    if (!MONGO_URI) {
      console.error("❌ Error: MONGO_URI is missing from .env!");
      process.exit(1);
    }

    await mongoose.connect(MONGO_URI);
    console.log("✅ Connected to Database for seeding...");

    // Clear existing data
    await Expert.deleteMany({});
    await User.deleteMany({});

    // 3. Create dummy Users
    const dummyUser = await User.create({
      name: "Dr. Sarah Jenkins",
      email: "sarah@example.com",
      password: "password123", 
      role: "expert"
    });

    const dummyUser2 = await User.create({
      name: "Mark Zuckerberg",
      email: "mark@example.com",
      password: "password123",
      role: "expert"
    });

    // 4. Create the Expert profiles
    await Expert.create([
      {
        userId: dummyUser._id,
        name: "Dr. Sarah Jenkins",
        email: "sarah@example.com",
        specialty: "Health",
        bio: "Senior medical consultant with 15 years of experience.",
        hourlyRate: 150,
        isApproved: true 
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
    process.exit(0); // Exit cleanly
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1); // Exit with error
  }
};

seedDatabase();