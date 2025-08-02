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
      "https://api.dicebear.com/8.x/fun-emoji/svg?seed=Aarushi%20Sharma&backgroundColor=ffe5ec",
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
      "https://api.dicebear.com/8.x/fun-emoji/svg?seed=Mira%20Kapoor&backgroundColor=e0f7fa",
  },
  {
    id: 3,
    name: "Riya Mehta",
    email: "riya.mehta@example.com",
    percentage: 91,
    summary:
      "Riya is a night owl who loves coding and quiet study sessions. She’s independent, low-maintenance, and prefers minimal interruptions.",
    keywords: ["Focused", "Independent", "Night owl", "Minimalist"],
    avatar:
      "https://api.dicebear.com/8.x/fun-emoji/svg?seed=Riya%20Mehta&backgroundColor=d0f0c0",
  },
  {
    id: 4,
    name: "Neha Singh",
    email: "neha.singh@example.com",
    percentage: 69,
    summary:
      "Neha is energetic, loves group activities, and thrives on shared meals. She can be chatty but respects agreed boundaries.",
    keywords: ["Energetic", "Social", "Foodie", "Flexible"],
    avatar:
      "https://api.dicebear.com/8.x/fun-emoji/svg?seed=Neha%20Singh&backgroundColor=fff2cc",
  },
  {
    id: 5,
    name: "Aditi Rao",
    email: "aditi.rao@example.com",
    percentage: 82,
    summary:
      "Aditi is calm, punctual, and likes structure in daily life. She prefers having dedicated quiet hours and is considerate about shared chores.",
    keywords: ["Punctual", "Calm", "Organized", "Considerate"],
    avatar:
      "https://api.dicebear.com/8.x/fun-emoji/svg?seed=Aditi%20Rao&backgroundColor=cfe2f3",
  },
  {
    id: 6,
    name: "Sana Verma",
    email: "sana.verma@example.com",
    percentage: 88,
    summary:
      "Sana enjoys creative hobbies, frequently hosts small game nights, and is enthusiastic about collaborative projects. She’s open-minded and warm.",
    keywords: ["Creative", "Host", "Collaborative", "Warm"],
    avatar:
      "https://api.dicebear.com/8.x/fun-emoji/svg?seed=Sana%20Verma&backgroundColor=f9d5e5",
  },
  {
    id: 7,
    name: "Vidhi Patel",
    email: "vidhi.patel@example.com",
    percentage: 73,
    summary:
      "Vidhi values privacy, prefers low-key weekends, and is cautious about noise. She’s respectful and expects clear communication on shared usage.",
    keywords: ["Reserved", "Respectful", "Quiet", "Clear communicator"],
    avatar:
      "https://api.dicebear.com/8.x/fun-emoji/svg?seed=Vidhi%20Patel&backgroundColor=e8f8f5",
  },
  {
    id: 8,
    name: "Isha Nair",
    email: "isha.nair@example.com",
    percentage: 95,
    summary:
      "Isha is highly organized, eco-conscious, and loves planning group activities. She balances sociability with a strong sense of fairness.",
    keywords: ["Organized", "Eco-friendly", "Planner", "Fair"],
    avatar:
      "https://api.dicebear.com/8.x/fun-emoji/svg?seed=Isha%20Nair&backgroundColor=d1e7dd",
  },
  {
    id: 9,
    name: "Karishma Joshi",
    email: "karishma.joshi@example.com",
    percentage: 66,
    summary:
      "Karishma is spontaneous, enjoys last-minute road trips, and can be messy unless a system is agreed upon. She’s friendly and adaptable.",
    keywords: ["Spontaneous", "Friendly", "Adaptive", "Casual"],
    avatar:
      "https://api.dicebear.com/8.x/fun-emoji/svg?seed=Karishma%20Joshi&backgroundColor=fff4e6",
  },
  {
    id: 10,
    name: "Ananya Desai",
    email: "ananya.desai@example.com",
    percentage: 80,
    summary:
      "Ananya likes balanced routines, is health-conscious, and prefers noise-free mornings. She’s communicative about conflicts and solution-oriented.",
    keywords: ["Balanced", "Health-conscious", "Quiet mornings", "Problem solver"],
    avatar:
      "https://api.dicebear.com/8.x/fun-emoji/svg?seed=Ananya%20Desai&backgroundColor=ead1dc",
  },
  {
    id: 11,
    name: "Ritika Malhotra",
    email: "ritika.malhotra@example.com",
    percentage: 89,
    summary:
      "Ritika is outgoing, loves shared meals and movie nights, but also respects 'me-time' if it's scheduled. She’s empathetic and enjoys conversations.",
    keywords: ["Empathetic", "Social", "Planner", "Flexible"],
    avatar:
      "https://api.dicebear.com/8.x/fun-emoji/svg?seed=Ritika%20Malhotra&backgroundColor=ffe6cc",
  },
  {
    id: 12,
    name: "Sanya Ghosh",
    email: "sanya.ghosh@example.com",
    percentage: 77,
    summary:
      "Sanya prefers quiet study zones, is detail-oriented, and avoids late-night partying. She values cleanliness and predictable schedules.",
    keywords: ["Detail-oriented", "Quiet", "Predictable", "Clean"],
    avatar:
      "https://api.dicebear.com/8.x/fun-emoji/svg?seed=Sanya%20Ghosh&backgroundColor=cde7f0",
  },
  {
    id: 13,
    name: "Pooja Kulkarni",
    email: "pooja.kulkarni@example.com",
    percentage: 72,
    summary:
      "Pooja is curious, enjoys learning from roommates, and often initiates spontaneous discussions. She balances her talkative side with respect for deadlines.",
    keywords: ["Curious", "Talkative", "Respectful", "Engaging"],
    avatar:
      "https://api.dicebear.com/8.x/fun-emoji/svg?seed=Pooja%20Kulkarni&backgroundColor=fff0f5",
  },
  {
    id: 14,
    name: "Harsheen Gupta",
    email: "harsheen.gupta@example.com",
    percentage: 86,
    summary:
      "Harsheen is tech-savvy, likes experimenting with gadgets, and prefers communal brainstorming sessions. She’s easygoing about minor messes if communication is clear.",
    keywords: ["Techie", "Collaborative", "Easygoing", "Innovative"],
    avatar:
      "https://api.dicebear.com/8.x/fun-emoji/svg?seed=Harsheen%20Gupta&backgroundColor=e2e3f3",
  },
  {
    id: 15,
    name: "Neelam Roy",
    email: "neelam.roy@example.com",
    percentage: 70,
    summary:
      "Neelam is reflective, enjoys quiet evenings with a book, and prefers slow-paced mornings. She values honesty and consistency in shared agreements.",
    keywords: ["Reflective", "Consistent", "Calm", "Honest"],
    avatar:
      "https://api.dicebear.com/8.x/fun-emoji/svg?seed=Neelam%20Roy&backgroundColor=f0f4c3",
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
