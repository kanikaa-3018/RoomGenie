import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, Sparkles, Users, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CompatibilityProcessing = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const steps = [
    { icon: Brain, text: "Analyzing your personality profile...", bg: '#E8E0EF' },
    { icon: Users, text: "Searching our community database...", bg: '#DDE7ED' },
    { icon: Heart, text: "Calculating compatibility scores...", bg: '#F9E8F0' },
    { icon: Sparkles, text: "Generating your perfect matches...", bg: '#EFEAF9' }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
    }, 1500);

    const timer = setTimeout(() => {
      generateMockMatches();
      navigate('/results');
    }, 6500);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [navigate]);

  const generateMockMatches = () => {
    const dummyMatches = [
      { name: "Lena M.", age: 23, matchScore: 92, traits: ['Clean', 'Friendly'] },
      { name: "Ari Patel", age: 21, matchScore: 89, traits: ['Night owl', 'Chill'] },
      { name: "Cam Nguyen", age: 25, matchScore: 87, traits: ['Organized', 'Early riser'] },
      { name: "Julian Rivera", age: 22, matchScore: 85, traits: ['Gamer', 'Respectful'] },
      { name: "Noah Kim", age: 24, matchScore: 83, traits: ['Quiet', 'Studious'] },
      { name: "Sophia Zhang", age: 22, matchScore: 80, traits: ['Creative', 'Clean'] },
      { name: "Darius T.", age: 26, matchScore: 79, traits: ['Introvert', 'Easygoing'] }
    ];

    if (user) {
      localStorage.setItem('user', JSON.stringify({
        ...user,
        matches: dummyMatches
      }));
    }
  };

  return (
    <div className="relative min-h-screen bg-[#F5F5F5] flex items-center justify-center overflow-hidden p-4">
      {/* Gradient blob in background */}
      <motion.div
        className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,_#B38FB5_0%,_transparent_60%)] pointer-events-none z-0"
        animate={{ backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'] }}
        transition={{ duration: 18, repeat: Infinity }}
        style={{ backgroundSize: '400% 400%' }}
      />

      <motion.div
        className="relative z-10 max-w-xl w-full text-center"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h1
          className="text-4xl font-extrabold text-[#563F57] mb-12"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          Finding Your Perfect Matches
        </motion.h1>

        <div className="space-y-6">
          {steps.map((step, i) => {
            const Icon = step.icon;
            const active = i <= currentStep;
            const isCurrent = i === currentStep;

            return (
              <motion.div
                key={i}
                className={`flex items-center space-x-4 p-5 rounded-2xl transition-all duration-500 ${
                  active
                    ? 'shadow-xl border border-[#B38FB5]/20'
                    : 'opacity-70'
                }`}
                style={{
                  backgroundColor: step.bg,
                  backdropFilter: active ? 'blur(12px)' : 'blur(2px)'
                }}
                initial={{ x: -50, opacity: 0.6 }}
                animate={{
                  x: 0,
                  opacity: active ? 1 : 0.6,
                  scale: isCurrent ? 1.03 : 1
                }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
              >
                <motion.div
                  className={`p-3 rounded-full ${
                    active ? 'bg-[#B38FB5]' : 'bg-gray-300'
                  }`}
                  animate={isCurrent ? { scale: [1, 1.2, 1] } : {}}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  <Icon className={`h-6 w-6 ${active ? 'text-white' : 'text-gray-500'}`} />
                </motion.div>
                <p className={`font-medium ${active ? 'text-[#563F57]' : 'text-gray-500'}`}>
                  {step.text}
                </p>
                {isCurrent && (
                  <motion.div
                    className="ml-auto w-6 h-6 border-2 border-[#B38FB5] border-t-transparent rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
                  />
                )}
              </motion.div>
            );
          })}
        </div>

        <motion.div
          className="mt-12 bg-white/90 backdrop-blur-lg rounded-3xl p-8 shadow-xl border border-[#B38FB5]/20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <Sparkles className="h-8 w-8 text-[#563F57] mx-auto mb-4 animate-pulse" />
          <p className="text-lg font-semibold text-[#B38FB5] mb-2">Almost there!</p>
          <p className="text-gray-700 text-sm">
            We’re analyzing profiles to find your top-compatible roommates…
          </p>
        </motion.div>

        <motion.div
          className="flex justify-center space-x-2 mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          {[0, 1, 2].map(idx => (
            <motion.div
              key={idx}
              className="w-3 h-3 rounded-full bg-[#B38FB5] shadow-md"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{ delay: idx * 0.2, duration: 1.5, repeat: Infinity }}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default CompatibilityProcessing;
