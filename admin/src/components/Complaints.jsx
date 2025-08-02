import React, { useState, useEffect } from 'react';
import { FiAlertCircle, FiClock, FiUser, FiRefreshCw, FiEdit, FiTrash2, FiEye, FiCheck, FiX } from 'react-icons/fi';

const Complaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [stats, setStats] = useState({
    summary: { total: 0, pending: 0, resolvedToday: 0 },
    statusBreakdown: {}
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [updating, setUpdating] = useState(false);

  const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

  // Fetch complaints and stats
  const fetchComplaints = async () => {
    try {
      setLoading(true);
      const [complaintsRes, statsRes] = await Promise.all([
        fetch(`${backendUrl}/api/admin/complaints?limit=100`), // Increased limit to show more complaints
        fetch(`${backendUrl}/api/admin/complaints/stats`)
      ]);

      if (!complaintsRes.ok || !statsRes.ok) {
        throw new Error('Failed to fetch data');
      }

      const complaintsData = await complaintsRes.json();
      const statsData = await statsRes.json();

      setComplaints(complaintsData.complaints || []);
      setStats(statsData);
      setError(null);
    } catch (err) {
      console.error('Error fetching complaints:', err);
      setError('Failed to load complaints. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Update complaint status
  const updateComplaintStatus = async (complaintId, newStatus) => {
    try {
      setUpdating(true);
      const response = await fetch(`${backendUrl}/api/admin/complaints/${complaintId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error('Failed to update complaint status');
      }

      // Update the complaints list
      setComplaints(prev => 
        prev.map(complaint => 
          complaint._id === complaintId 
            ? { ...complaint, status: newStatus }
            : complaint
        )
      );

      // Refresh stats
      fetchComplaints();
      setError(null);
    } catch (err) {
      console.error('Error updating complaint:', err);
      setError('Failed to update complaint status');
    } finally {
      setUpdating(false);
    }
  };

  // View complaint details
  const viewComplaintDetails = async (complaintId) => {
    try {
      const response = await fetch(`${backendUrl}/api/admin/complaints/${complaintId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch complaint details');
      }
      const complaint = await response.json();
      setSelectedComplaint(complaint);
      setShowModal(true);
    } catch (err) {
      console.error('Error fetching complaint details:', err);
      setError('Failed to load complaint details');
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Modal for viewing complaint details
  const ComplaintModal = () => {
    if (!showModal || !selectedComplaint) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-96 overflow-y-auto">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Complaint Details</h3>
            <button
              onClick={() => setShowModal(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <FiX className="w-6 h-6" />
            </button>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-500">Complainant</label>
              <p className="text-gray-900">{selectedComplaint.user.name} ({selectedComplaint.user.email})</p>
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-500">Room</label>
              <p className="text-gray-900">{selectedComplaint.room}</p>
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-500">Category</label>
              <p className="text-gray-900">{selectedComplaint.category}</p>
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-500">Status</label>
              <p className="text-gray-900 capitalize">{selectedComplaint.status.replace('-', ' ')}</p>
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-500">Issue Description</label>
              <p className="text-gray-900">{selectedComplaint.issue}</p>
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-500">Submitted On</label>
              <p className="text-gray-900">
                {new Date(selectedComplaint.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
            </div>
          </div>
          
          <div className="mt-6 flex space-x-3">
            {selectedComplaint.status === 'pending' && (
              <>
                <button
                  onClick={() => {
                    updateComplaintStatus(selectedComplaint._id, 'in-progress');
                    setShowModal(false);
                  }}
                  disabled={updating}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
                >
                  Start Progress
                </button>
                <button
                  onClick={() => {
                    updateComplaintStatus(selectedComplaint._id, 'resolved');
                    setShowModal(false);
                  }}
                  disabled={updating}
                  className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 disabled:opacity-50"
                >
                  Mark Resolved
                </button>
              </>
            )}
            {selectedComplaint.status === 'in-progress' && (
              <button
                onClick={() => {
                  updateComplaintStatus(selectedComplaint._id, 'resolved');
                  setShowModal(false);
                }}
                disabled={updating}
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 disabled:opacity-50"
              >
                Mark Resolved
              </button>
            )}
            <button
              onClick={() => setShowModal(false)}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      case 'closed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Maintenance': return 'bg-red-100 text-red-800';
      case 'Technical': return 'bg-purple-100 text-purple-800';
      case 'Behavioral': return 'bg-orange-100 text-orange-800';
      case 'Cleanliness': return 'bg-blue-100 text-blue-800';
      case 'Security': return 'bg-red-100 text-red-800';
      case 'Other': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const pendingCount = stats.statusBreakdown?.pending || 0;
  const inProgressCount = stats.statusBreakdown?.['in-progress'] || 0;
  const resolvedCount = stats.statusBreakdown?.resolved || 0;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex items-center space-x-2">
          <FiRefreshCw className="w-6 h-6 animate-spin text-indigo-600" />
          <span className="text-gray-600">Loading complaints...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <div className="flex items-center">
          <FiAlertCircle className="w-5 h-5 text-red-600" />
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800">Error</h3>
            <p className="text-sm text-red-700 mt-1">{error}</p>
            <button 
              onClick={fetchComplaints}
              className="mt-2 text-sm text-red-600 hover:text-red-700 underline"
            >
              Try again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Complaint Details Modal */}
      <ComplaintModal />
      
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Complaints Management</h1>
          <p className="text-gray-600">Review and manage resident complaints and issues</p>
        </div>
        <button
          onClick={fetchComplaints}
          disabled={loading}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 disabled:opacity-50 flex items-center space-x-2"
        >
          <FiRefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          <span>Refresh</span>
        </button>
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
              <p className="text-2xl font-semibold text-gray-900">{stats.summary?.total || 0}</p>
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
                <tr key={complaint._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-medium">
                        {complaint.user.name.charAt(0)}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{complaint.user.name}</div>
                        <div className="text-sm text-gray-500">{complaint.user.email}</div>
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
                    {new Date(complaint.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex space-x-2">
                      {complaint.status === 'pending' && (
                        <>
                          <button 
                            onClick={() => updateComplaintStatus(complaint._id, 'in-progress')}
                            disabled={updating}
                            className="text-indigo-600 hover:text-indigo-900 text-sm disabled:opacity-50"
                          >
                            Start Progress
                          </button>
                          <button 
                            onClick={() => updateComplaintStatus(complaint._id, 'resolved')}
                            disabled={updating}
                            className="text-green-600 hover:text-green-900 text-sm disabled:opacity-50"
                          >
                            Resolve
                          </button>
                        </>
                      )}
                      {complaint.status === 'in-progress' && (
                        <button 
                          onClick={() => updateComplaintStatus(complaint._id, 'resolved')}
                          disabled={updating}
                          className="text-green-600 hover:text-green-900 text-sm disabled:opacity-50"
                        >
                          Mark Resolved
                        </button>
                      )}
                      <button 
                        onClick={() => viewComplaintDetails(complaint._id)}
                        className="text-gray-600 hover:text-gray-900 text-sm"
                      >
                        <FiEye className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Success Note */}
      
    </div>
  );
};

export default Complaints;
