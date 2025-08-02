import React from 'react';
import { FiAlertCircle, FiClock, FiUser } from 'react-icons/fi';

const Complaints = () => {
  // Sample complaints data - in a real app, this would come from an API
  const complaints = [
    {
      id: 1,
      user: "Priya Sharma",
      email: "priya@example.com",
      room: "A-101",
      issue: "AC not working in room A-101. It's been 3 days and it's getting very hot.",
      status: "pending",
      dateSubmitted: "2025-08-01T10:30:00Z",
      category: "Maintenance"
    },
    {
      id: 2,
      user: "Aditya Patel",
      email: "aditya@example.com",
      room: "B-202",
      issue: "WiFi is down on 3rd floor. Cannot connect to the internet for online classes.",
      status: "in-progress",
      dateSubmitted: "2025-08-01T14:15:00Z",
      category: "Technical"
    },
    {
      id: 3,
      user: "Rahul Mehta",
      email: "rahul@example.com",
      room: "C-303",
      issue: "Roommate is consistently noisy during study hours despite multiple requests.",
      status: "resolved",
      dateSubmitted: "2025-07-30T09:45:00Z",
      category: "Behavioral"
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Maintenance': return 'bg-red-100 text-red-800';
      case 'Technical': return 'bg-purple-100 text-purple-800';
      case 'Behavioral': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const pendingCount = complaints.filter(c => c.status === 'pending').length;
  const inProgressCount = complaints.filter(c => c.status === 'in-progress').length;
  const resolvedCount = complaints.filter(c => c.status === 'resolved').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Complaints Management</h1>
        <p className="text-gray-600">Review and manage resident complaints and issues</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-gray-100 rounded-lg">
              <FiAlertCircle className="w-6 h-6 text-gray-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Total Complaints</p>
              <p className="text-2xl font-semibold text-gray-900">{complaints.length}</p>
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
              <p className="text-2xl font-semibold text-gray-900">{pendingCount}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <FiUser className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">In Progress</p>
              <p className="text-2xl font-semibold text-gray-900">{inProgressCount}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <FiAlertCircle className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Resolved</p>
              <p className="text-2xl font-semibold text-gray-900">{resolvedCount}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Complaints List */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">All Complaints</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Complainant
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Room
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Issue
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date Submitted
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {complaints.map((complaint) => (
                <tr key={complaint.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-medium">
                        {complaint.user.charAt(0)}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{complaint.user}</div>
                        <div className="text-sm text-gray-500">{complaint.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-medium text-gray-900">{complaint.room}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 max-w-xs truncate" title={complaint.issue}>
                      {complaint.issue}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(complaint.category)}`}>
                      {complaint.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(complaint.status)}`}>
                      {complaint.status.replace('-', ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(complaint.dateSubmitted).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex space-x-2">
                      {complaint.status === 'pending' && (
                        <>
                          <button className="text-indigo-600 hover:text-indigo-900 text-sm">
                            Assign
                          </button>
                          <button className="text-green-600 hover:text-green-900 text-sm">
                            Resolve
                          </button>
                        </>
                      )}
                      {complaint.status === 'in-progress' && (
                        <button className="text-green-600 hover:text-green-900 text-sm">
                          Mark Resolved
                        </button>
                      )}
                      <button className="text-gray-600 hover:text-gray-900 text-sm">
                        View Details
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Note about future implementation */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex">
          <FiAlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
          <div className="ml-3">
            <h3 className="text-sm font-medium text-blue-800">Development Note</h3>
            <p className="text-sm text-blue-700 mt-1">
              This is a placeholder complaints management interface. In a production environment, 
              this would be connected to a complaints API with features like status updates, 
              assignment to maintenance staff, and notification systems.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Complaints;
