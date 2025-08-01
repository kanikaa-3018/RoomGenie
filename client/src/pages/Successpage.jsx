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
    <div className="min-h-screen bg-gradient-to-br from-softGray via-secondary/20 to-accent/20 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="bg-gradient-to-r from-accent to-primary p-6 rounded-full w-24 h-24 mx-auto mb-8 flex items-center justify-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.5 }}
          >
            <CheckCircle className="h-12 w-12 text-white" />
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Application Submitted Successfully!
          </h1>
          <p className="text-xl text-darkGray max-w-2xl mx-auto">
            Thank you for choosing RoomMuse! We're processing your roommate matches and will have exciting updates soon.
          </p>
        </motion.div>

        {user?.shortlisted?.length > 0 && (
          <motion.div
            className="bg-white rounded-3xl p-8 shadow-2xl border border-primary/10 mb-12"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="flex items-center mb-6">
              <Heart className="h-6 w-6 text-accent mr-3 fill-current" />
              <h2 className="text-2xl font-bold text-gray-900">
                Your Shortlisted Matches
              </h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {user.shortlisted.map((match, index) => (
                <motion.div
                  key={match.id}
                  className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-2xl p-4 border border-primary/10"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <img
                      src={match.image}
                      alt={match.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-semibold text-gray-900">{match.name}</h3>
                      <p className="text-sm text-darkGray">
                        {match.age} • {match.location}
                      </p>
                    </div>
                  </div>
                  <div className="bg-white rounded-lg p-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-darkGray">
                        Compatibility
                      </span>
                      <span className="text-lg font-bold text-primary">
                        {match.compatibility}%
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        <motion.div
          className="bg-white rounded-3xl p-8 shadow-2xl border border-primary/10 mb-12"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
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
                  className={`p-3 rounded-full ${
                    step.status === "completed"
                      ? "bg-accent"
                      : step.status === "current"
                      ? "bg-gradient-to-r from-primary to-accent"
                      : "bg-gray-300"
                  }`}
                >
                  <step.icon className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3
                    className={`text-lg font-semibold mb-2 ${
                      step.status === "completed" || step.status === "current"
                        ? "text-gray-900"
                        : "text-gray-500"
                    }`}
                  >
                    {step.title}
                  </h3>
                  <p
                    className={`${
                      step.status === "completed" || step.status === "current"
                        ? "text-darkGray"
                        : "text-gray-400"
                    }`}
                  >
                    {step.description}
                  </p>
                  {step.status === "current" && (
                    <div className="mt-3">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                        <span className="text-sm font-medium text-primary">
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

        <motion.div
          className="bg-gradient-to-r from-primary to-accent rounded-3xl p-8 text-white text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <h2 className="text-2xl font-bold mb-4">We'll Be In Touch Soon!</h2>
          <p className="text-white/90 mb-8 max-w-2xl mx-auto">
            Our admin team typically processes applications within 24-48 hours.
            You'll receive an email with your roommate assignment and next steps for move-in coordination.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              onClick={() => navigate("/")}
              className="bg-white text-primary px-6 py-3 rounded-full font-semibold hover:bg-gray-50 transition-all flex items-center space-x-2 justify-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Back to Home</span>
              <ArrowRight className="h-5 w-5" />
            </motion.button>
          </div>
        </motion.div>

        <motion.div
          className="text-center mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <p className="text-darkGray">
            Questions? Email us at{" "}
            <span className="text-primary font-semibold">
              hello@roommuse.com
            </span>{" "}
            or call{" "}
            <span className="text-primary font-semibold">(555) 123-ROOM</span>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default SuccessPage;
