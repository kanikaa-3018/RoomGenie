import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Users, Sparkles, ArrowRight, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import MatchCard from '../components/MatchCard';
import toast from 'react-hot-toast';

const dummyMatches = [
  {
    id: 1,
    name: "Aanya Sharma",
    age: 24,
    location: "Bangalore",
    image: "https://randomuser.me/api/portraits/women/1.jpg",
    compatibility: 92,
    embedding: [89, 95, 85, 90, 94],
    summary:
      "Aanya enjoys a balanced lifestyle, keeps her space clean, and values open communication.",
    budget: "₹35,000/mo",
    interests: ["Yoga", "Cooking", "Reading", "Volunteering"],
  },
  {
    id: 2,
    name: "Meera Kapoor",
    age: 26,
    location: "Mumbai",
    image: "https://randomuser.me/api/portraits/women/2.jpg",
    compatibility: 88,
    embedding: [85, 90, 70, 80, 88],
    summary:
      "Meera loves socializing, is respectful of boundaries, and maintains a healthy lifestyle.",
    budget: "₹40,000/mo",
    interests: ["Hiking", "Dance", "Photography", "Art Galleries"],
  },
  {
    id: 3,
    name: "Isha Verma",
    age: 23,
    location: "Pune",
    image: "https://randomuser.me/api/portraits/women/3.jpg",
    compatibility: 81,
    embedding: [75, 82, 88, 76, 79],
    summary:
      "Isha prefers a calm space, enjoys arts and crafts, and communicates with empathy.",
    budget: "₹30,000/mo",
    interests: ["Painting", "Cats", "Poetry", "Meditation"],
  },
  {
    id: 4,
    name: "Riya Sen",
    age: 25,
    location: "Delhi",
    image: "https://randomuser.me/api/portraits/women/4.jpg",
    compatibility: 86,
    embedding: [82, 87, 78, 85, 84],
    summary:
      "Riya has a collaborative attitude, values harmony, and keeps her surroundings neat.",
    budget: "₹38,000/mo",
    interests: ["Music", "Fashion", "Podcasts", "Running"],
  },
  {
    id: 5,
    name: "Tanya Mehta",
    age: 27,
    location: "Hyderabad",
    image: "https://randomuser.me/api/portraits/women/5.jpg",
    compatibility: 79,
    embedding: [65, 75, 70, 80, 72],
    summary:
      "Tanya is relaxed, budget-conscious, and likes things clean and organized.",
    budget: "₹28,000/mo",
    interests: ["Gardening", "Board Games", "Travel", "Movies"],
  },
];

const MatchResults = () => {
  const [shortlisted, setShortlisted] = useState([]);
  const navigate = useNavigate();

  const handleShortlist = (match) => {
    if (shortlisted.includes(match.id)) {
      setShortlisted((prev) => prev.filter((id) => id !== match.id));
      toast.success(`${match.name} removed from shortlist`);
    } else {
      setShortlisted((prev) => [...prev, match.id]);
      toast.success(`${match.name} added to shortlist!`);
    }
  };

  const handleSubmitShortlist = () => {
    if (shortlisted.length === 0) {
      toast.error('Please shortlist at least one match');
      return;
    }

    const shortlistedMatches = dummyMatches.filter((match) =>
      shortlisted.includes(match.id)
    );
    localStorage.setItem('shortlisted', JSON.stringify(shortlistedMatches));

    toast.success(
      'Shortlist submitted! Our team will review and assign your roommate.'
    );

    setTimeout(() => {
      navigate('/success');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-softGray via-secondary/20 to-accent/20 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center justify-center mb-6">
            <div className="bg-gradient-to-r from-primary to-accent p-4 rounded-full">
              <Sparkles className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Your Top Roommate Matches
          </h1>
          <p className="text-xl text-darkGray max-w-3xl mx-auto">
            We found {dummyMatches.length} amazing women who are highly compatible with your lifestyle and preferences
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-3 gap-6 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="bg-white rounded-2xl p-6 text-center shadow-lg border border-primary/10">
            <div className="text-3xl font-bold text-primary mb-2">{dummyMatches.length}</div>
            <div className="text-darkGray">Compatible Matches</div>
          </div>
          <div className="bg-white rounded-2xl p-6 text-center shadow-lg border border-primary/10">
            <div className="text-3xl font-bold text-accent mb-2">
              {Math.round(
                dummyMatches.reduce((acc, match) => acc + match.compatibility, 0) /
                  dummyMatches.length
              )}%
            </div>
            <div className="text-darkGray">Average Compatibility</div>
          </div>
          <div className="bg-white rounded-2xl p-6 text-center shadow-lg border border-primary/10">
            <div className="text-3xl font-bold text-secondary mb-2">{shortlisted.length}</div>
            <div className="text-darkGray">In Your Shortlist</div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-12">
          {dummyMatches.map((match, index) => (
            <motion.div
              key={match.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <MatchCard
                match={match}
                onShortlist={handleShortlist}
                isShortlisted={shortlisted.includes(match.id)}
              />
            </motion.div>
          ))}
        </div>

        {shortlisted.length > 0 && (
          <motion.div
            className="bg-white rounded-3xl p-8 shadow-2xl border border-primary/10 mb-8"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center mb-6">
              <Heart className="h-6 w-6 text-accent mr-3 fill-current" />
              <h3 className="text-2xl font-bold text-gray-900">Your Shortlist</h3>
            </div>
            <p className="text-darkGray mb-6">
              You've shortlisted {shortlisted.length} amazing {shortlisted.length === 1 ? 'woman' : 'women'}. Our team
              will review room availability and assign your perfect roommate match.
            </p>
            <div className="flex flex-wrap gap-3">
              {dummyMatches
                .filter((match) => shortlisted.includes(match.id))
                .map((match) => (
                  <div
                    key={match.id}
                    className="flex items-center space-x-2 bg-accent/20 px-4 py-2 rounded-full"
                  >
                    <img
                      src={match.image}
                      alt={match.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <span className="font-medium text-gray-900">{match.name}</span>
                    <span className="text-primary font-bold">{match.compatibility}%</span>
                  </div>
                ))}
            </div>
          </motion.div>
        )}

        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="bg-white rounded-3xl p-8 shadow-2xl border border-primary/10 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Move Forward?</h3>
            <p className="text-darkGray mb-8">
              Shortlist your favorite matches and we'll handle the rest. Our team will coordinate with property managers
              to assign rooms based on availability.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="px-6 py-3 border border-gray-300 text-darkGray rounded-full font-semibold hover:border-primary hover:text-primary transition-all"
              >
                Review Matches
              </button>
              <motion.button
                onClick={handleSubmitShortlist}
                disabled={shortlisted.length === 0}
                className={`px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all flex items-center space-x-2 justify-center ${
                  shortlisted.length > 0
                    ? 'bg-gradient-to-r from-primary to-accent text-white'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
                whileHover={shortlisted.length > 0 ? { scale: 1.05 } : {}}
                whileTap={shortlisted.length > 0 ? { scale: 0.95 } : {}}
              >
                <CheckCircle className="h-5 w-5" />
                <span>Submit Shortlist ({shortlisted.length})</span>
                <ArrowRight className="h-5 w-5" />
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default MatchResults;
