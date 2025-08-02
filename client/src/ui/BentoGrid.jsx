import React from "react";
import { motion } from "framer-motion";
import {
  Mic,
  Brain,
  Stars,
  ListChecks,
  Users2,
  Sparkles,
} from "lucide-react";

const BentoGrid = () => {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 text-slate-800 font-[Poppins]" id="bento-grid">
      {/* Header */}
      <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end md:px-8">
        <h2 className="w-full md:w-1/2 text-3xl font-bold md:text-5xl leading-tight">
          Discover the smarter way to find your
          <span className="text-slate-500"> perfect roommate</span>
        </h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="whitespace-nowrap rounded-lg bg-slate-900 px-4 py-2 font-medium text-white shadow-xl transition-colors hover:bg-slate-700"
        >
          Learn more
        </motion.button>
      </div>

      {/* Top Row */}
      <div className="mb-4 grid grid-cols-12 gap-4">
        <BounceCard className="col-span-12 md:col-span-4">
          <CardTitle icon={<Stars className="text-sky-500" />}>
            Minimal Input, Maximum Insight
          </CardTitle>
          <PastelBlock
            from="from-[#d6e4f0]"
            to="to-[#b8cdd8]"
            text="Just answer a few questions. Our ML algorithms infer deep compatibility insights based on subtle patterns—no need for endless forms."
          />
        </BounceCard>

        <BounceCard className="col-span-12 md:col-span-8">
          <CardTitle icon={<Mic className="text-rose-400" />}>
            Voice-Based Preference Capture (Omnidim.ai)
          </CardTitle>
          <PastelBlock
            from="from-[#f9e0e0]"
            to="to-[#f7d4d4]"
            text="Talk naturally to our Omnidim-powered Voice AI. It captures preferences, tone, intent, and personality traits to build a humanized profile."
          />
        </BounceCard>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-12 gap-4">
        <BounceCard className="col-span-12 md:col-span-8">
          <CardTitle icon={<Brain className="text-emerald-500" />}>
            AI Compatibility Matching
          </CardTitle>
          <PastelBlock
            from="from-[#d2f1e4]"
            to="to-[#b7e4cd]"
            text="Using machine learning, we match users based on emotional compatibility, lifestyle alignment, and shared values—beyond just filters."
          />
        </BounceCard>

        <BounceCard className="col-span-12 md:col-span-4">
          <CardTitle icon={<ListChecks className="text-purple-500" />}>
            Smart Shortlisting & Admin Review
          </CardTitle>
          <PastelBlock
            from="from-[#f5e6f7]"
            to="to-[#e2d4ec]"
            text="You choose who you vibe with, and our admins ensure matches meet your safety and comfort criteria before final assignment."
          />
        </BounceCard>
      </div>
    </section>
  );
};

// Utility Components
const BounceCard = ({ className, children }) => {
  return (
    <motion.div
      whileHover={{ scale: 0.97, rotate: "-1deg" }}
      className={`group relative min-h-[300px] cursor-pointer overflow-hidden rounded-2xl bg-slate-100 p-8 ${className}`}
    >
      {children}
    </motion.div>
  );
};

const CardTitle = ({ children, icon }) => {
  return (
    <div className="mx-auto mb-4 flex items-center justify-center gap-2 text-center text-2xl font-semibold text-slate-700">
      {icon}
      <span>{children}</span>
    </div>
  );
};

const PastelBlock = ({ from, to, text }) => {
  return (
    <div
      className={`absolute bottom-0 left-4 right-4 top-32 translate-y-8 rounded-t-2xl bg-gradient-to-br ${from} ${to} p-4 transition-transform duration-[250ms] group-hover:translate-y-4 group-hover:rotate-[2deg]`}
    >
      <span className="block text-center font-medium text-slate-700 leading-relaxed">
        {text}
      </span>
    </div>
  );
};

export default BentoGrid;
