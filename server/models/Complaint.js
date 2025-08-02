const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
  user: {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    }
  },
  room: {
    type: String,
    required: true
  },
  issue: {
    type: String,
    required: true,
    maxlength: 1000
  },
  category: {
    type: String,
    enum: ['Maintenance', 'Technical', 'Behavioral', 'Cleanliness', 'Security', 'Other'],
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'in-progress', 'resolved', 'closed'],
    default: 'pending'
  }
}, {
  timestamps: true
});

// Index for efficient queries
complaintSchema.index({ status: 1, createdAt: -1 });
complaintSchema.index({ 'user.userId': 1 });
complaintSchema.index({ room: 1 });
complaintSchema.index({ category: 1 });

module.exports = mongoose.model('Complaint', complaintSchema);
