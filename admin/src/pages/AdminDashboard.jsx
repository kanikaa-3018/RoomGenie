import React from "react";
import Sidebar from "../components/Sidebar";
import { FiUsers, FiHome, FiAlertCircle } from "react-icons/fi";

// Sample client-side data
const rooms = [
  { id: 1, roomNumber: "A-101", user: "Saanvi Patel" },
  { id: 2, roomNumber: "B-202", user: "Rahul Mehta" },
  { id: 3, roomNumber: "C-303", user: "Diya Sharma" },
];

const matches = [
  { id: 1, user1: "Ananya", user2: "Ishita" },
  { id: 2, user1: "Kabir", user2: "Aarav" },
];

const complaints = [
  { id: 1, user: "Priya", issue: "AC not working in room B-202." },
  { id: 2, user: "Aditya", issue: "WiFi is down on 3rd floor." },
];

// Card component
const StatCard = ({ title, value, icon }) => {
  return (
    <div className="flex-1 min-w-[200px] bg-white shadow-md rounded-lg p-6 flex items-center justify-between">
      <div>
        <h2 className="text-sm text-gray-500">{title}</h2>
        <p className="text-2xl font-bold text-indigo-700">{value}</p>
      </div>
      <div className="text-3xl text-indigo-500">{icon}</div>
    </div>
  );
};

// Complaint List
const ComplaintBox = () => {
  return (
    <div className="mt-6 bg-white shadow-md rounded-lg p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
        <FiAlertCircle className="text-red-500" />
        Complaint Updates
      </h2>
      {complaints.length === 0 ? (
        <p className="text-sm text-gray-600">No complaints yet.</p>
      ) : (
        <ul className="space-y-3">
          {complaints.map((complaint) => (
            <li
              key={complaint.id}
              className="text-sm text-gray-700 bg-gray-50 p-3 rounded-md"
            >
              <span className="font-medium">{complaint.user}</span>:{" "}
              {complaint.issue}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

// Admin Dashboard
const AdminDashboard = () => {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-6 bg-indigo-50 min-h-screen">
        <h1 className="text-2xl font-bold mb-4">Welcome, Admin</h1>
        <p className="text-gray-700 mb-6">Here’s your dashboard overview.</p>

        {/* Top Cards */}
        <div className="flex flex-wrap gap-4">
          <StatCard
            title="Rooms Allotted"
            value={rooms.length}
            icon={<FiHome />}
          />
          <StatCard
            title="User Matches"
            value={matches.length}
            icon={<FiUsers />}
          />
        </div>

        {/* Complaint Section */}
        <ComplaintBox />
      </main>
    </div>
  );
};

export default AdminDashboard;
