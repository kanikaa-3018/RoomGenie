import React from "react";
import { motion } from "framer-motion";
import { Heart, MapPin, DollarSign, User, MessageCircle } from "lucide-react";

const MatchCard = ({ match, onShortlist, isShortlisted }) => {
  const traitNames = {
    cleanliness: "Cleanliness",
    sociability: "Sociability",
    conflictTolerance: "Conflict Resolution",
    lifestyle: "Lifestyle",
    communication: "Communication",
  };

  return (
    <motion.div
      className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all border border-primary/10"
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Header with Image and Basic Info */}
      <div className="relative">
        <img
          src={match.image}
          alt={match.name}
          className="w-full h-64 object-cover"
        />
        <div className="absolute top-4 right-4">
          <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-lg">
            <span className="text-primary font-bold text-lg">
              {match.compatibility}%
            </span>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
          <h3 className="text-2xl font-bold text-white mb-1">{match.name}</h3>
          <div className="flex items-center text-white/90 space-x-4">
            <div className="flex items-center space-x-1">
              <User className="h-4 w-4" />
              <span>{match.age}</span>
            </div>
            <div className="flex items-center space-x-1">
              <MapPin className="h-4 w-4" />
              <span>{match.location}</span>
            </div>
            <div className="flex items-center space-x-1">
              <DollarSign className="h-4 w-4" />
              <span>{match.budget}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Compatibility Breakdown */}
        <div className="mb-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">
            Compatibility Breakdown
          </h4>
          <div className="space-y-3">
            {Object.entries(match.scores).map(([trait, score]) => (
              <div key={trait} className="flex items-center justify-between">
                <span className="text-sm font-medium text-darkGray">
                  {traitNames[trait]}
                </span>
                <div className="flex items-center space-x-2">
                  <div className="w-20 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-primary to-accent h-2 rounded-full"
                      style={{ width: `${score}%` }}
                    />
                  </div>
                  <span className="text-sm font-bold text-primary w-8">
                    {score}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Summary */}
        <div className="mb-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
            <MessageCircle className="h-5 w-5 text-accent mr-2" />
            Why She's Perfect for You
          </h4>
          <p className="text-darkGray leading-relaxed text-sm bg-accent/10 p-4 rounded-2xl">
            {match.summary}
          </p>
        </div>

        {/* Interests */}
        <div className="mb-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-3">Interests</h4>
          <div className="flex flex-wrap gap-2">
            {match.interests.map((interest, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-secondary/30 text-contrast text-sm rounded-full"
              >
                {interest}
              </span>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <motion.button
          onClick={() => onShortlist(match)}
          className={`w-full py-3 rounded-2xl font-semibold transition-all flex items-center justify-center space-x-2 ${
            isShortlisted
              ? "bg-accent text-white shadow-lg"
              : "bg-gradient-to-r from-primary to-accent text-white hover:shadow-lg"
          }`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Heart className={`h-5 w-5 ${isShortlisted ? "fill-current" : ""}`} />
          <span>{isShortlisted ? "Shortlisted!" : "Add to Shortlist"}</span>
        </motion.button>
      </div>
    </motion.div>
  );
};

export default MatchCard;
