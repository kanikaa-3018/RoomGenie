import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Phone, MessageCircle, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

const messages = [
  "🔍 Connecting you with RoomGenieAI...",
  "💭 Analyzing your vibe & preferences...",
  "📋 Preparing personalized questions...",
  "✅ Ready to chat!",
];

const AICallWaiting = () => {
  const [currentMessage, setCurrentMessage] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || !user._id) {
      navigate("/login");
      return;
    }

    const pollCallStatus = async () => {
      try {
        // Keep polling to maintain connection, but don't use the data for early redirect
        await fetch(
          `${import.meta.env.VITE_API_URL}/api/users/omnidim-data`
        );
      } catch (error) {
        console.error("Error polling call status:", error);
      }
    };

    const pollingInterval = setInterval(pollCallStatus, 3000);
    const messageCycle = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % messages.length);
    }, 2000);


    const safetyTimeout = setTimeout(() => {
      navigate("/post-call");
    }, 120000); // 2 minutes

    return () => {
      clearInterval(pollingInterval);
      clearInterval(messageCycle);
      clearTimeout(safetyTimeout);
    };
  }, [navigate]);

  return (
    <div className="min-h-screen bg-[#F5F5F5] flex items-center justify-center px-4 font-poppins">
      <motion.div
        className="max-w-md w-full text-center"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Animated Phone Icon */}
        <div className="relative w-48 h-48 mx-auto mb-12">
          <motion.div
            className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#B38FB5] via-[#563f57] to-[#212f45] blur-3xl opacity-40 z-0"
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          {[0, 0.4, 0.8].map((delay, i) => (
            <motion.div
              key={i}
              className="absolute inset-0 rounded-full border-[3px] opacity-40 z-0"
              style={{ borderColor: i % 2 === 0 ? "#B38FB5" : "#563f57" }}
              animate={{ scale: [1, 1.7], opacity: [0.7, 0] }}
              transition={{ duration: 3, repeat: Infinity, delay }}
            />
          ))}
          <div
            className="relative z-10 w-full h-full rounded-full flex items-center justify-center shadow-xl border-4 border-[#B38FB5]"
            style={{
              background: "linear-gradient(to right, #563f57, #212f45)",
            }}
          >
            <Phone className="h-20 w-20 text-white animate-pulse" />
          </div>
        </div>

        {/* Title */}
        <motion.h1
          className="text-4xl font-extrabold text-[#212f45] mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          RoomGenie AI is Calling
        </motion.h1>

        {/* Status Box */}
        <motion.div
          className="bg-white rounded-3xl p-8 shadow-lg border border-[#B38FB5]/30 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="flex items-center justify-center mb-4 gap-2">
            <MessageCircle className="h-6 w-6 text-[#563f57]" />
            <Sparkles className="h-5 w-5 text-[#B38FB5]" />
          </div>
          <motion.p
            key={currentMessage}
            className="text-lg text-[#333] font-medium"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {messages[currentMessage]}
          </motion.p>
        </motion.div>

        {/* Info Text */}
        <motion.div
          className="space-y-3 text-[#333]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <p className="text-sm">
            💬 Our AI assistant will call you soon to understand your
            preferences.
          </p>
          <p className="text-xs opacity-70">
            This usually takes 3–5 minutes. Keep your phone handy!
          </p>
        </motion.div>

        {/* Dots Animation */}
        <motion.div
          className="flex justify-center space-x-2 mt-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-3 h-3 rounded-full"
              style={{
                background: "linear-gradient(to right, #B38FB5, #563f57)",
              }}
              animate={{ scale: [1, 1.5, 1], opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AICallWaiting;
