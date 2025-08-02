import React, { useState, useEffect } from 'react';
import { FiUsers, FiClock, FiCheck, FiX, FiHome, FiRefreshCw } from 'react-icons/fi';

const API_BASE_URL = 'http://localhost:5000/api/admin';

const MatchRequests = () => {
  const [matches, setMatches] = useState([]);
  const [stats, setStats] = useState({ total: 0, pending: 0, approved: 0, rejected: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [roomAllocation, setRoomAllocation] = useState({});

  // Fetch all matches
  const fetchMatches = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/matches`);
      const data = await response.json();
      
      if (data.success) {
        setMatches(data.matches);
      } else {
        setError('Failed to fetch matches');
      }
    } catch (err) {
      setError('Error fetching matches: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

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

  // Approve match
  const approveMatch = async (matchId) => {
    try {
      const room = roomAllocation[matchId] || '';
      const response = await fetch(`${API_BASE_URL}/matches/${matchId}/approve`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ roomAllocation: room }),
      });

      const data = await response.json();
      
      if (data.success) {
        // Refresh data
        fetchMatches();
        fetchStats();
        // Clear room allocation input
        setRoomAllocation(prev => ({ ...prev, [matchId]: '' }));
      } else {
        setError('Failed to approve match');
      }
    } catch (err) {
      setError('Error approving match: ' + err.message);
    }
  };

  // Reject match
  const rejectMatch = async (matchId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/matches/${matchId}/reject`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      
      if (data.success) {
        fetchMatches();
        fetchStats();
      } else {
        setError('Failed to reject match');
      }
    } catch (err) {
      setError('Error rejecting match: ' + err.message);
    }
  };

  // Update room allocation
  const updateRoomAllocation = async (matchId) => {
    try {
      const room = roomAllocation[matchId];
      if (!room) {
        setError('Please enter a room allocation');
        return;
      }

      const response = await fetch(`${API_BASE_URL}/matches/${matchId}/room-allocation`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ roomAllocation: room }),
      });

      const data = await response.json();
      
      if (data.success) {
        fetchMatches();
        setRoomAllocation(prev => ({ ...prev, [matchId]: '' }));
      } else {
        setError('Failed to update room allocation');
      }
    } catch (err) {
      setError('Error updating room allocation: ' + err.message);
    }
  };

  // Handle room allocation input change
  const handleRoomInputChange = (matchId, value) => {
    setRoomAllocation(prev => ({ ...prev, [matchId]: value }));
  };

  useEffect(() => {
    fetchMatches();
    fetchStats();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending': return <FiClock className="w-4 h-4" />;
      case 'approved': return <FiCheck className="w-4 h-4" />;
      case 'rejected': return <FiX className="w-4 h-4" />;
      default: return null;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex items-center space-x-2">
          <FiRefreshCw className="w-6 h-6 animate-spin text-indigo-600" />
          <span className="text-gray-600">Loading matches...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Match Requests</h1>
          <p className="text-gray-600">Review and manage roommate match requests</p>
        </div>
        <button
          onClick={() => { fetchMatches(); fetchStats(); }}
          className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <FiRefreshCw className="w-4 h-4" />
          <span>Refresh</span>
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <FiUsers className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Total Matches</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.total}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <FiClock className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Pending</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.pending}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <FiCheck className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Approved</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.approved}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-red-100 rounded-lg">
              <FiX className="w-6 h-6 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Rejected</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.rejected}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Matches List */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">All Match Requests</h2>
        </div>
        
        <div className="overflow-x-auto">
          {matches.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <FiUsers className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>No match requests found</p>
            </div>
          ) : (
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Users
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Compatibility Score
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Room Allocation
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date Created
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {matches.map((match) => (
                  <tr key={match._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-medium text-sm">
                            {match.user1.name.charAt(0)}
                          </div>
                          <div className="ml-3">
                            <p className="text-sm font-medium text-gray-900">{match.user1.name}</p>
                            <p className="text-sm text-gray-500">{match.user1.email}</p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-medium text-sm">
                            {match.user2.name.charAt(0)}
                          </div>
                          <div className="ml-3">
                            <p className="text-sm font-medium text-gray-900">{match.user2.name}</p>
                            <p className="text-sm text-gray-500">{match.user2.email}</p>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span className="text-lg font-semibold text-gray-900">{match.compatibilityScore}%</span>
                        <div className="ml-2 w-20 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-indigo-600 h-2 rounded-full" 
                            style={{ width: `${match.compatibilityScore}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(match.status)}`}>
                        {getStatusIcon(match.status)}
                        <span className="capitalize">{match.status}</span>
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {match.status === 'approved' ? (
                        <div className="space-y-2">
                          {match.roomAllocation ? (
                            <div className="flex items-center space-x-2">
                              <FiHome className="w-4 h-4 text-green-600" />
                              <span className="text-sm font-medium text-green-700">{match.roomAllocation}</span>
                            </div>
                          ) : (
                            <span className="text-sm text-gray-500">Not assigned</span>
                          )}
                          <div className="flex space-x-2">
                            <input
                              type="text"
                              placeholder="Enter room number"
                              value={roomAllocation[match._id] || ''}
                              onChange={(e) => handleRoomInputChange(match._id, e.target.value)}
                              className="text-sm border border-gray-300 rounded px-2 py-1 w-24"
                            />
                            <button
                              onClick={() => updateRoomAllocation(match._id)}
                              className="text-xs bg-indigo-600 text-white px-2 py-1 rounded hover:bg-indigo-700"
                            >
                              Update
                            </button>
                          </div>
                        </div>
                      ) : (
                        <span className="text-sm text-gray-500">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(match.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {match.status === 'pending' ? (
                        <div className="space-y-2">
                          <div className="flex space-x-2">
                            <input
                              type="text"
                              placeholder="Room number (optional)"
                              value={roomAllocation[match._id] || ''}
                              onChange={(e) => handleRoomInputChange(match._id, e.target.value)}
                              className="text-sm border border-gray-300 rounded px-2 py-1 w-32"
                            />
                          </div>
                          <div className="flex space-x-2">
                            <button
                              onClick={() => approveMatch(match._id)}
                              className="inline-flex items-center space-x-1 px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition-colors"
                            >
                              <FiCheck className="w-4 h-4" />
                              <span>Approve</span>
                            </button>
                            <button
                              onClick={() => rejectMatch(match._id)}
                              className="inline-flex items-center space-x-1 px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition-colors"
                            >
                              <FiX className="w-4 h-4" />
                              <span>Reject</span>
                            </button>
                          </div>
                        </div>
                      ) : (
                        <span className="text-sm text-gray-500 capitalize">{match.status}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default MatchRequests;
