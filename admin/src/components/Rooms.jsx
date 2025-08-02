import React, { useState, useEffect } from 'react';
import { FiHome, FiUsers, FiCalendar, FiRefreshCw, FiEdit, FiTrash2, FiPlus, FiCheck, FiX } from 'react-icons/fi';

const API_BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/api/admin`;

const Rooms = () => {
  const [allocatedRooms, setAllocatedRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingRoom, setEditingRoom] = useState(null);
  const [newRoomAllocation, setNewRoomAllocation] = useState('');

  // Fetch allocated rooms (approved matches with room allocation)
  const fetchAllocatedRooms = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/matches`);
      const data = await response.json();
      
      if (data.success) {
        // Filter only approved matches with room allocation
        const roomsWithAllocation = data.matches.filter(
          match => match.status === 'approved' && match.roomAllocation
        );
        setAllocatedRooms(roomsWithAllocation);
      } else {
        setError('Failed to fetch room allocations');
      }
    } catch (err) {
      setError('Error fetching room allocations: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Update room allocation
  const updateRoomAllocation = async (matchId, newRoom) => {
    try {
      const response = await fetch(`${API_BASE_URL}/matches/${matchId}/room-allocation`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ roomAllocation: newRoom }),
      });

      const data = await response.json();
      
      if (data.success) {
        fetchAllocatedRooms(); // Refresh the list
        setEditingRoom(null);
        setNewRoomAllocation('');
      } else {
        setError('Failed to update room allocation');
      }
    } catch (err) {
      setError('Error updating room allocation: ' + err.message);
    }
  };

  // Handle edit room
  const handleEditRoom = (match) => {
    setEditingRoom(match._id);
    setNewRoomAllocation(match.roomAllocation);
  };

  // Handle save edit
  const handleSaveEdit = (matchId) => {
    if (!newRoomAllocation.trim()) {
      setError('Please enter a valid room number');
      return;
    }
    
    // Clear any existing errors
    setError(null);
    updateRoomAllocation(matchId, newRoomAllocation.trim());
  };

  // Cancel edit
  const handleCancelEdit = () => {
    setEditingRoom(null);
    setNewRoomAllocation('');
    setError(null); // Clear any errors when canceling
  };

  // Handle key press in edit input
  const handleKeyPress = (e, matchId) => {
    if (e.key === 'Enter') {
      handleSaveEdit(matchId);
    } else if (e.key === 'Escape') {
      handleCancelEdit();
    }
  };

  useEffect(() => {
    fetchAllocatedRooms();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex items-center space-x-2">
          <FiRefreshCw className="w-6 h-6 animate-spin text-indigo-600" />
          <span className="text-gray-600">Loading allocated rooms...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Room Allocations</h1>
          <p className="text-gray-600">Manage all allocated rooms and their occupants</p>
        </div>
        <button
          onClick={fetchAllocatedRooms}
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <FiHome className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Total Allocated Rooms</p>
              <p className="text-2xl font-semibold text-gray-900">{allocatedRooms.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <FiUsers className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Total Occupants</p>
              <p className="text-2xl font-semibold text-gray-900">{allocatedRooms.length * 2}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <FiCalendar className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Recent Allocations</p>
              <p className="text-2xl font-semibold text-gray-900">
                {allocatedRooms.filter(room => {
                  const allocatedDate = new Date(room.updatedAt);
                  const weekAgo = new Date();
                  weekAgo.setDate(weekAgo.getDate() - 7);
                  return allocatedDate > weekAgo;
                }).length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Rooms List */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Allocated Rooms</h2>
        </div>
        
        <div className="overflow-x-auto">
          {allocatedRooms.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <FiHome className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p className="text-lg font-medium mb-2">No rooms allocated yet</p>
              <p>Room allocations will appear here once matches are approved with room assignments.</p>
            </div>
          ) : (
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Room Number
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Occupants
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Compatibility Score
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Allocation Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {allocatedRooms.map((room) => (
                  <tr key={room._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      {editingRoom === room._id ? (
                        <div className="flex items-center space-x-2">
                          <input
                            type="text"
                            value={newRoomAllocation}
                            onChange={(e) => setNewRoomAllocation(e.target.value)}
                            onKeyDown={(e) => handleKeyPress(e, room._id)}
                            className="border border-gray-300 rounded px-2 py-1 text-sm w-32 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            placeholder="Enter room number"
                            autoFocus
                          />
                          <button
                            onClick={() => handleSaveEdit(room._id)}
                            className="text-green-600 hover:text-green-700 p-1 rounded hover:bg-green-50 transition-colors"
                            title="Save changes"
                          >
                            <FiCheck className="w-4 h-4" />
                          </button>
                          <button
                            onClick={handleCancelEdit}
                            className="text-red-600 hover:text-red-700 p-1 rounded hover:bg-red-50 transition-colors"
                            title="Cancel editing"
                          >
                            <FiX className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-2">
                          <FiHome className="w-4 h-4 text-indigo-600" />
                          <span className="text-sm font-medium text-gray-900">
                            {room.roomAllocation}
                          </span>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-medium text-sm">
                            {room.user1.name.charAt(0)}
                          </div>
                          <div className="ml-3">
                            <p className="text-sm font-medium text-gray-900">{room.user1.name}</p>
                            <p className="text-sm text-gray-500">{room.user1.email}</p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-medium text-sm">
                            {room.user2.name.charAt(0)}
                          </div>
                          <div className="ml-3">
                            <p className="text-sm font-medium text-gray-900">{room.user2.name}</p>
                            <p className="text-sm text-gray-500">{room.user2.email}</p>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span className="text-lg font-semibold text-gray-900">{room.compatibilityScore}%</span>
                        <div className="ml-2 w-20 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-green-500 h-2 rounded-full" 
                            style={{ width: `${room.compatibilityScore}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(room.updatedAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {editingRoom !== room._id && (
                        <button
                          onClick={() => handleEditRoom(room)}
                          className="inline-flex items-center space-x-1 px-3 py-1 bg-indigo-100 text-indigo-700 text-sm rounded hover:bg-indigo-200 transition-colors"
                        >
                          <FiEdit className="w-4 h-4" />
                          <span>Edit Room</span>
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Room Summary by Floor/Building (if room numbers follow a pattern) */}
      {allocatedRooms.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Room Distribution</h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {(() => {
                // Group rooms by building/floor if room numbers follow pattern (e.g., A-101, B-202)
                const roomGroups = {};
                allocatedRooms.forEach(room => {
                  const roomNumber = room.roomAllocation;
                  const prefix = roomNumber.split('-')[0] || roomNumber.charAt(0) || 'Other';
                  if (!roomGroups[prefix]) {
                    roomGroups[prefix] = [];
                  }
                  roomGroups[prefix].push(room);
                });

                return Object.entries(roomGroups).map(([prefix, rooms]) => (
                  <div key={prefix} className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-2">
                      {prefix.length === 1 ? `Building ${prefix}` : `${prefix} Block`}
                    </h4>
                    <p className="text-sm text-gray-600">{rooms.length} rooms allocated</p>
                    <div className="mt-2">
                      <div className="flex flex-wrap gap-1">
                        {rooms.slice(0, 5).map(room => (
                          <span
                            key={room._id}
                            className="inline-block px-2 py-1 bg-indigo-100 text-indigo-700 text-xs rounded"
                          >
                            {room.roomAllocation}
                          </span>
                        ))}
                        {rooms.length > 5 && (
                          <span className="inline-block px-2 py-1 bg-gray-200 text-gray-600 text-xs rounded">
                            +{rooms.length - 5} more
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ));
              })()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Rooms;
