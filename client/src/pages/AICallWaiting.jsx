import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, MessageCircle, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AICallWaiting = () => {
  const [currentMessage, setCurrentMessage] = useState(0);
  const [statusChecked, setStatusChecked] = useState(false);
  const navigate = useNavigate();

  const messages = [
    "Connecting you with RoomGenie AI...",
    "Analyzing your preferences...",
    "Preparing personalized questions...",
    "Ready to chat!"
  ];

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (!user || !user._id) {
      navigate('/login');
      return;
    }

    const checkCallStatus = async () => {
      try {
        const res = await fetch(`https://c3fa96c76aba.ngrok-free.app/api/users/${user._id}/call-status`);
        const data = await res.json();

        if (res.ok && data.callStatus) {
          navigate('/post-call');
        } else {
          setStatusChecked(true); // Start the animation cycle if not done yet
        }
      } catch (error) {
        console.error('Error checking call status:', error);
        setStatusChecked(true); // Still proceed with animations
      }
    };

    checkCallStatus();

    const interval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % messages.length);
    }, 2000);

    const fallbackTimer = setTimeout(() => {
      navigate('/post-call');
    }, 20000);

    return () => {
      clearInterval(interval);
      clearTimeout(fallbackTimer);
    };
  }, [navigate]);

  if (!statusChecked) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg font-medium text-gray-700">
        Checking AI call status...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/20 via-secondary/30 to-accent/20 flex items-center justify-center px-4">
      <motion.div
        className="max-w-md w-full text-center"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Phone Icon with Animated Rings */}
        <div className="relative w-48 h-48 mx-auto mb-12">
          <motion.div
            className="absolute inset-0 rounded-full blur-3xl opacity-30 z-0"
            style={{ background: 'radial-gradient(circle, #008080, #212f45)' }}
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          {[0, 0.5, 1].map((delay, i) => (
            <motion.div
              key={i}
              className="absolute inset-0 rounded-full border-4 opacity-50 z-0"
              style={{ borderColor: i % 2 === 0 ? '#008080' : '#212f45' }}
              animate={{ scale: [1, 1.8], opacity: [0.6, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, delay }}
            />
          ))}
          <div
            className="relative z-10 w-full h-full rounded-full flex items-center justify-center shadow-2xl"
            style={{ background: 'linear-gradient(to right, #008080, #212f45)' }}
          >
            <Phone className="h-20 w-20 text-white" />
          </div>
        </div>

        <motion.h1
          className="text-4xl font-bold text-gray-900 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          RoomGenie AI is Calling
        </motion.h1>

        <motion.div
          className="bg-white/80 backdrop-blur-md rounded-3xl p-8 shadow-xl border border-primary/20 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="flex items-center justify-center mb-4">
            <MessageCircle className="h-6 w-6 text-primary mr-2" />
            <Sparkles className="h-5 w-5 text-accent" />
          </div>
          <motion.p
            key={currentMessage}
            className="text-lg text-darkGray font-medium"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
          >
            {messages[currentMessage]}
          </motion.p>
        </motion.div>

        <motion.div
          className="space-y-4 text-darkGray"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <p className="text-sm">
            💬 Our AI assistant will call you soon to understand your preferences better.
          </p>
          <p className="text-xs">
            This usually takes 3–5 minutes. Please keep your phone handy!
          </p>
        </motion.div>

        <motion.div
          className="flex justify-center space-x-2 mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-3 h-3 rounded-full"
              style={{ background: 'linear-gradient(to right, #008080, #212f45)' }}
              animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AICallWaiting;
