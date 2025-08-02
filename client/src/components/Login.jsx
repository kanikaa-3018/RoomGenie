import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, Users, HeartHandshake } from 'lucide-react';
import React from 'react';
import Geniebot from './Geniebot';
import toast from 'react-hot-toast';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      toast.success(data.message || 'Login successful!');
      if (!res.ok) {
        setError(data.error || 'Login failed');
        return;
      }

      localStorage.setItem('user', JSON.stringify(data.user));
      navigate('/ai-call');
    } catch (err) {
      setError('Something went wrong');
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5] flex font-poppins">
      {/* Left Hero Section */}
      <div className="hidden md:flex w-1/2 flex-col justify-center items-center px-10 bg-[#EADBEA] relative">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-4xl font-extrabold text-[#563F57] mb-6 text-center leading-tight"
        >
          Find Your <span className="text-[#B38FB5]">Perfect Roommate</span>
        </motion.h2>

        <motion.ul
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="space-y-6 text-lg text-[#3E3E3E]"
        >
          <li className="flex items-center gap-3">
            <Users className="text-[#B38FB5]" />
            AI-Powered Compatibility Matching
          </li>
          <li className="flex items-center gap-3">
            <HeartHandshake className="text-[#B38FB5]" />
            Emotion & Habit-Based Filters
          </li>
          <li className="flex items-center gap-3">
            <Sparkles className="text-[#B38FB5]" />
            Voice-AI for Natural Interaction
          </li>
        </motion.ul>

        {/* <Geniebot/> */}

        {/* <motion.img
          src="/roomie-chat.svg"
          alt="RoomGenie Visual"
          className="w-72 mt-10"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.8 }}
        /> */}
      </div>

      {/* Right Login Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-md"
        >
          <h2 className="text-3xl font-bold mb-6 text-center text-[#B38FB5]">Welcome to RoomGenie</h2>
          <p className="text-center text-gray-600 mb-4 text-sm">
            Your personalized roommate recommender
          </p>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#B38FB5]"
              />
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              type="submit"
              className="w-full text-white bg-[#563F57] hover:bg-[#6B4E6D] font-semibold py-2 px-4 rounded-lg transition duration-200"
            >
              Continue
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
