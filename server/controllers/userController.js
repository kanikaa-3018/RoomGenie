const User = require("../models/User.js");
let activeOmnidimUserEmail = null;

const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

exports.loginUser = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "User not found" });

    // Store user for Omnidim webhook tracking
    activeOmnidimUserEmail = email;

    // Trigger FastAPI agent creation
    const fastApiUrl = "http://localhost:8000/create-agent";
    const response = await fetch(fastApiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ to_number: user.phone }),
    });

    const fastApiResult = await response.json();
    console.log("FastAPI agent response:", fastApiResult);

    return res.status(200).json({
      message: "Login successful, Omnidim agent triggered",
      user,
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ error: error.message });
  }
};

exports.handleOmnidimWebhook = async (req, res) => {

  try {
    console.log(req.body);
    const { call_id, call_report } = req.body;

    if (!call_report || !call_report.extracted_variables) {
      return res
        .status(400)
        .json({ error: "Missing required fields in webhook payload" });
    }

    if (!activeOmnidimUserEmail) {
      return res
        .status(400)
        .json({ error: "No active user set for Omnidim call" });
    }

    const user = await User.findOne({ email: activeOmnidimUserEmail });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    let vector = call_report.extracted_variables.vector_embedding;

    // Convert string to array if needed
    if (typeof vector === "string") {
      vector = JSON.parse(vector);
    }

    const ageGroup = user.ageGroup;
    const traitNames = {
      "16-18": [
        "sleepDiscipline",
        "cleanliness",
        "studyStyle",
        "emotionalSupport",
        "streamAffinity",
      ],
      "18-25": [
        "cleanliness",
        "noiseTolerance",
        "guestComfort",
        "itemSharing",
        "emotionalSharing",
      ],
      "25+": [
        "socialPreference",
        "scheduleTolerance",
        "partyOpenness",
        "cleanliness",
        "workLifeRespect",
      ],
    }[ageGroup];

    if (!Array.isArray(vector) || vector.length !== traitNames.length) {
      return res
        .status(400)
        .json({ error: "Mismatch in vector length or format" });
    }

    const traitsMap = {};
    for (let i = 0; i < traitNames.length; i++) {
      traitsMap[traitNames[i]] = { score: vector[i] };
    }

    try {
      const fastApiUrl = "http://localhost:8000/compatibility"; // or your deployed URL
      const answers = vector.map((v) => parseInt(v)); // Assuming the vector is in [1-10]
      const weights = Array(vector.length).fill(1.0); // Use uniform weights or customize if needed

      const response = await axios.post(fastApiUrl, {
        answers,
        weights,
        top_k: 5,
      });

      const fastApiResults = response.data.top_matches;
      user.vector_embedding = fastApiResults; 
    } catch (fastApiErr) {
      console.error(
        "Error communicating with FastAPI server:",
        fastApiErr?.message || fastApiErr
      );
    }

    // Save extracted info to user
    user.vector_embedding = call_report.extracted_variables.vector_embedding || [];
    user.sentiment = call_report.sentiment;
    user.personalitySummary = call_report.summary;
    user.callRecordingUrl = call_report.recording_url;
    user.callId = call_id;
    user.interactions = call_report.interactions;
    user.questionAnswered = call_report.extracted_variables.number_of_ques || 0;

    await user.save();

    // Clear active user
    activeOmnidimUserEmail = null;

    return res
      .status(200)
      .json({ success: true, message: "User updated with Omnidim call data" });
  } catch (err) {
    console.error("Omnidim webhook error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getUserAnalysis = async (req, res) => {
  try {
    const { email } = req.params;
    console.log(email)
    const user = await User.findOne({ email });
    console.log(user)

    if (!user || !user.vector_embedding || !user.callId) {
      return res.status(404).json({ error: "Analysis data not found" });
    }

    res.status(200).json({
      callId: user.callId,
      sentiment: user.sentiment,
      summary: user.personalitySummary,
      callRecordingUrl: user.callRecordingUrl,
      traits: user.traits,
      interactions: user.interactions,
      vector_embedding: user.vector_embedding,
      questionAnswered: user.questionAnswered,
    });
  } catch (err) {
    console.error("Error fetching user analysis:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


exports.updateVector = async (req, res) => {
  try {
    const { email, vector } = req.body;
    if (
      !email ||
      !Array.isArray(vector) ||
      !vector.every((val) => typeof val === "number")
    ) {
      return res.status(400).json({ message: "Invalid request body." });
    }

    const user = await User.findOneAndUpdate(
      { email },
      { vector_embedding: vector },
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

// exports.checkCallStatusById = async (req, res) => {
//   try {
//     const { userId } = req.params;
//     const user = await User.findById(userId);

//     if (!user) return res.status(404).json({ error: "User not found" });

//     const callCompleted = Boolean(user.callId && user.callRecordingUrl);
//     res.status(200).json({ callCompleted });
//   } catch (err) {
//     console.error("Error checking call status:", err);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

// exports.getPostCallAnalysis = async (req, res) => {
//   try {
//     const userId = req.params.id;

//     const user = await User.findById(userId).select(
//       "traits sentiment personalitySummary callRecordingUrl callId interactions"
//     );
//     if (!user) return res.status(404).json({ error: "User not found" });

//     res.status(200).json({
//       traits: user.traits,
//       sentiment: user.sentiment,
//       summary: user.personalitySummary,
//       callRecordingUrl: user.callRecordingUrl,
//       callId: user.callId,
//       interactions: user.interactions,
//     });
//   } catch (error) {
//     console.error("Error fetching post-call analysis:", error);
//     res.status(500).json({ error: "Server Error" });
//   }
// };
