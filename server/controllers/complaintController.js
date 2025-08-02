const Complaint = require('../models/Complaint');
const User = require('../models/User');

// Get all complaints (Admin)
const getAllComplaints = async (req, res) => {
  try {
    const { status, category, page = 1, limit = 10 } = req.query;
    
    // Build filter object
    const filter = {};
    if (status) filter.status = status;
    if (category) filter.category = category;

    const skip = (page - 1) * limit;

    const complaints = await Complaint.find(filter)
      .populate('user.userId', 'name email')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Complaint.countDocuments(filter);

    res.json({
      complaints,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / limit),
        totalComplaints: total,
        hasNext: page * limit < total,
        hasPrev: page > 1
      }
    });
  } catch (error) {
    console.error('Error fetching complaints:', error);
    res.status(500).json({ error: 'Failed to fetch complaints' });
  }
};

// Get complaint statistics (Admin)
const getComplaintStats = async (req, res) => {
  try {
    const [statusStats, categoryStats] = await Promise.all([
      Complaint.aggregate([
        { $group: { _id: '$status', count: { $sum: 1 } } }
      ]),
      Complaint.aggregate([
        { $group: { _id: '$category', count: { $sum: 1 } } }
      ])
    ]);

    const totalComplaints = await Complaint.countDocuments();
    const pendingComplaints = await Complaint.countDocuments({ status: 'pending' });
    const resolvedToday = await Complaint.countDocuments({
      status: 'resolved',
      updatedAt: {
        $gte: new Date(new Date().setHours(0, 0, 0, 0)),
        $lt: new Date(new Date().setHours(23, 59, 59, 999))
      }
    });

    res.json({
      summary: {
        total: totalComplaints,
        pending: pendingComplaints,
        resolvedToday
      },
      statusBreakdown: statusStats.reduce((acc, item) => {
        acc[item._id] = item.count;
        return acc;
      }, {}),
      categoryBreakdown: categoryStats.reduce((acc, item) => {
        acc[item._id] = item.count;
        return acc;
      }, {})
    });
  } catch (error) {
    console.error('Error fetching complaint stats:', error);
    res.status(500).json({ error: 'Failed to fetch complaint statistics' });
  }
};

// Get single complaint by ID (Admin)
const getComplaintById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const complaint = await Complaint.findById(id)
      .populate('user.userId', 'name email phone');

    if (!complaint) {
      return res.status(404).json({ error: 'Complaint not found' });
    }

    res.json(complaint);
  } catch (error) {
    console.error('Error fetching complaint:', error);
    res.status(500).json({ error: 'Failed to fetch complaint' });
  }
};

// Create new complaint (User)
const createComplaint = async (req, res) => {
  try {
    const { userId, room, issue, category } = req.body;

    // Validate required fields
    if (!userId || !room || !issue || !category) {
      return res.status(400).json({ 
        error: 'Missing required fields: userId, room, issue, category' 
      });
    }

    // Get user details
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const complaint = new Complaint({
      user: {
        userId: user._id,
        name: user.name,
        email: user.email
      },
      room,
      issue,
      category
    });

    await complaint.save();

    res.status(201).json({
      message: 'Complaint submitted successfully',
      complaint
    });
  } catch (error) {
    console.error('Error creating complaint:', error);
    res.status(500).json({ error: 'Failed to create complaint' });
  }
};

// Update complaint status (Admin)
const updateComplaintStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const complaint = await Complaint.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    ).populate('user.userId', 'name email');

    if (!complaint) {
      return res.status(404).json({ error: 'Complaint not found' });
    }

    res.json({
      message: 'Complaint status updated successfully',
      complaint
    });
  } catch (error) {
    console.error('Error updating complaint status:', error);
    res.status(500).json({ error: 'Failed to update complaint status' });
  }
};

// Delete complaint (Admin)
const deleteComplaint = async (req, res) => {
  try {
    const { id } = req.params;

    const complaint = await Complaint.findByIdAndDelete(id);

    if (!complaint) {
      return res.status(404).json({ error: 'Complaint not found' });
    }

    res.json({ message: 'Complaint deleted successfully' });
  } catch (error) {
    console.error('Error deleting complaint:', error);
    res.status(500).json({ error: 'Failed to delete complaint' });
  }
};

// Get user's complaints (User)
const getUserComplaints = async (req, res) => {
  try {
    const { userId } = req.params;
    const { status, page = 1, limit = 10 } = req.query;

    const filter = { 'user.userId': userId };
    if (status) filter.status = status;

    const skip = (page - 1) * limit;

    const complaints = await Complaint.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Complaint.countDocuments(filter);

    res.json({
      complaints,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / limit),
        totalComplaints: total,
        hasNext: page * limit < total,
        hasPrev: page > 1
      }
    });
  } catch (error) {
    console.error('Error fetching user complaints:', error);
    res.status(500).json({ error: 'Failed to fetch user complaints' });
  }
};

module.exports = {
  getAllComplaints,
  getComplaintStats,
  getComplaintById,
  createComplaint,
  updateComplaintStatus,
  deleteComplaint,
  getUserComplaints
};
