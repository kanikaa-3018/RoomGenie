import React from "react";
import { motion } from "framer-motion";

const ScoreSlider = ({ value, onChange, label }) => {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-darkGray">
          Adjust your {label} score
        </span>
        <span className="text-sm font-bold text-primary">{value}%</span>
      </div>
      <div className="relative">
        <input
          type="range"
          min="0"
          max="100"
          value={value}
          onChange={(e) => onChange(parseInt(e.target.value))}
          className="w-full h-3 bg-gray-200 rounded-full appearance-none cursor-pointer slider"
          style={{
            background: `linear-gradient(to right, #E9D5FF 0%, #4C1D95 ${value}%, #e5e7eb ${value}%, #e5e7eb 100%)`,
          }}
        />
        <motion.div
          className="absolute top-1/2 transform -translate-y-1/2 w-6 h-6 bg-white border-2 border-primary rounded-full shadow-lg pointer-events-none"
          style={{ left: `calc(${value}% - 12px)` }}
          whileHover={{ scale: 1.2 }}
        />
      </div>
      <div className="flex justify-between text-xs text-darkGray">
        <span>Low</span>
        <span>High</span>
      </div>
    </div>
  );
};

export default ScoreSlider;
