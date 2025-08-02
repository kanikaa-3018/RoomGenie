import React, { useState } from "react";
import { motion } from "framer-motion";
import { Heart, Users, Sparkles, ArrowRight, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Dialog } from "@headlessui/react";
import { X } from "lucide-react";

// Dummy user match data
const dummyMatches = [
  {
    id: 1,
    name: "Aarushi Sharma",
    email: "aarushi@example.com",
    percentage: 84,
    summary:
      "Aarushi is a clean and communicative person who prefers an early morning routine. She is sociable but values personal space.",
    keywords: ["Clean", "Friendly", "Early riser", "Organized"],
    avatar:
      "https://api.dicebear.com/8.x/fun-emoji/svg?seed=Aarushi&backgroundColor=ffe5ec",
  },
  {
    id: 2,
    name: "Mira Kapoor",
    email: "mira.kapoor@example.com",
    percentage: 78,
    summary:
      "Mira is very social and easygoing. She enjoys music, keeps her space tidy, and is highly tolerant of differences.",
    keywords: ["Outgoing", "Tidy", "Peaceful", "Music lover"],
    avatar:
      "https://api.dicebear.com/8.x/fun-emoji/svg?seed=Mira&backgroundColor=e0f7fa",
  },
];

const MatchResults = () => {
  const [shortlisted, setShortlisted] = useState([]);
  const [expandedMatch, setExpandedMatch] = useState(null);
  const navigate = useNavigate();

  const handleShortlist = (id) => {
    setShortlisted((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSubmitShortlist = () => {
    if (shortlisted.length === 0) {
      toast.error("Please shortlist at least one match");
      return;
    }

    const shortlistedMatches = dummyMatches.filter((match) =>
      shortlisted.includes(match.id)
    );
    console.log("Shortlisted:", shortlistedMatches);

    toast.success("Shortlist submitted! Our team will review your choice.");
    setTimeout(() => {
      navigate("/success");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#f9f5f2] py-10 px-6 lg:px-16">
      <h1 className="text-4xl font-extrabold text-[#2e2a27] mb-8">
        🧩 Your Top Roommate Matches
      </h1>
      <div className="grid md:grid-cols-2 gap-8">
        {dummyMatches.map((match) => (
          <motion.div
            key={match.id}
            className={`rounded-2xl p-6 shadow-md transition-all duration-300 border ${
              shortlisted.includes(match.id)
                ? "bg-[#e0f7fa] border-[#26c6da]"
                : "bg-white border-gray-200"
            }`}
            whileHover={{ scale: 1.03 }}
          >
            <div className="flex items-center gap-4 mb-4">
              <img
                src={match.avatar}
                alt={match.name}
                className="w-14 h-14 rounded-full border-2 border-gray-300"
              />
              <div>
                <h3 className="text-lg font-semibold text-[#2e2a27]">
                  {match.name}
                </h3>
                <p className="text-sm text-gray-600">{match.email}</p>
              </div>
            </div>

            <div className="text-md mb-2 text-gray-700">
              Compatibility:{" "}
              <span className="font-bold text-[#2e7d32]">
                {match.percentage}%
              </span>
            </div>

            <div className="flex gap-2 flex-wrap mt-2 mb-4">
              {match.keywords.map((tag, idx) => (
                <span
                  key={idx}
                  className="bg-[#fff7ec] text-[#b36b00] text-xs font-medium px-3 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex justify-between items-center">
              <button
                onClick={() => handleShortlist(match.id)}
                className={`text-sm font-medium px-4 py-2 rounded-full transition-all duration-200 ${
                  shortlisted.includes(match.id)
                    ? "bg-[#26c6da] text-white"
                    : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                }`}
              >
                {shortlisted.includes(match.id) ? "Shortlisted" : "Shortlist"}
              </button>
              <button
                onClick={() => setExpandedMatch(match)}
                className="text-sm text-[#6a1b9a] hover:underline font-medium"
              >
                Read More →
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <button
          onClick={handleSubmitShortlist}
          className="bg-[#6a1b9a] text-white font-semibold px-6 py-3 rounded-full hover:bg-[#4a0072] transition"
        >
          Submit My Shortlist
        </button>
      </div>

      {/* Popup Dialog for Summary */}
      <Dialog
        open={!!expandedMatch}
        onClose={() => setExpandedMatch(null)}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      >
        {expandedMatch && (
          <Dialog.Panel className="bg-white max-w-md w-full rounded-2xl p-6 shadow-lg relative">
            <button
              onClick={() => setExpandedMatch(null)}
              className="absolute top-3 right-3 text-gray-500 hover:text-black"
            >
              <X size={20} />
            </button>
            <div className="flex items-center gap-4 mb-4">
              <img
                src={expandedMatch.avatar}
                className="w-16 h-16 rounded-full border-2 border-gray-300"
              />
              <div>
                <Dialog.Title className="text-xl font-bold text-[#2e2a27]">
                  {expandedMatch.name}
                </Dialog.Title>
                <p className="text-sm text-gray-600">{expandedMatch.email}</p>
              </div>
            </div>
            <div className="mb-3 text-gray-700">
              <strong>Compatibility:</strong>{" "}
              <span className="text-[#2e7d32] font-semibold">
                {expandedMatch.percentage}%
              </span>
            </div>
            <div className="mb-3 text-gray-700">
              <strong>Summary:</strong>
              <p className="mt-1 text-sm leading-relaxed">
                {expandedMatch.summary}
              </p>
            </div>
            <div className="text-gray-700">
              <strong>Traits:</strong>
              <div className="flex gap-2 flex-wrap mt-2">
                {expandedMatch.keywords.map((tag, idx) => (
                  <span
                    key={idx}
                    className="bg-[#ede7f6] text-[#512da8] text-xs font-medium px-3 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </Dialog.Panel>
        )}
      </Dialog>
    </div>
  );
};

export default MatchResults;
