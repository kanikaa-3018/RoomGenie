import React from "react";
import { motion } from "framer-motion";
import {
  CheckCircle,
  Heart,
  Users,
  MessageCircle,
  Home,
  ArrowRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const SuccessPage = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const timeline = [
    {
      icon: CheckCircle,
      title: "Application Submitted",
      description: "Your roommate preferences and shortlist have been received",
      status: "completed",
    },
    {
      icon: Users,
      title: "Admin Review",
      description: "Our team is reviewing your matches and checking room availability",
      status: "current",
    },
    {
      icon: Home,
      title: "Room Assignment",
      description: "We'll assign you to your perfect roommate based on availability",
      status: "pending",
    },
    {
      icon: MessageCircle,
      title: "Introduction Call",
      description: "Connect with your new roommate and plan your move-in",
      status: "pending",
    },
  ];

  return (
    <div className="min-h-screen bg-white py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="bg-[#B38FB5] p-6 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center shadow-xl"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.5 }}
          >
            <CheckCircle className="h-12 w-12 text-white" />
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-bold text-[#4b0082] mb-4">
            You're All Set! 🎉
          </h1>
          <p className="text-lg text-[#5c5470] max-w-2xl mx-auto">
            Thank you for choosing <span className="font-semibold text-[#b388eb]">RoomMuse</span>. Our team is working to pair you with your ideal roommate.
          </p>
        </motion.div>

        {/* Shortlisted */}
        {user?.shortlisted?.length > 0 && (
          <motion.div
            className="bg-white/60 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-[#d3adf7]/40 mb-12"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="flex items-center mb-6">
              <Heart className="h-6 w-6 text-[#b388eb] mr-3 fill-current" />
              <h2 className="text-2xl font-bold text-[#4b0082]">
                Your Shortlisted Matches
              </h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {user.shortlisted.map((match, index) => (
                <motion.div
                  key={match.id}
                  className="bg-white rounded-2xl p-4 border border-[#e5d4f9] shadow-md hover:shadow-xl transition-all"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <img
                      src={match.image}
                      alt={match.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-[#d3adf7]"
                    />
                    <div>
                      <h3 className="font-semibold text-[#4b0082]">{match.name}</h3>
                      <p className="text-sm text-[#7c6a93]">
                        {match.age} • {match.location}
                      </p>
                    </div>
                  </div>
                  <div className="bg-[#f3ecff] rounded-lg p-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-[#5c5470]">
                        Compatibility
                      </span>
                      <span className="text-lg font-bold text-[#a855f7]">
                        {match.compatibility}%
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Timeline */}
        <motion.div
          className="bg-white/60 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-[#d3adf7]/40 mb-12"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h2 className="text-2xl font-bold text-[#4b0082] mb-8 text-center">
            What Happens Next?
          </h2>
          <div className="space-y-6">
            {timeline.map((step, index) => (
              <motion.div
                key={index}
                className="flex items-start space-x-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
              >
                <div
                  className={`p-3 rounded-full shadow-md ${
                    step.status === "completed"
                      ? "bg-[#b388eb]"
                      : step.status === "current"
                      ? "bg-gradient-to-r from-[#B38FB5] to-[#d3adf7]"
                      : "bg-[#e2d6f6]"
                  }`}
                >
                  <step.icon className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3
                    className={`text-lg font-semibold mb-2 ${
                      step.status === "completed" || step.status === "current"
                        ? "text-[#4b0082]"
                        : "text-gray-500"
                    }`}
                  >
                    {step.title}
                  </h3>
                  <p
                    className={`text-sm ${
                      step.status === "completed" || step.status === "current"
                        ? "text-[#6b5c80]"
                        : "text-gray-400"
                    }`}
                  >
                    {step.description}
                  </p>
                  {step.status === "current" && (
                    <div className="mt-3">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-[#b388eb] rounded-full animate-pulse" />
                        <span className="text-sm font-medium text-[#b388eb]">
                          In Progress
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Final CTA */}
        <motion.div
          className="bg-gradient-to-br from-[#B38FB5] to-[#B38FB5] rounded-3xl p-8 text-white text-center shadow-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <h2 className="text-2xl font-bold mb-4">We'll Be In Touch Soon!</h2>
          <p className="text-white/90 mb-8 max-w-2xl mx-auto">
            Our admin team typically processes applications within 24–48 hours.
            You'll receive an email with your roommate assignment and next steps for move-in coordination.
          </p>
          <motion.button
            onClick={() => navigate("/")}
            className="bg-white text-[#B38FB5] px-6 py-3 rounded-full font-semibold hover:bg-[#f7e9ff] transition-all flex items-center space-x-2 justify-center mx-auto"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>Back to Home</span>
            <ArrowRight className="h-5 w-5" />
          </motion.button>
        </motion.div>

        {/* Footer */}
        <motion.div
          className="text-center mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <p className="text-[#6b5c80]">
            Questions? Email us at{" "}
            <span className="text-[#B38FB5] font-semibold">
              hello@roommuse.com
            </span>{" "}
            or call{" "}
            <span className="text-[#B38FB5] font-semibold">(555) 123-ROOM</span>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default SuccessPage;
