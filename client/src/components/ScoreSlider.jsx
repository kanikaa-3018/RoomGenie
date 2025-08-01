import React from "react";
import { motion } from "framer-motion";

const ScoreSlider = ({ value, onChange, label, description }) => {
  return (
    <div className="mb-8">
      {/* Header */}
      <div className="flex justify-between items-end mb-1">
        <h2 className="text-xl font-bold text-black">{label}</h2>
        <span className="text-lg font-bold text-[#B38FB5]">{value}%</span>
      </div>

      {/* Optional description */}
      {description && (
        <p className="text-sm text-gray-600 mb-4">{description}</p>
      )}

      {/* Slider Card */}
      <div className="relative bg-[#F5F5F5] rounded-xl p-5 shadow-md border border-[#E2D4E8]">
        {/* Background bar */}
        <div className="relative w-full h-2 rounded-full bg-gray-300 overflow-hidden">
          <div
            className="h-full bg-[#B38FB5] transition-all duration-300"
            style={{ width: `${value}%` }}
          />
        </div>

        {/* Input slider */}
        <input
          type="range"
          min="0"
          max="100"
          value={value}
          onChange={(e) => onChange(parseInt(e.target.value))}
          className="absolute top-1/2 left-0 w-full h-2 appearance-none bg-transparent pointer-events-auto"
          style={{ transform: "translateY(-50%)" }}
        />

        {/* Custom Thumb */}
        <motion.div
          className="absolute top-1/2 -translate-y-1/2 w-5 h-5 bg-[#563F57] border-4 border-white rounded-full shadow-md pointer-events-none"
          style={{ left: `calc(${value}% - 10px)` }}
          whileHover={{ scale: 1.2 }}
          transition={{ type: "spring", stiffness: 300 }}
        />
      </div>

      {/* Range labels */}
      <div className="flex justify-between text-xs text-gray-500 mt-2 px-1">
        <span>Low</span>
        <span>High</span>
      </div>
    </div>
  );
};

export default ScoreSlider;
