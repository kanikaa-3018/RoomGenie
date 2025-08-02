import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import MatchRequests from "../components/MatchRequests";
import Rooms from "../components/Rooms";
import Complaints from "../components/Complaints";
import { FiUsers, FiHome, FiAlertCircle, FiClock, FiCheck, FiX } from "react-icons/fi";

const API_BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/api/admin`;

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
  // Sample complaints data - you can replace this with API call later
  const complaints = [
    { id: 1, user: "Priya", issue: "AC not working in room B-202." },
    { id: 2, user: "Aditya", issue: "WiFi is down on 3rd floor." },
  ];

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
        <FiAlertCircle className="text-red-500" />
        Recent Complaints
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
  const [currentView, setCurrentView] = useState('dashboard');
  const [stats, setStats] = useState({ total: 0, pending: 0, approved: 0, rejected: 0 });
  const [matches, setMatches] = useState([]);

  // Fetch statistics
  const fetchStats = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/stats`);
      const data = await response.json();
      
      if (data.success) {
        setStats(data.stats);
      }
    } catch (err) {
      console.error('Error fetching stats:', err);
    }
  };

  // Fetch matches
  const fetchMatches = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/matches`);
      const data = await response.json();
      
      if (data.success) {
        setMatches(data.matches);
      }
    } catch (err) {
      console.error('Error fetching matches:', err);
    }
  };

  useEffect(() => {
    fetchStats();
    fetchMatches();
  }, []);

  const approvedMatches = matches.filter(match => match.status === 'approved' && match.roomAllocation);

  if (currentView === 'matches') {
    return (
      <div className="flex">
        <Sidebar currentView={currentView} setCurrentView={setCurrentView} />
        <main className="flex-1 p-6 bg-indigo-50 min-h-screen">
          <MatchRequests />
        </main>
      </div>
    );
  }

  if (currentView === 'rooms') {
    return (
      <div className="flex">
        <Sidebar currentView={currentView} setCurrentView={setCurrentView} />
        <main className="flex-1 p-6 bg-indigo-50 min-h-screen">
          <Rooms />
        </main>
      </div>
    );
  }

  if (currentView === 'complaints') {
    return (
      <div className="flex">
        <Sidebar currentView={currentView} setCurrentView={setCurrentView} />
        <main className="flex-1 p-6 bg-indigo-50 min-h-screen">
          <Complaints />
        </main>
      </div>
    );
  }

  return (
    <div className="flex">
      <Sidebar currentView={currentView} setCurrentView={setCurrentView} />
      <main className="flex-1 p-6 bg-indigo-50 min-h-screen">
        <h1 className="text-2xl font-bold mb-4">Welcome, Admin</h1>
        <p className="text-gray-700 mb-6">Here's your dashboard overview.</p>

        {/* Top Cards */}
        <div className="flex flex-wrap gap-4 mb-6">
          <StatCard
            title="Approved Rooms"
            value={approvedMatches.length}
            icon={<FiHome />}
            color="green"
          />
          <StatCard
            title="Pending Matches"
            value={stats.pending}
            icon={<FiClock />}
            color="yellow"
          />
          <StatCard
            title="Total Matches"
            value={stats.total}
            icon={<FiUsers />}
            color="indigo"
          />
          <StatCard
            title="Approved Matches"
            value={stats.approved}
            icon={<FiCheck />}
            color="green"
          />
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Matches */}
          <RecentMatches matches={matches} />

          {/* Complaint Section */}
          <ComplaintBox />
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
