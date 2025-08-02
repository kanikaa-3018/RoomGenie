import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  Edit3,
  ArrowRight,
  CheckCircle,
  PieChart as PieIcon,
} from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ScoreSlider from "../components/ScoreSlider";

const COLORS = ["#B38FB5", "#8E6F97", "#d3bddb", "#563F57", "#A77BA0"];

const PostCallAnalysis = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [preferences, setPreferences] = useState("");
  const [showChart, setShowChart] = useState(false);
  const [summary, setSummary] = useState("");
  const [sentiment, setSentiment] = useState("");
  const [scores, setScores] = useState([ 60,50,45,30,22]
   
  );

  const user = JSON.parse(localStorage.getItem("user") || "null");
  const navigate = useNavigate();

const labelMap = [
  "Cleanliness",
  "Sociability",
  "Conflict Tolerance",
  "Lifestyle",
  "Communication",
];

const traitDescriptions = [
  "How important is tidiness and organization in your living space",
  "Your preference for social interaction with roommates",
  "How you handle disagreements and resolve conflicts",
  "Your daily routines, sleep schedule, and general habits",
  "How openly and frequently you communicate with others",
];


  const chartData = Object.entries(scores).map(([name, value]) => ({
    name: labelMap[name] || name,
    value,
  }));

  const handleScoreChange = (trait, value) => {
    setScores((prev) => ({ ...prev, [trait]: value }));
  };

const fetchSummary = async () => {
  try {
    const res = await axios.get(
      `https://c3fa96c76aba.ngrok-free.app/api/users/analysis/${user?.email}`
    );
    const data = res.data;

    setSummary(data.summary || "No summary available.");
    setSentiment(data.sentiment || "Neutral");

    const traits = data.traits || {};

    // Convert trait map to ordered array
    const updatedScores = [
      traits.question1 || 30,
      traits.question2 || 30,
      traits.question3 || 30,
      traits.question4 || 30,
      traits.question5 || 30,
    ];

    setScores(updatedScores);
  } catch (err) {
    console.error("Failed to fetch summary", err);
  }
};


const handleSave = async () => {
  try {
    await axios.post(
      `https://c3fa96c76aba.ngrok-free.app/api/users/update-vector`,
      {
        email: user?.email,
        vector: scores,
      }
    );
    await fetchSummary();
    setIsEditing(false);
  } catch (err) {
    console.error("Failed to save compatibility vector", err);
  }
};


  const handleContinue = () => {
    navigate("/compatibility");
  };

  useEffect(() => {
    fetchSummary();
  }, []);

  return (
    <div className="min-h-screen bg-[#F5F5F5] py-14 px-6 font-[Poppins]">
      <div className="max-w-5xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center justify-center mb-6">
            <div
              className="p-5 rounded-full shadow-md"
              style={{
                background: "linear-gradient(to right, #563F57,#000000 )",
              }}
            >
              <Sparkles className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-black mb-2">
            Your Personality Profile
          </h1>
          <p className="text-md text-gray-600 max-w-2xl mx-auto">
            Here’s your{" "}
            <strong className="text-[#B38FB5]">
              AI-generated sentiment analysis
            </strong>{" "}
            based on your recent call.
          </p>
        </motion.div>

        <div className="text-right mb-6">
          <button
            onClick={() => setShowChart(!showChart)}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-full border border-[#B38FB5] text-[#563F57] hover:bg-[#B38FB5] hover:text-white transition-all"
          >
            <PieIcon className="w-4 h-4" />
            {showChart ? "View Analysis" : "View Pie Chart"}
          </button>
        </div>

        {showChart ? (
          <motion.div
            className="bg-white rounded-3xl p-10 shadow-xl border border-[#B38FB510] mb-10 h-[400px] flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  dataKey="value"
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  outerRadius={120}
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {chartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </motion.div>
        ) : (
          <>
            <motion.div
              className="bg-white rounded-3xl p-10 shadow-xl border border-[#B38FB510] mb-10"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="grid md:grid-cols-2 gap-8">
                {Object.entries(scores).map(([trait, score], index) => (
                  <motion.div
                    key={trait}
                    className="space-y-3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold capitalize text-[#563F57]">
                        {labelMap[trait]}
                      </h3>
                      <span className="text-xl font-bold text-[#B38FB5]">
                        {score}%
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">
                      {traitDescriptions[trait]}
                    </p>
                    {isEditing ? (
                      <ScoreSlider
                        value={score}
                        onChange={(value) => handleScoreChange(trait, value)}
                        label={trait}
                      />
                    ) : (
                      <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden">
                        <motion.div
                          className="h-3 rounded-full"
                          style={{
                            background:
                              "linear-gradient(to right, #563F57,#000000)",
                          }}
                          initial={{ width: 0 }}
                          animate={{ width: `${score}%` }}
                          transition={{ duration: 1, delay: index * 0.2 }}
                        />
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>

              {!isEditing && (
                <motion.div
                  className="mt-12 flex justify-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                >
                  <div className="text-center">
                    <h3 className="text-lg font-medium text-black mb-4">
                      Want to tweak the analysis or add something more?
                    </h3>
                    <motion.button
                      onClick={() => setIsEditing(true)}
                      className="text-[#B38FB5] font-medium italic underline text-lg flex items-center justify-center space-x-2 hover:text-[#9f77a7] transition-colors duration-200 text-center align-middle"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Edit3 className="h-5 w-5" />
                      <span>Edit My Profile</span>
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </motion.div>

            {!isEditing && (
              <div className="bg-white rounded-3xl p-8 shadow-md mb-10 text-center">
                <h3 className="text-xl font-semibold text-[#563F57] mb-2">
                  AI-Generated Summary
                </h3>
                <p className="text-gray-700 italic">{summary}</p>
                <p className="text-sm mt-3 text-gray-500">
                  Sentiment: <strong>{sentiment}</strong>
                </p>
              </div>
            )}

            {isEditing && (
              <motion.div
                className="bg-white rounded-3xl p-10 shadow-xl border border-[#B38FB510] mb-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h3 className="text-2xl font-semibold text-[#563F57] mb-6">
                  Additional Preferences
                </h3>
                <textarea
                  value={preferences}
                  onChange={(e) => setPreferences(e.target.value)}
                  placeholder="Tell us more about your lifestyle or roommate expectations..."
                  className="w-full h-32 p-4 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-[#B38FB5] focus:border-transparent transition-all resize-none"
                />
                <p className="text-sm text-gray-500 mt-2">
                  This will help us refine your match even further (optional)
                </p>
              </motion.div>
            )}
          </>
        )}

        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          {isEditing ? (
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setIsEditing(false)}
                className="px-6 py-3 border border-gray-300 text-gray-600 rounded-full font-medium hover:border-[#B38FB5] hover:text-[#B38FB5] transition-all"
              >
                Cancel
              </button>
              <motion.button
                onClick={handleSave}
                className="bg-[#563F57] text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl flex items-center space-x-2"
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
              className="bg-[#563F57] text-white px-12 py-4 rounded-full text-lg font-semibold shadow-xl hover:shadow-2xl flex items-center space-x-2"
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
