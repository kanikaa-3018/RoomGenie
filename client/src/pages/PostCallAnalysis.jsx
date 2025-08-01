import React, { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Edit3, ArrowRight, CheckCircle } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ScoreSlider from "../components/ScoreSlider";

const PostCallAnalysis = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [preferences, setPreferences] = useState("");
  const [scores, setScores] = useState({
    cleanliness: 85,
    sociability: 72,
    conflictTolerance: 90,
    lifestyle: 68,
    communication: 88,
  });

  const user = JSON.parse(localStorage.getItem("user"));

  const navigate = useNavigate();

  const traitDescriptions = {
    cleanliness: "How important is tidiness and organization in your living space",
    sociability: "Your preference for social interaction with roommates",
    conflictTolerance: "How you handle disagreements and resolve conflicts",
    lifestyle: "Your daily routines, sleep schedule, and general habits",
    communication: "How openly and frequently you communicate with others",
  };

  const handleScoreChange = (trait, value) => {
    setScores((prev) => ({ ...prev, [trait]: value }));
  };

const handleContinue = async () => {
  try {
    // await axios.post(`/api/users/${user._id}/post-call-analysis`, {
    //   scores,
    //   preferences: preferences.trim() || undefined,
    // });
    navigate("/compatibility");
  } catch (err) {
    console.error("Failed to update user post-call data", err);
  }
};


  return (
    <div className="min-h-screen bg-gradient-to-br from-softGray via-secondary/20 to-accent/20 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center justify-center mb-6">
            <div className="bg-gradient-to-r from-primary to-accent p-4 rounded-full">
              <Sparkles className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Your Personality Profile
          </h1>
          <p className="text-xl text-darkGray max-w-2xl mx-auto">
            Based on our conversation, here's your compatibility breakdown across key traits
          </p>
        </motion.div>

        {/* Trait Analysis */}
        <motion.div
          className="bg-white rounded-3xl p-8 shadow-2xl border border-primary/10 mb-8"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="grid md:grid-cols-2 gap-8">
            {Object.entries(scores).map(([trait, score], index) => (
              <motion.div
                key={trait}
                className="space-y-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900 capitalize">
                    {trait.replace(/([A-Z])/g, " $1").trim()}
                  </h3>
                  <span className="text-2xl font-bold text-primary">
                    {score}%
                  </span>
                </div>
                <p className="text-sm text-darkGray mb-4">
                  {traitDescriptions[trait]}
                </p>

                {isEditing ? (
                  <ScoreSlider
                    value={score}
                    onChange={(value) => handleScoreChange(trait, value)}
                    label={trait}
                  />
                ) : (
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <motion.div
                      className="bg-gradient-to-r from-primary to-accent h-3 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${score}%` }}
                      transition={{ duration: 1, delay: index * 0.2 }}
                    />
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Edit Profile Prompt */}
          {!isEditing && (
            <motion.div
              className="mt-12 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Want to edit or add more details?
              </h3>
              <motion.button
                onClick={() => setIsEditing(true)}
                className=" text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all flex items-center space-x-2 mx-auto" style={{
                    background: "linear-gradient(to right, #008080, #212f45)",
                  }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Edit3 className="h-5 w-5" />
                <span>Customize Profile</span>
              </motion.button>
            </motion.div>
          )}
        </motion.div>

        {/* Preferences Input */}
        {isEditing && (
          <motion.div
            className="bg-white rounded-3xl p-8 shadow-2xl border border-primary/10 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Additional Preferences
            </h3>
            <textarea
              value={preferences}
              onChange={(e) => setPreferences(e.target.value)}
              placeholder="Tell us more about your preferences, lifestyle, or what you're looking for in a roommate..."
              className="w-full h-32 p-4 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
            />
            <p className="text-sm text-darkGray mt-2">
              This information will help us find even better matches for you (optional)
            </p>
          </motion.div>
        )}

        {/* Action Buttons */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          {isEditing ? (
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => setIsEditing(false)}
                className="px-6 py-3 border border-gray-300 text-darkGray rounded-full font-semibold hover:border-primary hover:text-primary transition-all"
              >
                Cancel
              </button>
              <motion.button
                onClick={() => setIsEditing(false)}
                className="bg-gradient-to-r from-accent to-primary text-black px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all flex items-center space-x-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <CheckCircle className="h-5 w-5" />
                <span>Save Changes</span>
              </motion.button>
            </div>
          ) : (
            <motion.button
              onClick={handleContinue}
              className=" text-white px-12 py-4 rounded-full text-lg font-semibold shadow-xl hover:shadow-2xl transition-all flex items-center space-x-2 mx-auto" style={{
                    background: "linear-gradient(to right, #008080, #212f45)",
                  }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Find My Matches</span>
              <ArrowRight className="h-6 w-6" />
            </motion.button>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default PostCallAnalysis;
