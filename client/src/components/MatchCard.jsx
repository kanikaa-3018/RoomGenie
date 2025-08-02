import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const MatchCard = ({ match, onToggleShortlist, isShortlisted }) => {
  const [showDetails, setShowDetails] = useState(false);

  const {
    name,
    age,
    location,
    budget,
    compatibility,
    vector = [],
    summary = "No summary available.",
    interests = [],
    profession,
    bio,
    avatar = `https://api.dicebear.com/7.x/lorelei/svg?seed=${name}`,
  } = match;

  const labels = [
    "Cleanliness",
    "Sociability",
    "Conflict Tolerance",
    "Lifestyle",
    "Communication",
  ];

  return (
    <>
      <motion.div
        className={`rounded-2xl shadow-md p-5 border border-gray-200 bg-white hover:shadow-lg transition-all duration-300 w-full max-w-xl mx-auto`}
      >
        <div className="flex gap-4 items-center mb-4">
          <img src={avatar} alt={name} className="w-14 h-14 rounded-full" />
          <div>
            <h3 className="text-xl font-semibold text-gray-800">{name}, {age}</h3>
            <p className="text-sm text-gray-500">{location}</p>
            <p className="text-sm text-gray-500">Budget: ₹{budget}</p>
          </div>
        </div>

        <div className="mt-2 mb-4">
          <p className="font-medium text-sm text-gray-700">Compatibility Score</p>
          <div className="w-full bg-gray-200 h-2 rounded-full">
            <div
              className="bg-green-500 h-2 rounded-full"
              style={{ width: `${compatibility}%` }}
            ></div>
          </div>
          <p className="text-xs text-gray-500 mt-1">{compatibility}% match</p>
        </div>

        <div className="flex gap-2 flex-wrap mt-2">
          {interests.slice(0, 3).map((int, i) => (
            <span
              key={i}
              className="bg-pink-100 text-pink-700 text-xs font-medium px-2 py-1 rounded-full"
            >
              {int}
            </span>
          ))}
        </div>

        <div className="flex justify-between items-center mt-4">
          <button
            className="text-blue-600 text-sm underline hover:text-blue-800"
            onClick={() => setShowDetails(true)}
          >
            Read More
          </button>
          <button
            onClick={onToggleShortlist}
            className={`text-sm px-3 py-1 rounded-full ${
              isShortlisted
                ? "bg-green-100 text-green-800"
                : "bg-gray-100 text-gray-700"
            } hover:shadow-sm`}
          >
            {isShortlisted ? "Shortlisted" : "Shortlist"}
          </button>
        </div>
      </motion.div>

      <AnimatePresence>
        {showDetails && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center"
          >
            <motion.div
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              exit={{ y: 100 }}
              className="bg-white rounded-xl p-6 max-w-lg w-full shadow-xl relative"
            >
              <button
                onClick={() => setShowDetails(false)}
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
              >
                <X />
              </button>

              <div className="flex items-center gap-4 mb-4">
                <img
                  src={avatar}
                  alt={name}
                  className="w-16 h-16 rounded-full"
                />
                <div>
                  <h2 className="text-xl font-semibold">{name}, {age}</h2>
                  <p className="text-sm text-gray-500">{profession}</p>
                  <p className="text-sm text-gray-500">{location} | ₹{budget}</p>
                </div>
              </div>

              <div className="space-y-3 mt-3">
                <p className="text-gray-800 font-medium">Bio:</p>
                <p className="text-sm text-gray-600">{bio || "No bio available."}</p>

                <p className="text-gray-800 font-medium mt-3">Trait Breakdown:</p>
                {vector.map((score, i) => (
                  <div key={i}>
                    <p className="text-sm text-gray-600">{labels[i]}</p>
                    <div className="w-full bg-gray-200 h-2 rounded-full">
                      <div
                        className="bg-indigo-500 h-2 rounded-full"
                        style={{ width: `${score}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-500">{score}%</p>
                  </div>
                ))}

                <div className="mt-4">
                  <p className="text-gray-800 font-medium">Summary:</p>
                  <p className="text-sm text-gray-700">{summary}</p>
                </div>

                <div className="mt-4">
                  <p className="text-gray-800 font-medium">Keywords:</p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {interests.map((keyword, i) => (
                      <span
                        key={i}
                        className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default MatchCard;
