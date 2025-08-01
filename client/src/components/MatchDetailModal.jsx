import React from "react";
import { X } from "lucide-react";
import { motion } from "framer-motion";

const MatchDetailModal = ({ match, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0 }}
        className="bg-white max-w-2xl w-full rounded-2xl p-6 shadow-xl relative"
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-600 hover:text-black">
          <X className="w-5 h-5" />
        </button>

        <div className="text-center">
          <img src={match.image} alt={match.name} className="w-20 h-20 mx-auto rounded-full object-cover" />
          <h2 className="text-2xl font-bold mt-2">{match.name}</h2>
          <p className="text-lg text-gray-600">{match.compatibility}% Overall Compatibility</p>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Question-wise Compatibility</h3>
          <div className="space-y-3">
            {match.questionCompatibility?.map((item, index) => (
              <div key={index}>
                <div className="flex justify-between text-sm font-medium">
                  <span>{item.question}</span>
                  <span>{item.percentage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
                  <div
                    className="h-2.5 rounded-full"
                    style={{ width: `${item.percentage}%`, background: "#E69A8D" }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {match.reason && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-1">Why this Match?</h3>
            <p className="text-sm text-gray-700">{match.reason}</p>
          </div>
        )}

        {match.interests && match.interests.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Common Interests</h3>
            <div className="flex flex-wrap gap-2">
              {match.interests.map((interest, idx) => (
                <span
                  key={idx}
                  className="rounded-full bg-[#C8BFE7] px-3 py-1 text-sm text-black font-medium"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default MatchDetailModal;
