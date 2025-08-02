const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema({
  user1: {
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
  user2: {
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
  compatibilityScore: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  roomAllocation: {
    type: String,
    default: null
  }
}, { 
  timestamps: true 
});

module.exports = mongoose.model('Match', matchSchema);
