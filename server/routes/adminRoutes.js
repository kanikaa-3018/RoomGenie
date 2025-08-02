const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Get all matches for admin panel
router.get('/matches', adminController.getAllMatches);

// Create a new match request (from user frontend)
router.post('/matches', adminController.createMatch);

// Approve a match
router.put('/matches/:matchId/approve', adminController.approveMatch);

// Reject a match
router.put('/matches/:matchId/reject', adminController.rejectMatch);

// Update room allocation for approved match
router.put('/matches/:matchId/room-allocation', adminController.updateRoomAllocation);

// Get match statistics
router.get('/stats', adminController.getMatchStats);

module.exports = router;
