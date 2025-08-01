import { motion } from "framer-motion";
import { CheckCircle, Heart, Info } from "lucide-react";
import React, { useState } from "react";
import MatchDetailModal from "./MatchDetailModal";

const MatchCard = ({ match, onShortlist, isShortlisted }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <motion.div
        whileHover="hover"
        transition={{ duration: 1, ease: "backInOut" }}
        variants={{ hover: { scale: 1.05 } }}
        className="relative h-auto w-full overflow-hidden rounded-2xl bg-[#F6E1C3] p-6 text-neutral-900 shadow-xl"
      >
        <div className="relative z-10 space-y-4 text-center">
          <img
            src={match.image}
            alt={match.name}
            className="w-20 h-20 mx-auto rounded-full object-cover"
          />
          <h2 className="text-xl font-bold text-black">{match.name}</h2>
          <p className="text-lg text-gray-800 font-medium">
            {match.compatibility}% Compatibility
          </p>

          <div className="flex justify-center gap-4 mt-4">
            <button
              onClick={() => setShowModal(true)}
              className="text-sm bg-white border border-black rounded-full px-4 py-2 flex items-center gap-1 hover:bg-accent hover:text-white"
            >
              <Info className="w-4 h-4" />
              Read More
            </button>
            <button
              onClick={() => onShortlist(match)}
              className={`text-sm border-2 rounded-full px-4 py-2 flex items-center gap-1 font-semibold ${
                isShortlisted
                  ? "bg-[#E69A8D] border-[#E69A8D] text-white"
                  : "bg-white border-black text-black hover:bg-[#F6E1C3]"
              }`}
            >
              {isShortlisted ? <CheckCircle className="w-4 h-4" /> : <Heart className="w-4 h-4" />}
              {isShortlisted ? "Shortlisted" : "Shortlist"}
            </button>
          </div>
        </div>
        <Background />
      </motion.div>

      {showModal && <MatchDetailModal match={match} onClose={() => setShowModal(false)} />}
    </>
  );
};

const Background = () => (
  <motion.svg
    width="320"
    height="384"
    viewBox="0 0 320 384"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="absolute inset-0 z-0"
    variants={{ hover: { scale: 1.3 } }}
    transition={{ duration: 1, ease: "backInOut" }}
  >
    <motion.circle
      cx="160.5"
      cy="114.5"
      r="101.5"
      fill="#FFECD1"
      transition={{ duration: 1, delay: 0.2 }}
    />
    <motion.ellipse
      cx="160.5"
      cy="265.5"
      rx="101.5"
      ry="43.5"
      fill="#F6E1C3"
      transition={{ duration: 1, delay: 0.2 }}
    />
  </motion.svg>
);

export default MatchCard;
