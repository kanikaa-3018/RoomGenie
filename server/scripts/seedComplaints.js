const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Complaint = require('../models/Complaint');
const User = require('../models/User');

dotenv.config();

const sampleComplaints = [
  {
    room: "A-101",
    issue: "AC not working in room A-101. It's been 3 days and it's getting very hot. The temperature is unbearable during the day.",
    category: "Maintenance",
    status: "pending"
  },
  {
    room: "B-202",
    issue: "WiFi is down on 3rd floor. Cannot connect to the internet for online classes. This is affecting my studies.",
    category: "Technical",
    status: "in-progress"
  },
  {
    room: "C-303",
    issue: "Roommate is consistently noisy during study hours despite multiple requests. Playing loud music till late night.",
    category: "Behavioral",
    status: "resolved"
  },
  {
    room: "D-404",
    issue: "Bathroom faucet is leaking continuously. Water is wasting and making noise throughout the night.",
    category: "Maintenance",
    status: "pending"
  },
  {
    room: "E-505",
    issue: "Room cleaning service has not been provided for over a week. Room is getting very dirty.",
    category: "Cleanliness",
    status: "in-progress"
  }
];

const seedComplaints = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Connected to MongoDB');

    // Get some users to assign complaints to
    const users = await User.find().limit(5);
    
    if (users.length === 0) {
      console.log('No users found. Please run the user seeder first.');
      process.exit(1);
    }

    // Clear existing complaints
    await Complaint.deleteMany({});
    console.log('Cleared existing complaints');

    // Create complaints with user assignments
    const complaints = sampleComplaints.map((complaint, index) => {
      const user = users[index % users.length];
      return {
        ...complaint,
        user: {
          userId: user._id,
          name: user.name,
          email: user.email
        }
      };
    });

    // Insert sample complaints
    await Complaint.insertMany(complaints);
    console.log(`Seeded ${complaints.length} sample complaints`);

    console.log('Sample complaints:');
    complaints.forEach((complaint, index) => {
      console.log(`${index + 1}. ${complaint.user.name} - ${complaint.room} - ${complaint.category} - ${complaint.status}`);
    });

  } catch (error) {
    console.error('Error seeding complaints:', error);
  } finally {
    await mongoose.connection.close();
    console.log('Database connection closed');
  }
};

// Run the seeder
if (require.main === module) {
  seedComplaints();
}

module.exports = seedComplaints;
