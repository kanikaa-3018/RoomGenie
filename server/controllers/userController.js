const User = require('../models/User.js');

exports.handleOmnidimWebhook = async (req, res) => {
  try {
    console.log(req.body);
    
    const { call_id, user_email, call_report } = req.body;

    if (!user_email || !call_report || !call_report.extracted_variables) {
      return res.status(400).json({ error: 'Missing required fields in webhook payload' });
    }

    const user = await User.findOne({ email: user_email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const vector = call_report.extracted_variables.personality_embedding;
    const ageGroup = user.ageGroup;

    const traitNames = {
      '16-18': ['sleepDiscipline', 'cleanliness', 'studyStyle', 'emotionalSupport', 'streamAffinity'],
      '18-25': ['cleanliness', 'noiseTolerance', 'guestComfort', 'itemSharing', 'emotionalSharing'],
      '25+': ['socialPreference', 'scheduleTolerance', 'partyOpenness', 'cleanliness', 'workLifeRespect']
    }[ageGroup];

    if (!Array.isArray(vector) || vector.length !== traitNames.length) {
      return res.status(400).json({ error: 'Mismatch in embedding vector length' });
    }

    const traitsMap = {};
    for (let i = 0; i < traitNames.length; i++) {
      traitsMap[traitNames[i]] = {
        score: vector[i],
        embedding: [vector[i]] // wrapping in array as per schema
      };
    }

    user.traits = traitsMap;
    user.sentiment = call_report.sentiment;
    user.personalitySummary = call_report.summary;
    user.callRecordingUrl = call_report.recording_url;
    user.callId = call_id;
    user.interactions = call_report.interactions;

    await user.save();

    res.status(200).json({ success: true, message: 'User updated with Omnidim call data' });

  } catch (err) {
    console.error('Omnidim webhook error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
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
