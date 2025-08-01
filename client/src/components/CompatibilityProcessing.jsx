import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, Sparkles, Users, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
// import { useUser } from '../context/UserContext';

const CompatibilityProcessing = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();
//   const { updateUser } = useUser();

const user = JSON.parse(localStorage.getItem('user'));

  const steps = [
    { icon: Brain, text: "Analyzing your personality profile..." },
    { icon: Users, text: "Searching our community database..." },
    { icon: Heart, text: "Calculating compatibility scores..." },
    { icon: Sparkles, text: "Generating your perfect matches..." }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < steps.length - 1) {
          return prev + 1;
        }
        return prev;
      });
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
  const mockMatches = [
    {
      id: 1,
      name: "Sarah Chen",
      age: 25,
      location: "Downtown",
      image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400",
      compatibility: 94,
      scores: {
        cleanliness: 92,
        sociability: 88,
        conflictTolerance: 95,
        lifestyle: 90,
        communication: 96
      },
      summary: "Sarah shares your love for organization and peaceful conflict resolution. You both value clear communication and maintaining a harmonious living environment.",
      budget: "$1200-$1600",
      interests: ["Yoga", "Reading", "Cooking"]
    },
    {
      id: 2,
      name: "Maya Rodriguez",
      age: 23,
      location: "Midtown",
      image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400",
      compatibility: 89,
      scores: {
        cleanliness: 85,
        sociability: 90,
        conflictTolerance: 87,
        lifestyle: 92,
        communication: 91
      },
      summary: "Maya matches your lifestyle preferences and communication style. She's social but respectful of personal space, perfect for balanced living.",
      budget: "$800-$1200",
      interests: ["Photography", "Hiking", "Movies"]
    },
    {
      id: 3,
      name: "Emily Watson",
      age: 27,
      location: "University District",
      image: "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=400",
      compatibility: 87,
      scores: {
        cleanliness: 90,
        sociability: 78,
        conflictTolerance: 89,
        lifestyle: 85,
        communication: 93
      },
      summary: "Emily values cleanliness and open communication like you. She's independent but friendly, creating the perfect roommate dynamic.",
      budget: "$1200-$1600",
      interests: ["Art", "Fitness", "Podcasts"]
    },
    {
      id: 4,
      name: "Zoe Thompson",
      age: 24,
      location: "Arts District",
      image: "https://images.pexels.com/photos/1081685/pexels-photo-1081685.jpeg?auto=compress&cs=tinysrgb&w=400",
      compatibility: 85,
      scores: {
        cleanliness: 88,
        sociability: 85,
        conflictTolerance: 82,
        lifestyle: 87,
        communication: 85
      },
      summary: "Zoe has a balanced approach to roommate life that aligns well with your preferences. Great match for shared activities and mutual respect.",
      budget: "$1000-$1400",
      interests: ["Music", "Travel", "Baking"]
    },
    {
      id: 5,
      name: "Ava Kim",
      age: 26,
      location: "Tech District",
      image: "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=400",
      compatibility: 83,
      scores: {
        cleanliness: 86,
        sociability: 82,
        conflictTolerance: 85,
        lifestyle: 83,
        communication: 88
      },
      summary: "Ava brings similar values around cleanliness and communication. She's reliable and considerate, making for a stable living situation.",
      budget: "$1400-$1800",
      interests: ["Tech", "Gaming", "Coffee"]
    }
  ];

  // Save directly to localStorage
  const user = JSON.parse(localStorage.getItem("user"));
  if (user) {
    const updatedUser = { ...user, matches: mockMatches };
    localStorage.setItem("user", JSON.stringify(updatedUser));
  }
};


  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/20 via-secondary/30 to-accent/20 flex items-center justify-center px-4">
      <motion.div
        className="max-w-lg w-full text-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h1
          className="text-4xl md:text-5xl font-bold text-gray-900 mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Finding Your Perfect Matches
        </motion.h1>

        <div className="space-y-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className={`flex items-center space-x-4 p-6 rounded-2xl transition-all ${
                index <= currentStep
                  ? 'bg-white shadow-lg border border-primary/20'
                  : 'bg-white/50'
              }`}
              initial={{ opacity: 0, x: -50 }}
              animate={{
                opacity: index <= currentStep ? 1 : 0.5,
                x: 0,
                scale: index === currentStep ? 1.02 : 1
              }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className={`p-3 rounded-full transition-all ${
                index <= currentStep
                  ? 'bg-gradient-to-r from-primary to-accent'
                  : 'bg-gray-300'
              }`}>
                <step.icon className={`h-6 w-6 ${
                  index <= currentStep ? 'text-white' : 'text-gray-500'
                }`} />
              </div>
              <p className={`text-left font-medium ${
                index <= currentStep ? 'text-gray-900' : 'text-gray-500'
              }`}>
                {step.text}
              </p>
              {index === currentStep && (
                <motion.div
                  className="ml-auto"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full" />
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-12 bg-white/80 backdrop-blur-md rounded-3xl p-8 shadow-xl border border-primary/20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <Sparkles className="h-8 w-8 text-accent mx-auto mb-4" />
          <p className="text-lg text-darkGray font-medium mb-2">
            Almost there!
          </p>
          <p className="text-sm text-darkGray">
            We're analyzing thousands of profiles to find your top 5 compatible roommates
          </p>
        </motion.div>

        <motion.div
          className="flex justify-center space-x-2 mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-3 h-3 bg-gradient-to-r from-primary to-accent rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default CompatibilityProcessing;
