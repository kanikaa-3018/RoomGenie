import React from "react";
import { motion } from "framer-motion";

const BentoGrid = () => {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 text-slate-800 font-[Poppins]">
      {/* Header */}
      <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end md:px-8">
        <h2 className="w-full md:w-1/2 text-3xl font-bold md:text-5xl leading-tight">
          Discover the smarter way to find your
          <span className="text-slate-500"> perfect roommate</span>
        </h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="whitespace-nowrap rounded-lg bg-slate-900 px-6 py-3 font-medium text-white shadow-xl transition-colors hover:bg-slate-700"
        >
          Learn more
        </motion.button>
      </div>

      {/* Top Row */}
      <div className="mb-4 grid grid-cols-12 gap-4">
        <BounceCard className="col-span-12 md:col-span-4">
          <CardTitle>Preference-Based Matching</CardTitle>
          <div className="absolute bottom-0 left-4 right-4 top-36 translate-y-8 rounded-t-2xl bg-gradient-to-br from-indigo-500 to-indigo-700 transition-transform duration-300 group-hover:translate-y-4 group-hover:rotate-[2deg]">
            <span className="block text-center font-semibold text-white">
              <img
                src="https://images.unsplash.com/photo-1505691723518-36a5ac3be353?q=80&w=600"
                alt="Room match"
                className="w-full h-48 object-cover rounded-t-2xl"
              />
              <p className="p-4 text-sm">
                Matches based on your schedule, cleanliness habits, sleep patterns, and more.
              </p>
            </span>
          </div>
        </BounceCard>

        <BounceCard className="col-span-12 md:col-span-8">
          <CardTitle>Omnidim™ AI Engine</CardTitle>
          <div className="absolute bottom-0 left-4 right-4 top-36 translate-y-8 rounded-t-2xl bg-gradient-to-r from-gray-700 to-gray-900 transition-transform duration-300 group-hover:translate-y-4 group-hover:rotate-[2deg]">
            <span className="block p-6 text-center font-semibold text-white text-sm">
              Our Omnidim™ AI understands your personality, preferences, and priorities — delivering roommate matches that feel like real compatibility, not just filtered results.
            </span>
          </div>
        </BounceCard>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-12 gap-4">
        <BounceCard className="col-span-12 md:col-span-8">
          <CardTitle>No Age or Location Bias</CardTitle>
          <div className="absolute bottom-0 left-4 right-4 top-36 translate-y-8 rounded-t-2xl bg-gradient-to-r from-gray-600 to-gray-800 transition-transform duration-300 group-hover:translate-y-4 group-hover:rotate-[2deg]">
            <span className="block p-6 text-center font-semibold text-white text-sm">
              Whether you're 19 or 39, RoomGenie prioritizes your lifestyle match — not your age or zipcode. We go deeper than basic filters.
            </span>
          </div>
        </BounceCard>

        <BounceCard className="col-span-12 md:col-span-4">
          <CardTitle>Safe Profiles & Chat</CardTitle>
          <div className="absolute bottom-0 left-4 right-4 top-36 translate-y-8 rounded-t-2xl bg-gradient-to-br from-red-400 to-rose-500 transition-transform duration-300 group-hover:translate-y-4 group-hover:rotate-[2deg]">
            <span className="block text-center font-semibold text-white">
              <img
                src="https://images.unsplash.com/photo-1627920769733-fc963c46b307?q=80&w=600"
                alt="Safe chat"
                className="w-full h-48 object-cover rounded-t-2xl"
              />
              <p className="p-4 text-sm">
                Verified profiles and secure in-app messaging keep your privacy and safety top priority.
              </p>
            </span>
          </div>
        </BounceCard>
      </div>
    </section>
  );
};

const BounceCard = ({ className, children }) => {
  return (
    <motion.div
      whileHover={{ scale: 0.97, rotate: "-1deg" }}
      className={`group relative min-h-[340px] cursor-pointer overflow-hidden rounded-2xl bg-slate-100 p-8 transition-all ${className}`}
    >
      {children}
    </motion.div>
  );
};

const CardTitle = ({ children }) => {
  return (
    <h3 className="mx-auto mb-2 text-center text-2xl font-semibold">
      {children}
    </h3>
  );
};

export default BentoGrid;
