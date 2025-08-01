import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Users, Sparkles, ArrowRight, CheckCircle } from 'lucide-react';
// import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import MatchCard from '../components/MatchCard';
import toast from 'react-hot-toast';

const MatchResults = () => {
//   const { user, updateUser } = useUser();
  const [shortlisted, setShortlisted] = useState([]);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleShortlist = (match) => {
    if (shortlisted.includes(match.id)) {
      setShortlisted(prev => prev.filter(id => id !== match.id));
      toast.success(`${match.name} removed from shortlist`);
    } else {
      setShortlisted(prev => [...prev, match.id]);
      toast.success(`${match.name} added to shortlist!`);
    }
  };

  const handleSubmitShortlist = () => {
    if (shortlisted.length === 0) {
      toast.error('Please shortlist at least one match');
      return;
    }

    const shortlistedMatches = user.matches?.filter(match => shortlisted.includes(match.id));
    updateUser({ shortlisted: shortlistedMatches });
    toast.success('Shortlist submitted! Our team will review and assign your roommate.');

    setTimeout(() => {
      navigate('/success');
    }, 2000);
  };

  if (!user.matches || user.matches.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-softGray via-secondary/20 to-accent/20 flex items-center justify-center">
        <div className="text-center">
          <Users className="h-16 w-16 text-darkGray mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">No matches found</h2>
          <p className="text-darkGray">Please try updating your preferences.</p>
        </div>
      </div>
    );
  }

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
            We found {user.matches.length} amazing women who are highly compatible with your lifestyle and preferences
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-3 gap-6 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="bg-white rounded-2xl p-6 text-center shadow-lg border border-primary/10">
            <div className="text-3xl font-bold text-primary mb-2">{user.matches.length}</div>
            <div className="text-darkGray">Compatible Matches</div>
          </div>
          <div className="bg-white rounded-2xl p-6 text-center shadow-lg border border-primary/10">
            <div className="text-3xl font-bold text-accent mb-2">
              {Math.round(user.matches.reduce((acc, match) => acc + match.compatibility, 0) / user.matches.length)}%
            </div>
            <div className="text-darkGray">Average Compatibility</div>
          </div>
          <div className="bg-white rounded-2xl p-6 text-center shadow-lg border border-primary/10">
            <div className="text-3xl font-bold text-secondary mb-2">{shortlisted.length}</div>
            <div className="text-darkGray">In Your Shortlist</div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-12">
          {user.matches.map((match, index) => (
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
              You've shortlisted {shortlisted.length} amazing {shortlisted.length === 1 ? 'woman' : 'women'}.
              Our team will review room availability and assign your perfect roommate match.
            </p>
            <div className="flex flex-wrap gap-3">
              {user.matches
                .filter(match => shortlisted.includes(match.id))
                .map(match => (
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
              Shortlist your favorite matches and we'll handle the rest. Our team will coordinate with 
              property managers to assign rooms based on availability.
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
