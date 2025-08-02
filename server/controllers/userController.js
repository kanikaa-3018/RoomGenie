const User = require('../models/User.js');
const Match = require('../models/Match.js');
let activeOmnidimUserEmail = null;

const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

exports.loginUser = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: 'User not found' });

    // Store user for Omnidim webhook tracking
    activeOmnidimUserEmail = email;

    // Trigger FastAPI agent creation
    const fastApiUrl = 'http://localhost:8000/create-agent';
    const response = await fetch(fastApiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ to_number: user.phone })
    });

    const fastApiResult = await response.json();
    console.log('FastAPI agent response:', fastApiResult);

    return res.status(200).json({
      message: 'Login successful, Omnidim agent triggered',
      user
    });

  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ error: error.message });
  }
};



exports.handleOmnidimWebhook = async (req, res) => {
  try {
    const { call_id, call_report } = req.body;

    if (!call_report || !call_report.extracted_variables) {
      return res.status(400).json({ error: 'Missing required fields in webhook payload' });
    }

    if (!activeOmnidimUserEmail) {
      return res.status(400).json({ error: 'No active user set for Omnidim call' });
    }

    const user = await User.findOne({ email: activeOmnidimUserEmail });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    let vector = call_report.extracted_variables.compatibility_vector;

    // Convert string to array if needed
    if (typeof vector === 'string') {
      vector = JSON.parse(vector);
    }

    const ageGroup = user.ageGroup;
    const traitNames = {
      '16-18': ['sleepDiscipline', 'cleanliness', 'studyStyle', 'emotionalSupport', 'streamAffinity'],
      '18-25': ['cleanliness', 'noiseTolerance', 'guestComfort', 'itemSharing', 'emotionalSharing'],
      '25+': ['socialPreference', 'scheduleTolerance', 'partyOpenness', 'cleanliness', 'workLifeRespect']
    }[ageGroup];

    if (!Array.isArray(vector) || vector.length !== traitNames.length) {
      return res.status(400).json({ error: 'Mismatch in vector length or format' });
    }

    const traitsMap = {};
    for (let i = 0; i < traitNames.length; i++) {
      traitsMap[traitNames[i]] = { score: vector[i] };
    }

    // Save extracted info to user
    user.traits = traitsMap;
    user.sentiment = call_report.sentiment;
    user.personalitySummary = call_report.summary;
    user.callRecordingUrl = call_report.recording_url;
    user.callId = call_id;
    user.interactions = call_report.interactions;

    await user.save();

    // Clear active user
    activeOmnidimUserEmail = null;

    return res.status(200).json({ success: true, message: 'User updated with Omnidim call data' });

  } catch (err) {
    console.error('Omnidim webhook error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getUserAnalysis = async (req, res) => {
  try {
    const { email } = req.params;
    const user = await User.findOne({ email });

    if (!user || !user.traits || !user.callId) {
      return res.status(404).json({ error: 'Analysis data not found' });
    }

    res.status(200).json({
      callId: user.callId,
      sentiment: user.sentiment,
      summary: user.personalitySummary,
      callRecordingUrl: user.callRecordingUrl,
      traits: user.traits,
      interactions: user.interactions
    });
  } catch (err) {
    console.error("Error fetching user analysis:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// controllers/userController.js
exports.updateVector = async (req, res) => {
  try {
    const { email, vector } = req.body;

    // Ensure 'vector' is an array of numbers
    if (
      !email ||
      !Array.isArray(vector) ||
      !vector.every((val) => typeof val === "number")
    ) {
      return res.status(400).json({ message: "Invalid request body." });
    }

    const user = await User.findOneAndUpdate(
      { email },
      { compatibilityVector: vector },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    res.json({ message: "Compatibility vector updated", vector });
  } catch (error) {
    console.error("Error updating compatibility vector:", error);
    res.status(500).json({ message: "Server error" });
  }
};








exports.checkCallStatusById = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);

    if (!user) return res.status(404).json({ error: 'User not found' });

    const callCompleted = Boolean(user.callId && user.callRecordingUrl);
    res.status(200).json({ callCompleted });
  } catch (err) {
    console.error('Error checking call status:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getPostCallAnalysis = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.findById(userId).select('traits sentiment personalitySummary callRecordingUrl callId interactions');
    if (!user) return res.status(404).json({ error: 'User not found' });

    res.status(200).json({
      traits: user.traits,
      sentiment: user.sentiment,
      summary: user.personalitySummary,
      callRecordingUrl: user.callRecordingUrl,
      callId: user.callId,
      interactions: user.interactions,
    });
  } catch (error) {
    console.error('Error fetching post-call analysis:', error);
    res.status(500).json({ error: 'Server Error' });
  }
};

// Submit match request to admin
exports.submitMatch = async (req, res) => {
  try {
    const { user1Id, user2Id, compatibilityScore } = req.body;

    // Validate input
    if (!user1Id || !user2Id) {
      return res.status(400).json({ 
        success: false, 
        error: 'Both user1Id and user2Id are required for a match' 
      });
    }

    if (!compatibilityScore || compatibilityScore < 0 || compatibilityScore > 100) {
      return res.status(400).json({ 
        success: false, 
        error: 'Valid compatibility score (0-100) is required' 
      });
    }

    // Fetch user details
    const [user1, user2] = await Promise.all([
      User.findById(user1Id).select('name email'),
      User.findById(user2Id).select('name email')
    ]);
    
    if (!user1 || !user2) {
      return res.status(400).json({ 
        success: false, 
        error: 'One or both users not found' 
      });
    }

    // Create match request
    const match = new Match({
      user1: {
        userId: user1._id,
        name: user1.name,
        email: user1.email
      },
      user2: {
        userId: user2._id,
        name: user2.name,
        email: user2.email
      },
      compatibilityScore,
      status: 'pending'
    });

    await match.save();

    res.status(201).json({
      success: true,
      message: 'Match request submitted to admin successfully',
      matchId: match._id
    });
  } catch (error) {
    console.error('Error submitting match:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to submit match request' 
    });
  }
};
