const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  phone: { type: String, trim: true },
  age: { type: Number, required: true, min: 16 },
  ageGroup: { type: String, enum: ['16-18', '18-25', '25+'], required: true },

  // Single array to store vector scores (e.g., personality or compatibility scores)
  vector_embedding: {
    type: [Number],
    required: true,
    validate: {
      validator: function(arr) {
        return arr.every(score => Number.isInteger(score) && score >= 0 && score <= 100);
      },
      message: 'Each score in vector_embedding must be an integer between 0 and 100.'
    }
  },

  location: { type: String },
  budget: { type: String },
  questionAnswered: { type: Number, default: 0 },

  // Analysis Fields
  sentiment: String,
  personalitySummary: String,

  // Voice Call Data
  callRecordingUrl: String,
  callId: Number,

  // Conversation logs
  interactions: [{
    sequence: Number,
    user_query: String,
    bot_response: String,
    time: String
  }]
}, { timestamps: true });

// No need for pre-save trait validation anymore

module.exports = mongoose.model('User', userSchema);
