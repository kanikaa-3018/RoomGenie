import React from "react";
import { motion } from "framer-motion";
import { UserRound, Heart } from "lucide-react";

// Dummy fallback
const dummyMatch = {
  name: "Aanya Sharma",
  email: "aanya@example.com",
  compatibility: 86,
  embedding: [72, 85, 64, 53, 90],
};

const labelMap = [
  "Cleanliness",
  "Sociability",
  "Conflict Tolerance",
  "Lifestyle",
  "Communication",
];

const MatchCard = ({ match = dummyMatch }) => {
  const scores = match.embedding || [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full sm:w-[420px]"
    >
      <div className="bg-white border border-violet-100 rounded-3xl p-6 shadow-md hover:shadow-lg transition-all duration-300">
        {/* Header: Name and Email */}
        <div className="flex items-start gap-4 mb-5">
          <div className="bg-violet-100 text-violet-700 p-3 rounded-full">
            <UserRound className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800">{match.name}</h2>
            <p className="text-sm text-gray-500">{match.email}</p>
          </div>
        </div>

        {/* Compatibility */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-pink-600">
            <Heart className="w-5 h-5" />
            <span className="text-sm font-medium">Compatibility Score</span>
          </div>
          <span className="text-xl font-semibold text-violet-700">
            {match.compatibility}%
          </span>
        </div>

        {/* Scores */}
        <div className="space-y-4 mt-2">
          {scores.map((value, index) => (
            <div key={index}>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-700">
                  {labelMap[index]}
                </span>
                <span className="text-sm text-gray-500">{value}%</span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${value}%`,
                    background:
                      value >= 80
                        ? "#8b5cf6"
                        : value >= 50
                        ? "#c084fc"
                        : "#f472b6",
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default MatchCard;
