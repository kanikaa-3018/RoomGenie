const express = require('express');
const router = express.Router();
const {
  getAllComplaints,
  getComplaintStats,
  getComplaintById,
  createComplaint,
  updateComplaintStatus,
  deleteComplaint,
  getUserComplaints
} = require('../controllers/complaintController');

// Admin routes
router.get('/admin/complaints', getAllComplaints);
router.get('/admin/complaints/stats', getComplaintStats);
router.get('/admin/complaints/:id', getComplaintById);
router.put('/admin/complaints/:id/status', updateComplaintStatus);
router.delete('/admin/complaints/:id', deleteComplaint);

// User routes
router.post('/complaints', createComplaint);
router.get('/users/:userId/complaints', getUserComplaints);

module.exports = router;
