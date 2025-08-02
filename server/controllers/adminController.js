const Match = require('../models/Match');
const User = require('../models/User');

// Get all matches for admin panel
const getAllMatches = async (req, res) => {
  try {
    const matches = await Match.find()
      .populate('user1.userId', 'name email')
      .populate('user2.userId', 'name email')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      matches
    });
  } catch (error) {
    console.error('Error fetching matches:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch matches'
    });
  }
};

// Create a new match request (called from user frontend)
const createMatch = async (req, res) => {
  try {
    const { user1, user2, compatibilityScore } = req.body;

    // Validate required fields
    if (!user1 || !user2) {
      return res.status(400).json({
        success: false,
        message: 'Both user1 and user2 are required for a match'
      });
    }

    if (!compatibilityScore || compatibilityScore < 0 || compatibilityScore > 100) {
      return res.status(400).json({
        success: false,
        message: 'Valid compatibility score (0-100) is required'
      });
    }

    // Verify that both users exist
    const userIds = [user1.userId, user2.userId];
    const existingUsers = await User.find({ _id: { $in: userIds } });
    
    if (existingUsers.length !== 2) {
      return res.status(400).json({
        success: false,
        message: 'One or both users not found'
      });
    }

    const match = new Match({
      user1,
      user2,
      compatibilityScore,
      status: 'pending'
    });

    await match.save();

    res.status(201).json({
      success: true,
      message: 'Match request created successfully',
      match
    });
  } catch (error) {
    console.error('Error creating match:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create match request'
    });
  }
};

// Approve a match
const approveMatch = async (req, res) => {
  try {
    const { matchId } = req.params;
    const { roomAllocation } = req.body;

    const match = await Match.findById(matchId);
    
    if (!match) {
      return res.status(404).json({
        success: false,
        message: 'Match not found'
      });
    }

    if (match.status !== 'pending') {
      return res.status(400).json({
        success: false,
        message: 'Match has already been processed'
      });
    }

    match.status = 'approved';
    if (roomAllocation) {
      match.roomAllocation = roomAllocation;
    }

    await match.save();

    res.json({
      success: true,
      message: 'Match approved successfully',
      match
    });
  } catch (error) {
    console.error('Error approving match:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to approve match'
    });
  }
};

// Reject a match
const rejectMatch = async (req, res) => {
  try {
    const { matchId } = req.params;

    const match = await Match.findById(matchId);
    
    if (!match) {
      return res.status(404).json({
        success: false,
        message: 'Match not found'
      });
    }

    if (match.status !== 'pending') {
      return res.status(400).json({
        success: false,
        message: 'Match has already been processed'
      });
    }

    match.status = 'rejected';
    await match.save();

    res.json({
      success: true,
      message: 'Match rejected successfully',
      match
    });
  } catch (error) {
    console.error('Error rejecting match:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to reject match'
    });
  }
};

// Update room allocation for an approved match
const updateRoomAllocation = async (req, res) => {
  try {
    const { matchId } = req.params;
    const { roomAllocation } = req.body;

    if (!roomAllocation) {
      return res.status(400).json({
        success: false,
        message: 'Room allocation is required'
      });
    }

    const match = await Match.findById(matchId);
    
    if (!match) {
      return res.status(404).json({
        success: false,
        message: 'Match not found'
      });
    }

    if (match.status !== 'approved') {
      return res.status(400).json({
        success: false,
        message: 'Can only update room allocation for approved matches'
      });
    }

    match.roomAllocation = roomAllocation;
    await match.save();

    res.json({
      success: true,
      message: 'Room allocation updated successfully',
      match
    });
  } catch (error) {
    console.error('Error updating room allocation:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update room allocation'
    });
  }
};

// Get match statistics for admin dashboard
const getMatchStats = async (req, res) => {
  try {
    const totalMatches = await Match.countDocuments();
    const pendingMatches = await Match.countDocuments({ status: 'pending' });
    const approvedMatches = await Match.countDocuments({ status: 'approved' });
    const rejectedMatches = await Match.countDocuments({ status: 'rejected' });

    res.json({
      success: true,
      stats: {
        total: totalMatches,
        pending: pendingMatches,
        approved: approvedMatches,
        rejected: rejectedMatches
      }
    });
  } catch (error) {
    console.error('Error fetching match stats:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch match statistics'
    });
  }
};

module.exports = {
  getAllMatches,
  createMatch,
  approveMatch,
  rejectMatch,
  updateRoomAllocation,
  getMatchStats
};