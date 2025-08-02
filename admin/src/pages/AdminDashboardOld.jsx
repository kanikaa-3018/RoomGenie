import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import MatchRequests from "../components/MatchRequests";
import { FiUsers, FiHome, FiAlertCircle, FiClock, FiCheck, FiX } from "react-icons/fi";

const API_BASE_URL = 'http://localhost:5000/api/admin';

// Card component
const StatCard = ({ title, value, icon, color = "indigo" }) => {
  const colorClasses = {
    indigo: "text-indigo-700 bg-indigo-50",
    green: "text-green-700 bg-green-50",
    yellow: "text-yellow-700 bg-yellow-50",
    red: "text-red-700 bg-red-50",
  };

  return (
    <div className="flex-1 min-w-[200px] bg-white shadow-md rounded-lg p-6 flex items-center justify-between">
      <div>
        <h2 className="text-sm text-gray-500">{title}</h2>
        <p className={`text-2xl font-bold ${colorClasses[color]}`}>{value}</p>
      </div>
      <div className={`text-3xl ${colorClasses[color]}`}>{icon}</div>
    </div>
  );
};

// Recent Matches Component
const RecentMatches = ({ matches }) => {
  const recentMatches = matches.slice(0, 5); // Show last 5 matches

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
        <FiUsers className="text-indigo-500" />
        Recent Match Requests
      </h2>
      {recentMatches.length === 0 ? (
        <p className="text-sm text-gray-600">No recent matches.</p>
      ) : (
        <div className="space-y-3">
          {recentMatches.map((match) => (
            <div
              key={match._id}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-md"
            >
              <div className="flex items-center space-x-3">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-medium text-sm border-2 border-white">
                    {match.user1.name.charAt(0)}
                  </div>
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-medium text-sm border-2 border-white">
                    {match.user2.name.charAt(0)}
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {match.user1.name} & {match.user2.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {match.compatibilityScore}% compatibility
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                  match.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                  match.status === 'approved' ? 'bg-green-100 text-green-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {match.status === 'pending' && <FiClock className="w-3 h-3 mr-1" />}
                  {match.status === 'approved' && <FiCheck className="w-3 h-3 mr-1" />}
                  {match.status === 'rejected' && <FiX className="w-3 h-3 mr-1" />}
                  {match.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
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
